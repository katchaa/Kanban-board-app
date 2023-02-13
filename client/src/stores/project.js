import { defineStore } from 'pinia'
import axios from 'axios'
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
			await handlePost('project', newProject)
		},

		async editProject(projectId, data) {
			await handleEdit('project', projectId, data)
		},

		async deleteProject(projectId) {
			await handleDelete('project', projectId)
		},

		// Cards actions
		async addCard(title, projectId) {
			const newCard = {
				title,
				projectId,
			}
			await handlePost('card', newCard)
		},

		async editCard(cardId, title) {
			await handleEdit('card', cardId, title)
		},

		async deleteCard(cardId) {
			await handleDelete('card', cardId)
		},

		// Tasks actions
		async addTask(text, cardId) {
			const newTask = {
				text,
				cardId,
			}
			await handlePost('task', newTask)
		},

		async editTask(taskId, text) {
			await handleEdit('task', taskId, text)
		},

		async deleteTask(taskId) {
			await handleDelete('task', taskId)
		},

		async dragAndDrop(cardId, taskId) {
			const task = findById(this.tasks, taskId)
			if (task.cardId === cardId) return
			await handleEdit('task/dnd', taskId, { _id: cardId })
		},
	},
})
