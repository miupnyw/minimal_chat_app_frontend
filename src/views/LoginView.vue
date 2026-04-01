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
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

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

	try {
		// login
		await authStore.login(form.username.trim(), form.password)

		// redirect if success 
		router.push({ name: 'userListView' })
	} catch (err) {
		errorMsg.value = err.message || 'Invalid username or password'
	} finally {
		loading.value = false
	}
}
</script>

<style scoped>
.login-container{
	min-height: 100vh
}
</style>