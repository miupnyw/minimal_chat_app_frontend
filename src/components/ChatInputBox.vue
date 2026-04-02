<template>
	<div class="chat-input-bar">
		<v-container class="py-2 px-4">
			<div class="d-flex align-end gap-2">
				<v-textarea
					v-model="text"
					variant="outlined"
					density="compact"
					placeholder="Type a message..."
					rows="1"
					auto-grow
					max-rows="4"
					hide-details
					rounded="xl"
					@keydown.enter.prevent="send"
				/>
				<v-btn
					icon
					color="primary"
					size="small"
					:disabled="!text.trim()"
					@click="send"
				>
					<v-icon>mdi-send</v-icon>
				</v-btn>
			</div>
		</v-container>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['send'])
const text = ref('')

function send() {
	if (!text.value.trim()) return
	emit('send', text.value.trim())
	text.value = ''
}
</script>

<style scoped>
.chat-input-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgb(var(--v-theme-surface));
	border-top: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
	z-index: 10;
}
</style>
