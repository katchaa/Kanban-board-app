<template>
	<div class="flex flex-col items-center gap-y-2">
		<button class="self-end -mr-1" @click="toggleDrawer()">
			<AppSVGIcon icon="chevronRight" />
		</button>
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
				:src="project?.avatar"
				:alt="project?.projectName"
			/>
		</RouterLink>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectStore } from '../../../stores/project'
import AppSVGIcon from '../../AppSVGIcon.vue'

const emit = defineEmits(['toggleDrawer'])
const toggleDrawer = () => {
	emit('toggleDrawer')
}

const projectStore = useProjectStore()
const projects = computed(() => {
	return projectStore.projects
})
</script>
