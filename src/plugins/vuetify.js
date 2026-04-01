import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const theme = {
	defaultTheme: 'light',
	themes: {
		light: {
			dark: false,
			colors: {
				primary: '#1976D2',     // main brand
				secondary: '#5C6BC0',   // subtle accent
				accent: '#42A5F5',

				background: '#F5F7FA',  // soft gray (better than pure white)
				surface: '#FFFFFF',

				success: '#4CAF50',
				warning: '#FB8C00',
				error: '#E53935',
				info: '#2196F3'
			}
		},
		dark: {
			dark: true,
			colors: {
				primary: '#90CAF9',     // lighter for dark mode
				secondary: '#B39DDB',
				accent: '#64B5F6',

				background: '#121212',  // standard dark
				surface: '#1E1E1E',

				success: '#66BB6A',
				warning: '#FFA726',
				error: '#EF5350',
				info: '#42A5F5'
			}
		}
	}
}

export default createVuetify({
	theme: theme
})