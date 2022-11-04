<template>
	<div class="flex flex-col items-center gap-y-2">
		<i
			class="fa-solid fa-chevron-right text-white/50 hover:text-white transition duration-200 self-end mb-0.5 cursor-pointer"
			@click="toggleDrawer()"
		></i>
		<RouterLink
			:to="{
				name: 'project',
				params: { userId: project?.userId, projectId: project?.id },
			}"
			v-for="project in projects"
			:key="project?.id"
		>
			<img
				class="w-9 h-9 rounded"
				:src="`/img/${project?.avatar}`"
				:alt="project?.projectName"
			/>
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
