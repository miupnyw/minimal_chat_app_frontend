<template>
	<v-list-item
		:to="`/chat-view/${user.id}`"
	>
		<!-- Avatar -->
		<template #prepend>
		<v-avatar
			:size="44"
		>
			<v-img v-if="user.avatar" :src="user.avatar" />
		</v-avatar>
		</template>

		<!-- Name -->
		<v-list-item-title class="text-body-2 font-weight-medium">
			{{ user.name }}
		</v-list-item-title>

		<template #append>
			<v-icon size="10" :color="user.online ? 'success' : 'grey'">mdi-circle</v-icon>
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
</style>