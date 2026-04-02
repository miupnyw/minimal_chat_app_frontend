import { defineStore } from 'pinia'
import api from '@/plugins/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
	}),

	getters: {
		isAuthenticated: (state) => !!state.user,
	},

	actions: {
		async login(username, password) {
			await api.post('/auth/login', { username, password })
			await this.fetchMe()
		},

		async fetchMe() {
			const { data } = await api.get('/auth/me')
			this.user = data.user
		},

		async logout() {
			await api.post('/auth/logout')
			this.user = null
			router.push('/login')
		},
	},
})