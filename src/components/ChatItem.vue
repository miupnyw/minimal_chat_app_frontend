<template>
	<div class="d-flex mb-3" :class="isMe ? 'justify-end' : 'justify-start'">
		<!-- Sender avatar -->
		<v-avatar
			v-if="!isMe && avatar"
			:size="28"
			class="mr-2 align-self-end"
		>
			<v-img :src="avatar" />
		</v-avatar>

		<!-- Bubble -->
		<div
			class="bubble pa-3"
			:class="isMe ? 'bubble-sent' : 'bubble-received'"
		>
			{{ message.message }}
		</div>

		<!-- Time -->
		<span class="text-caption text-medium-emphasis align-self-end mx-1">
			{{ formatTime(message.time) }}
		</span>
	</div>
</template>

<script setup>
defineProps({
	message: { type: Object, required: true },
	isMe: { type: Boolean, default: false },
	avatar: { type: String, default: null },
})

const formatTime = (ts) =>
	new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
</script>

<style scoped>
.bubble {
	max-width: 68%;
	border-radius: 16px;
	font-size: 14px;
	line-height: 1.5;
	word-break: break-word;
}

.bubble-received {
	background: rgba(var(--v-theme-surface));
	border-bottom-left-radius: 4px;
}

.bubble-sent {
	background: rgb(var(--v-theme-primary));
	color: white;
	border-bottom-right-radius: 4px;
}
</style>
