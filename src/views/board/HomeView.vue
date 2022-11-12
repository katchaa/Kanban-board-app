<template>
	<section class="m-6" v-if="user">
		<h1 class="text-4xl font-semibold text-gray-700 mb-3 drop-shadow-md">
			Welcome {{ user.username }}
		</h1>
		<!-- Project card -->
		<aside class="flex grow-0 shrink-0 gap-6">
			<RouterLink
				:to="{
					name: 'project',
					params: {
						userId: user.id,
						projectId: project.id,
					},
				}"
				class="bg-gray-200 w-96 h-64 px-3 py-2 rounded-md hover:underline"
				v-for="project in projects"
				:key="project.id"
			>
				<h3 class="text-lg font-semibold mb-1">
					{{ project.projectName }}
				</h3>
				<img
					class="w-full h-5/6 object-cover rounded-md shadow-md border-4 transition duration-300 hover:scale-[1.025]"
					:src="project.avatar"
					:alt="project.projectName"
				/>
			</RouterLink>
		</aside>
	</section>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useProjectStore } from '../../stores/project'

const authStore = useAuthStore()
const projectStore = useProjectStore()

const user = computed(() => {
	return authStore.user
})

const projects = computed(() => {
	let projects = []
	// if (user.value) {
	for (const projectId of user.value.projects) {
		projects.push(
			projectStore.projects.find((project) => project.id === projectId)
		)
		// }
	}
	return projects
})
</script>
