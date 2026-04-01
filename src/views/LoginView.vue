<template>
	<v-app>
		<v-main>
			<v-container
				class="login-container d-flex align-center justify-center">
				<v-card width="400" flat border>
				<v-card-text class="pa-8">

					<!-- Logo -->
					<div class="mb-4">
						<v-icon color="primary" size="40">mdi-message</v-icon>
					</div>
					<div class="text-h6 font-weight-medium mb-1">Welcome back</div>
					<div class="text-body-2 text-medium-emphasis mb-4">Sign in to your account</div>

					<!-- Error box -->
					<v-alert
						v-if="errorMsg"
						type="error"
						variant="tonal"
						density="compact"
						class="mb-4"
						closable
						@click:close="errorMsg = ''"
					>
					{{ errorMsg }}
					</v-alert>

					<!-- Username -->
					<v-text-field
						v-model="form.username"
						label="Username"
						placeholder="Enter username"
						variant="outlined"
						density="compact"
						autocomplete="username"
						class="mb-2"
						:error-messages="errors.username"
						@keyup.enter="login"
						@update:model-value="errors.username = ''"
					/>

					<!-- Password -->
					<v-text-field
						v-model="form.password"
						label="Password"
						placeholder="Enter password"
						variant="outlined"
						density="compact"
						autocomplete="current-password"
						class="mb-4"
						:type="showPassword ? 'text' : 'password'"
						:append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
						:error-messages="errors.password"
						@click:append-inner="showPassword = !showPassword"
						@keyup.enter="login"
						@update:model-value="errors.password = ''"
					/>

					<v-btn
						block
						color="primary"
						size="large"
						:loading="loading"
						@click="login"
					>
						Sign in
					</v-btn>

				</v-card-text>
				</v-card>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// mock users
const USERS = [
	{ username: 'user1', password: 'user1' },
	{ username: 'admin', password: 'admin' },
]

const router = useRouter()

const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const form = reactive({ username: '', password: '' })
const errors = reactive({ username: '', password: '' })

function validate() {
	// clear errors
	errors.username = ''
	errors.password = ''
	let valid = true

	// has username?
	if (!form.username.trim()) {
		// no, add error message
		errors.username = 'Username is required';
		valid = false
	}

	// has password?
	if (!form.password) {
		errors.password = 'Password is required';
		valid = false
	}

	// true if it has both, otherwise, false
	return valid
}

async function login() {
	// is valid?
	if (!validate()) return
	errorMsg.value = ''

	loading.value = true

	// TODO: call real API
	const user = USERS.find( u => u.username === form.username.trim() && u.password === form.password )

	loading.value = false

	// return if not found match user and alert error
	if (!user) {
		errorMsg.value = 'Invalid username or password'
		return
	}

	// TODO: move to store
	localStorage.setItem('currentUser', JSON.stringify({ username: user.username }))

	// redirect to user list view
	router.push('/')
}
</script>

<style scoped>
.login-container{
	min-height: 100vh
}
</style>