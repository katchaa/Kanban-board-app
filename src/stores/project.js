import { defineStore } from 'pinia'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { useAuthStore } from './auth'
import {
	findById,
	handleDelete,
	handleEdit,
	handlePost,
} from '../helpers/project'

export const useProjectStore = defineStore('project', {
	state: () => {
		return {
			projects: [],
			cards: [],
			tasks: [],
		}
	},
	actions: {
		// Data fetching
		async fetchProjects() {
			const authStore = useAuthStore()
			if (authStore.authUser) {
				await axios
					.get('http://localhost:3001/projects', {
						params: {
							userId: authStore.authUser,
						},
					})
					.then((res) => {
						this.projects = []
						this.projects.push(...res.data)
					})
					.catch((err) => console.log(err))
				// console.log('projects ', this.projects)
				const projectId = this.projects.map((project) => project.id)
				await this.fetchCards(projectId)
			}
		},

		async fetchCards(projectId) {
			await axios
				.get('http://localhost:3001/cards', {
					params: {
						projectId: projectId,
					},
				})
				.then((res) => {
					this.cards = []
					this.cards.push(...res.data)
				})
				.catch((err) => console.log(err))
			// console.log('cards ', this.cards)
			const cardId = this.cards.map((card) => card.id)
			await this.fetchTasks(cardId)
		},

		async fetchTasks(cardId) {
			await axios
				.get('http://localhost:3001/tasks', {
					params: {
						cardId: cardId,
					},
				})
				.then((res) => {
					this.tasks = []
					this.tasks.push(...res.data)
				})
				.catch((err) => console.log(err))
			// console.log('tasks ', this.tasks)
		},

		// Projects actions
		async addProject(projectData, userId) {
			const newProject = {
				id: nanoid(),
				...projectData,
				cards: [],
				userId,
			}
			await handlePost('projects', newProject)

			// Edit user projects array
			const authStore = useAuthStore()
			const user = authStore.user
			let projects = this.projects
			if (user.projects.length) {
				projects = [...user.projects, newProject.id]
			} else {
				projects = [newProject.id]
			}
			await axios
				.patch(`http://localhost:3001/users/${user.id}`, { projects })
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err))
		},

		async editProject(projectId, data) {
			await handleEdit('projects', projectId, data)
		},

		async deleteProject(projectId) {
			// Edit user projects array
			const authStore = useAuthStore()
			const user = authStore.user
			const projectToDelete = user.projects.indexOf(projectId)
			user.projects.splice(projectToDelete, 1)
			await handleEdit('users', user.id, { projects: user.projects })

			// Delete project's cards
			const cards = this.cards.filter(
				(card) => card.projectId === projectId
			)
			cards.forEach(async (card) => {
				await handleDelete('cards', card.id)
			})

			// Delete current project
			await handleDelete('projects', projectId)
		},

		// Cards actions
		async addCard(title, projectId) {
			// Card post
			const newCard = {
				id: nanoid(),
				title,
				tasks: [],
				projectId,
			}
			await handlePost('cards', newCard)

			const project = findById(this.projects, projectId)
			let cards = this.cards
			if (project.cards.length) {
				cards = [...project.cards, newCard.id]
			} else {
				cards = [newCard.id]
			}
			await axios
				.patch(`http://localhost:3001/projects/${project.id}`, {
					cards,
				})
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err))
		},

		async editCard(cardId, title) {
			await handleEdit('cards', cardId, { title })
		},

		async deleteCard(cardId) {
			// Edit project cards array
			const project = this.projects.find((project) =>
				project.cards.includes(cardId)
			)
			const cardToDelete = project.cards.indexOf(cardId)
			project.cards.splice(cardToDelete, 1)
			await handleEdit('projects', project.id, { cards: project.cards })

			//Delete current card
			await handleDelete('cards', cardId)
		},

		// Tasks actions
		async addTask(text, cardId) {
			// Task post
			const newTask = {
				id: nanoid(),
				text,
				cardId,
			}
			await handlePost('tasks', newTask)

			// Edit card tasks array
			const card = findById(this.cards, cardId)
			let tasks = this.tasks
			if (card.tasks.length) {
				tasks = [...card.tasks, newTask.id]
			} else {
				tasks = [newTask.id]
			}

			await axios
				.patch(`http://localhost:3001/cards/${card.id}`, {
					tasks,
				})
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err))
		},

		async editTask(taskId, text) {
			await handleEdit('tasks', taskId, { text })
		},

		async deleteTask(taskId) {
			// Edit card tasks array
			const card = this.cards.find((card) => card.tasks.includes(taskId))
			const taskToDelete = card.tasks.indexOf(taskId)
			card.tasks.splice(taskToDelete, 1)
			await handleEdit('cards', card.id, { tasks: card.tasks })

			// Delete current task
			await handleDelete('tasks', taskId)
		},

		async dragAndDrop(cardId, taskId) {
			const task = findById(this.tasks, taskId)
			const nextCard = findById(this.cards, cardId)
			const prevCard = findById(this.cards, task.cardId)

			const nextCardTasks = [...nextCard.tasks, task.id]
			const prevCardTasks = [...prevCard.tasks]
			const taskToMove = prevCardTasks.indexOf(task.id)
			prevCardTasks.splice(taskToMove, 1)

			if (nextCard.id === prevCard.id) {
				return
			} else {
				await handleEdit('tasks', taskId, { cardId })
				await handleEdit('cards', prevCard.id, { tasks: prevCardTasks })
				await handleEdit('cards', nextCard.id, { tasks: nextCardTasks })
				// console.log(prevCardTasks)
			}
		},
	},
})
