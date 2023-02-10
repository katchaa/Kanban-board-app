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
			user: {},
			projects: [],
			cards: [],
			tasks: [],
		}
	},
	getters: {
		getFullName() {
			return `${this.user.firstName} ${this.user.lastName}`
		},
	},
	actions: {
		// Data fetching
		async fetchUser() {
			await axios
				.get('http://localhost:3001/user/me', { withCredentials: true })
				.then((res) => {
					this.projects = []
					this.cards = []
					this.tasks = []
					this.user = res.data
					this.projects = res.data.projects
					for (const project of res.data.projects) {
						if (project.cards.length) {
							this.cards.push(...project.cards)
							for (const card of project.cards) {
								if (card.tasks.length) {
									this.tasks.push(...card.tasks)
								}
							}
						}
					}
				})
				.catch((err) => console.log(err))
		},

		// Projects actions
		async addProject(projectData) {
			const newProject = {
				...projectData,
				cover: `http://picsum.photos/id/${Math.floor(
					Math.random() * 500
				)}/200/300`,
			}
			await axios
				.post('http://localhost:3001/project', newProject, {
					withCredentials: true,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
		},

		async editProject(projectId, data) {
			await axios
				.patch(`http://localhost:3001/project/${projectId}`, data, {
					withCredentials: true,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
		},

		async deleteProject(projectId) {
			await axios
				.delete(`http://localhost:3001/project/${projectId}`, {
					withCredentials: true,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
		},

		// Cards actions
		async addCard(title, projectId) {
			const newCard = {
				title,
				projectId,
			}
			await axios
				.post('http://localhost:3001/card', newCard, {
					withCredentials: true,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
		},

		async editCard(cardId, title) {
			await axios
				.patch(
					`http://localhost:3001/card/${cardId}`,
					{ title },
					{
						withCredentials: true,
					}
				)
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
		},

		async deleteCard(cardId) {
			await axios
				.delete(`http://localhost:3001/card/${cardId}`, {
					withCredentials: true,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
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
			await handleEdit('cards', card.id, { tasks })
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
			}
		},
	},
})
