import { defineStore } from 'pinia'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { useAuthStore } from './auth'

export const useProjectStore = defineStore('project', {
	state: () => {
		return {
			projects: [],
			cards: [],
			tasks: [],
		}
	},
	actions: {
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
	},
})
