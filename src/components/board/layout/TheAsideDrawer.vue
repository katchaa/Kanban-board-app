<template>
	<div class="flex flex-col w-48 transition duration-300">
		<i
			class="fa-solid fa-chevron-left text-white/50 hover:text-white transition duration-200 self-end mb-0.5 cursor-pointer"
			@click="toggleDrawer()"
		></i>
		<RouterLink
			v-for="project in projects"
			:key="project.id"
			:to="{
				name: 'project',
				params: { userId: project.userId, projectId: project.id },
			}"
		>
			<div
				class="flex items-center gap-2 shrink-0 hover:bg-white/50 transition duration-300 cursor-pointer py-1 pl-1 rounded-md"
			>
				<img
					class="w-9 h-9 rounded"
					:src="`/img/${project.avatar}`"
					:alt="project.projectName"
				/>
				<p
					class="text-lg text-white font-semibold truncate whitespace-nowrap overflow-hidden"
				>
					{{ project.projectName }}
				</p>
			</div>
		</RouterLink>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectStore } from '../../../stores/project'

const emit = defineEmits(['toggleDrawer'])

const toggleDrawer = () => {
	emit('toggleDrawer')
}

const projectStore = useProjectStore()
const projects = computed(() => {
	return projectStore.projects
})
</script>
