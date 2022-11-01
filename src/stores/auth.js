import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
	state: () => {
		return {
			user: {},
			authUser: localStorage.getItem('user'),
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
						console.log(this.user)
					})
			}
		},

		async registration(data) {
			const newUser = {
				id: nanoid(),
				username: data.username,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				password: data.password,
				projects: [],
				avatar: 'groot.jpg',
			}
			await axios
				.post('http://localhost:3001/users', newUser)
				.then((res) => {
					localStorage.setItem('user', newUser.id)
					this.authUser = newUser.id
					console.log(res.data)
				})
			await this.fetchUser()
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
					if (res.data.length !== 0) {
						localStorage.setItem('user', res.data[0].id)
						this.authUser = res.data[0].id
					} else {
						return
					}
				})
				.catch((err) => console.log(err))
			await this.fetchUser()
		},
		async logout() {
			localStorage.removeItem('user')
		},
	},
})
