import { defineStore } from 'pinia'
import axios from 'axios'
import { findById } from '../helpers/project'

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
			const newTask = {
				text,
				cardId,
			}
			await axios
				.post('http://localhost:3001/task', newTask, {
					withCredentials: true,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
		},

		async editTask(taskId, text) {
			await axios
				.patch(
					`http://localhost:3001/task/${taskId}`,
					{ text },
					{
						withCredentials: true,
					}
				)
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
		},

		async deleteTask(taskId) {
			await axios
				.delete(`http://localhost:3001/task/${taskId}`, {
					withCredentials: true,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
		},

		async dragAndDrop(cardId, taskId) {
			const task = findById(this.tasks, taskId)
			if (task.cardId === cardId) return
			await axios
				.patch(
					`http://localhost:3001/task/dnd/${taskId}`,
					{ _id: cardId },
					{
						withCredentials: true,
					}
				)
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
		},
	},
})
