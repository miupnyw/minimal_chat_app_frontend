<template>
	<v-app>
		<!-- App bar -->
		<v-app-bar flat border="b">
			<v-btn icon @click="router.push('/')">
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>

			<v-avatar v-if="user?.avatar" size="36" class="mr-2">
				<v-img :src="user.avatar" />
			</v-avatar>

			<v-app-bar-title>
				<div class="text-body-2 font-weight-medium">{{ user?.name }}</div>
				<div class="text-caption text-medium-emphasis">
					{{ user?.online ? 'Online' : 'Offline' }}
				</div>
			</v-app-bar-title>
		</v-app-bar>

		<!-- Messages -->
		<v-main>
			<v-container ref="containerRef" class="chat-container pa-4">
				<ChatItem
					v-for="message in messages"
					:key="message.id"
					:message="message"
					:is-me="message.senderUserId === 0"
					:avatar="user?.avatar"
				/>

				<!-- Spacer for fixed input bar -->
				<div :style="{ height: inputHeight + 'px' }" />
			</v-container>
		</v-main>

		<!-- Input -->
		<ChatInputBox ref="inputRef" @send="onSend" />
	</v-app>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import ChatItem from '@/components/ChatItem.vue'
import ChatInputBox from '@/components/ChatInputBox.vue'

const route = useRoute()
const router = useRouter()
const chat = useChatStore()

const userId = computed(() => Number(route.params.id))
const user = computed(() => chat.getUser(userId.value))
const messages = computed(() => chat.getMessages(userId.value))

const containerRef = ref(null)
const inputRef = ref(null)
const inputHeight = ref(72)

function onSend(text) {
	chat.sendMessage(userId.value, text)
}

function scrollToBottom() {
	nextTick(() => {
		const el = containerRef.value?.$el ?? containerRef.value
		if (el) el.scrollTop = el.scrollHeight
	})
}

onMounted(async () => {
	await nextTick()
	scrollToBottom()

	const inputEl = inputRef.value?.$el ?? inputRef.value
	if (inputEl) {
		inputHeight.value = inputEl.getBoundingClientRect().height
		new ResizeObserver(() => {
			inputHeight.value = inputEl.getBoundingClientRect().height
		}).observe(inputEl)
	}
})

watch(messages, scrollToBottom)
</script>

<style scoped>
.chat-container {
	flex: 1;
	overflow-y: auto;
	max-width: 800px;
}
</style>
