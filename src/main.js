import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import './styles/global.css'
import '@mdi/font/css/materialdesignicons.css'

async function bootstrap() {
	const pinia = createPinia()
	const app = createApp(App)
	app.use(pinia)
	app.use(router)
	app.use(vuetify)
	/* NOTE: vue-i18n automatically make it as global
		app.config.globalProperties.$t
		app.config.globalProperties.$i18n
	*/
	app.use(i18n)
	app.mount('#app')
}

bootstrap()
