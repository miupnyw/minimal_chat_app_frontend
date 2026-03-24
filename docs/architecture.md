src/
│
├── assets/        # images, fonts, global styles
├── components/    # reusable UI components
├── views/         # pages (route-level components)
├── layouts/       # layout wrappers (Navbar, Sidebar)
├── router/        # Vue Router config
├── store/         # state management (Pinia)
├── services/      # API calls (axios, fetch)
├── composables/   # reusable logic (hooks): Vue logic (reactive, stateful)
├── utils/         # helper functions: pure functions (no Vue)
├── constants/     # static values (enums, config)
│
├── App.vue
└── main.js

### Composables VS Mixins
Composables → modern, explicit, safe
Mixins → legacy, implicit, risky

### 1. Container / Presentational Pattern
- Container (Page / View)
Handles:
	API calls
	state
	business logic
- Presentational (Component)
Handles:
	UI only
	props + events

!! Smart → View
!! Dumb → UI component

### 2. Feature-Based Structure (Scalable)
src/
  features/
    auth/
      LoginView.vue
      LoginForm.vue
      useLogin.js

### 3. Atomic Design (UI System)
Break components into levels:
	Atoms → Button, Input
	Molecules → FormField
	Organisms → LoginForm
	Pages → LoginView

### 4. Composition Pattern (Vue 3 best practice)
Move logic into composables then import file and use in View

### 5. Layout Pattern
layouts/
  DefaultLayout.vue
  AuthLayout.vue