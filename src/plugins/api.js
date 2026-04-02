import axios from 'axios'
import router from '@/router'
import { camelizeKeys, snakelizeKeys } from '@/utils/caseTransform'

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

// Request interceptors
api.interceptors.request.use(config => {
	if (config.data) config.data = snakelizeKeys(config.data)
	if (config.params) config.params = snakelizeKeys(config.params)
	return config
})

// Response interceptors
let isRefreshing = false
let failedQueue	= []

api.interceptors.response.use(
	res => {
		res.data = camelizeKeys(res.data)
		return res
	},
	async err => {
		const original = err.config

		if (err.response?.status === 401 &&
				err.response?.data?.code === 'TOKEN_EXPIRED' &&
				!original._retry) {

			original._retry = true

			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				}).then(() => api(original))
			}

			isRefreshing = true
			try {
				await api.post('/auth/refresh')
				failedQueue.forEach(q => q.resolve())
				return api(original)
			} catch {
				failedQueue.forEach(q => q.reject())
				router.push('/login')
			} finally {
				isRefreshing = false
				failedQueue	= []
			}
		}

		// surface backend message so callers get a readable error
		const message = err.response?.data?.message || err.message
		return Promise.reject(new Error(message))
	}
)

export default api