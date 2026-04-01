<template>
	<v-list-item
		:to="`/chat-view/${user.id}`"
	>
		<!-- Avatar -->
		<template #prepend>
		<v-avatar
			:size="44"
			:class="user.online ? 'avatar-online' : 'avatar-offline'"
		>
			<v-img v-if="user.avatar" :src="user.avatar" />
		</v-avatar>
		</template>

		<!-- Name -->
		<v-list-item-title class="text-body-2 font-weight-medium">
			{{ user.name }}
		</v-list-item-title>

		<!-- Preview message -->
		<v-list-item-subtitle class="text-caption">
			{{ user.preview }}
		</v-list-item-subtitle>

		<!-- Time -->
		<template #append>
			<span class="text-caption text-medium-emphasis">{{ user.time }}</span>
		</template>
	</v-list-item>
</template>

<script setup>
const props = defineProps({
	user: {
		type: Object,
		required: true,
	},
})

</script>

<style>
.avatar-online {
	border: 2px solid rgb(var(--v-theme-accent));
}

.avatar-offline {
	border: 2px solid transparent;
}
</style>