<template>
	<v-app class="bg-surface">
		<!-- Toolbar -->
		<v-app-bar flat>
			<v-container>
				<v-app-bar-title>
					<span class="text-body-1 font-weight-mediums">Messages</span>
				</v-app-bar-title>
			</v-container>
		</v-app-bar>

		<v-main>
			<!-- Search -->
			<v-container class="full-height pa-0">
				<v-text-field
					v-model="search"
					hide-details
					clearable
					placeholder="Search users..."
					prepend-inner-icon="mdi-magnify"
					density="compact"
					rounded="xl"
					class="search-field"
				/>

			<!-- User list -->
			<v-list lines="two" class="full-height pt-2" style="height: 100%;">
				<v-list-subheader>Messages</v-list-subheader>

				<!-- Filtered user -->
				<UserItem
					v-for="user in filteredUsers"
					:key="user.id"
					:user="user"
				/>

				<!-- No users -->
				<v-list-item v-if="!filteredUsers.length">
					<v-list-item-title class="text-medium-emphasis text-body-2 text-center py-4">
						No users found
					</v-list-item-title>
				</v-list-item>
			</v-list>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import UserItem from '@/components/UserItem.vue';
import { ref, reactive, computed } from 'vue'

// mock users
const USERS = reactive([{
		id: 1,
		name: 'Alice Johnson',
		online: true,
		time: '9:41',
		preview: 'Sounds good!',
		avatar: 'https://i.pravatar.cc/150?img=1'
	},
	{
		id: 2,
		name: 'Michael Lee',
		online: false,
		time: '8:20',
		preview: 'See you tomorrow',
		avatar: 'https://i.pravatar.cc/150?img=2'
	}
])

const search = ref('')
const filteredUsers = computed(() =>
	// filter match user by name
	USERS.filter(user =>
		user.name.toLowerCase().includes(search.value.toLowerCase())
	)
)
</script>

<style scoped lang="scss">
.search-field {
	:deep(.v-field__outline),
	:deep(.v-field__underlay),
	:deep(.v-field__outline__notch) {
		display: none !important;
	}
}

</style>
