<template>
	<div class="grid-board">
		<TheBoardNavbar class="board-navbar" />
		<TheAsideNavbar class="board-aside-navbar" v-if="projects.length" />
		<RouterView class="router-view" />
	</div>
</template>

<script setup>
import { computed } from 'vue'
import TheAsideNavbar from '../components/board/layout/TheAsideNavbar.vue'
import TheBoardNavbar from '../components/board/layout/TheBoardNavbar.vue'
import { useAuthStore } from '../stores/auth'
import { useProjectStore } from '../stores/project'

const authStore = useAuthStore()
const projectStore = useProjectStore()
await authStore.fetchUser()
await projectStore.fetchProjects()

const projects = computed(() => projectStore.projects)
</script>

<style scoped lang="scss">
.grid-board {
	display: grid;
	grid-template-columns: 1.9rem 1fr;
	grid-template-rows: 3rem 1fr;

	.board-navbar {
		grid-column: 1/3;
		grid-row: 1/2;
	}

	.board-aside-navbar {
		grid-column: 1/2;
		grid-row: 2/3;
	}

	.router-view {
		grid-column: 2/3;
		grid-row: 2/3;
		padding: 0.5rem 0.8rem;

		overflow: hidden;
		scrollbar-color: transparentize($text-primary, 0.5);
		scrollbar-width: thin;

		&::-webkit-scrollbar {
			height: 10px;
			width: 10px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: transparentize($text-primary, 0.5);
			border-radius: $radius;
		}

		&::-webkit-scrollbar-thumb:hover {
			background-color: transparentize($text-primary, 0.2);
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}
	}
}

@media screen and (min-width: $media-xs) {
	.grid-board {
		grid-template-columns: 2.7rem 1fr;
	}
}

@media screen and (min-width: $media-sm) {
	.grid-board {
		.router-view {
			overflow-x: auto;
		}
	}
}
</style>
