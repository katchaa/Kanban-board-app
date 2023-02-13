import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
	state: () => {
		return {
			authUser: localStorage.getItem('user'),
			authError: null,
		}
	},
	actions: {
		async editUser(data) {
			await axios
				.patch('http://localhost:3001/user/edit', data, {
					withCredentials: true,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
		},

		async changePassword(data) {
			await axios
				.patch('http://localhost:3001/user/change-password', data, {
					withCredentials: true,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
		},

		async deleteAccount() {
			await axios
				.delete('http://localhost:3001/user/delete-user', {
					withCredentials: true,
				})
				.then((res) => {
					console.log(res.data)
					localStorage.removeItem('user')
				})
				.catch((err) => console.log(err))
		},

		async registration(data) {
			const { username, firstName, lastName, email, password } = data
			const newUser = {
				username,
				firstName,
				lastName,
				email,
				password,
				avatar: `http://picsum.photos/id/${Math.floor(
					Math.random() * 500
				)}/200/300`,
			}
			await axios
				.post('http://localhost:3001/register', newUser, {
					withCredentials: true,
				})
				.then((res) => {
					localStorage.setItem('user', res.data._id)
					this.authUser = res.data._id
				})
				.catch((err) => console.log(err))
		},

		async login(data) {
			await axios
				.post('http://localhost:3001/login', data, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.data.length === 0) {
						throw new Error(
							'Something went wrong. Please, check up your email and password.'
						)
					} else {
						this.authError = null
						localStorage.setItem('user', res.data._id)
						this.authUser = res.data._id
					}
				})
				.catch((err) => {
					this.authError = err.message
				})
		},

		async logout() {
			await axios
				.post('http://localhost:3001/logout', { withcretentials: true })
				.then(() => localStorage.removeItem('user'))
				.catch((err) => console.log(err))
		},
	},
})
