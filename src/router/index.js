import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import LandingPage from '../views/LandingPage.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	routes: [
		{
			path: '/',
			name: 'landingPage',
			component: LandingPage,
			meta: { auth: false },
		},
		{
			path: '/:userId',
			name: 'board',
			component: () =>
				import(
					/*webpackChunkName: "board-view"*/ '@/views/BoardView.vue'
				),
			redirect: { name: 'projectHome' },
			meta: { auth: true },
			children: [
				{
					path: 'home',
					name: 'projectHome',
					component: () =>
						import(
							/*webpackChunkName: "project-view"*/ '@/views/board/HomeView.vue'
						),
				},
				{
					path: ':projectId',
					name: 'project',
					component: () =>
						import(
							/*webpackChunkName: "project-view"*/ '@/views/board/ProjectView.vue'
						),
				},
				{
					path: 'profile',
					name: 'user',
					component: () =>
						import(
							/*webpackChunkName: "user-profile"*/ '@/views/board/UserView.vue'
						),
				},
				{
					path: 'info',
					name: 'info',
					component: () =>
						import(
							/*webpackChunkName: "info-view"*/ '@/views/board/InfoView.vue'
						),
				},
			],
		},
		{
			path: '/auth',
			name: 'auth',
			meta: { auth: false },
			component: () =>
				import(
					/*webpackChunkName: "auth-view"*/ '@/views/AuthView.vue'
				),
		},
	],
})

router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore()
	if (to.meta.auth && !authStore.authUser) {
		next({ name: 'auth' })
	} else next()
})

export default router
