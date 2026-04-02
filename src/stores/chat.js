import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useChatStore = defineStore('chat', () => {
	const users = reactive([
		{ id: 1, name: 'Alice Johnson', online: true,  avatar: 'https://i.pravatar.cc/150?img=1' },
		{ id: 2, name: 'Bob Smith',     online: true,  avatar: 'https://i.pravatar.cc/150?img=2' },
		{ id: 3, name: 'Carol White',   online: false, avatar: 'https://i.pravatar.cc/150?img=3' },
		{ id: 4, name: 'David Lee',     online: true,  avatar: 'https://i.pravatar.cc/150?img=4' },
	])

	const histories = reactive({
		1: [
			{ id: 1, message: 'Are we still on for tomorrow?', senderUserId: 1, time: new Date('2024-01-01T09:30:00').getTime() },
			{ id: 2, message: 'Yes! 10am at the usual place.',  senderUserId: 0, time: new Date('2024-01-01T09:32:00').getTime() },
			{ id: 3, message: 'Sounds good!',                   senderUserId: 1, time: new Date('2024-01-01T09:41:00').getTime() },
		],
		2: [
			{ id: 4, message: 'Just pushed the update.', senderUserId: 0, time: new Date('2024-01-01T08:15:00').getTime() },
			{ id: 5, message: 'Thanks!',                  senderUserId: 2, time: new Date('2024-01-01T08:30:00').getTime() },
		],
		3: [
			{ id: 6, message: 'Did you review the doc?', senderUserId: 3, time: new Date('2024-01-01T08:00:00').getTime() },
			{ id: 7, message: 'Let me check',             senderUserId: 0, time: new Date('2024-01-01T08:05:00').getTime() },
		],
		4: [
			{ id: 8, message: 'Can we reschedule?', senderUserId: 4, time: new Date('2024-01-01T10:00:00').getTime() },
		],
	})

	let nextId = 100

	function getUser(id) {
		return users.find(u => u.id === Number(id))
	}

	function getMessages(userId) {
		return histories[userId] ?? []
	}

	function sendMessage(userId, message) {
		const msg = { id: nextId++, message, senderUserId: 0, time: Date.now() }
		if (!histories[userId]) histories[userId] = []
		histories[userId].push(msg)
	}

	return { users, getUser, getMessages, sendMessage }
})
