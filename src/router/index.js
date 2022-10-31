import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '../views/LandingPage.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	routes: [
		{
			path: '/',

			name: 'landingPage',

			component: LandingPage,
		},
		{
			path: '/:userId',
			name: 'board',
			component: () =>
				import(
					/*webpackChunkName: "board-view"*/ '@/views/BoardView.vue'
				),
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
			],
		},
		{
			path: '/auth',
			name: 'auth',
			component: () =>
				import(
					/*webpackChunkName: "auth-view"*/ '@/views/AuthView.vue'
				),
		},
	],
})

export default router
