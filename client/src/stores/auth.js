import { defineStore } from 'pinia'
import { useProjectStore } from './project'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { handleDelete, handleEdit } from '../helpers/project'

export const useAuthStore = defineStore('auth', {
	state: () => {
		return {
			user: {},
			authUser: localStorage.getItem('user'),
			authError: null,
		}
	},
	getters: {
		getFullName() {
			return `${this.user.firstName} ${this.user.lastName}`
		},
	},
	actions: {
		async fetchUser() {
			if (this.authUser) {
				await axios
					.get('http://localhost:3001/users', {
						params: {
							id: this.authUser,
						},
					})
					.then((res) => {
						this.user = res.data[0]
					})
			}
		},

		async editUser(userId, data) {
			await handleEdit('users', userId, data)
		},

		async changePassword(userId, password) {
			await handleEdit('users', userId, { password })
		},

		async deleteAccount(userId) {
			// Delete all users cards and tasks
			const projectStore = useProjectStore()
			const projects = projectStore.projects.filter(
				(project) => project.userId === userId
			)
			let cards = []
			for (let project of projects) {
				cards.push(...project.cards)
			}
			for (let cardId of cards) {
				await handleDelete('cards', cardId)
			}

			// Delete user account
			await handleDelete('users', userId)
			localStorage.removeItem('user')
		},

		async registration(data) {
			const newUser = {
				id: nanoid(),
				username: data.username,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				password: data.password,
				avatar: `http://picsum.photos/id/${Math.floor(
					Math.random() * 500
				)}/200/300`,
				projects: [],
			}
			await axios
				.post('http://localhost:3001/users', newUser)
				.then((res) => {
					localStorage.setItem('user', res.data.id)
					this.authUser = res.data.id
				})
				.catch((err) => console.log(err))
		},

		async login(data) {
			await axios
				.get('http://localhost:3001/users', {
					params: {
						email: data.email,
						password: data.password,
					},
				})
				.then((res) => {
					if (res.data.length === 0) {
						throw new Error(
							'Something went wrong. Please, check up your email and password.'
						)
					} else {
						this.authError = null
						localStorage.setItem('user', res.data[0].id)
						this.authUser = res.data[0].id
					}
				})
				.catch((err) => {
					this.authError = err.message
				})
		},

		async logout() {
			localStorage.removeItem('user')
		},
	},
})
