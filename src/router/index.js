import { createRouter, createWebHistory } from 'vue-router'
import UserListView from '@/views/UserListView.vue'
import ChatView from '@/views/ChatView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
	{
		path: '/',
		name: 'userListView',
		component: UserListView,
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView,
	},
	{
		path: '/chat-view/:id',
		name: 'chatView',
		component: ChatView,
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

router.beforeEach((to) => {
	const authStore = useAuthStore()
	// in login view, go to userListView if already do authentication
	if (to.name === 'login' && authStore.isAuthenticated) {
		return { name: 'userListView' }
	}

	// go to login if not do authentication
	if (to.name !== 'login' && !authStore.isAuthenticated) {
		return { name: 'login' }
	}
})

export default router
