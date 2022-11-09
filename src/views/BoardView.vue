<template>
	<TheBoardNavbar />
	<div class="flex justify-start">
		<TheAsideNavbar v-if="projects.length" />
		<div class="overflow-y-hidden w-full">
			<RouterView />
		</div>
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
