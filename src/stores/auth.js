import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const STORAGE_KEY = import.meta.env.VITE_AUTH_STORAGE_KEY

export const useAuthStore = defineStore('auth', () => {
	// get token and expiry date from local storage
	const token = ref(localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)).token : null)
	const expiresAt = ref(localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)).expiresAt : null)

	const isAuthenticated = computed(() => {
		// return false if no token and no expiry date
		if (!token.value || !expiresAt.value) return false

		// true if token is not expired
		return new Date().getTime() < new Date(expiresAt.value).getTime()
	})

	async function login(username, password) {
		const res = await fetch(`${BASE_URL}/api/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		})

		// error if catch error
		if (!res.ok) {
			const data = await res.json().catch(() => ({}))
			throw new Error(data.message || 'Invalid username or password')
		}

		const data = await res.json()

		// set token and expiry date to store
		token.value = data.token
		expiresAt.value = data.expiresAt

		// save new token and expiry date to local storage
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: data.token, expiresAt: data.expiresAt }))
	}

	function logout() {
		// clear token and expiry date in store and local storage
		token.value = null
		expiresAt.value = null
		localStorage.removeItem(STORAGE_KEY)
	}

	return { token, expiresAt, isAuthenticated, login, logout }
})
