<template>
	<div
		class="absolute z-10 h-full bg-gray-600/70 w-60 flex flex-col pt-2 pr-1"
	>
		<button class="self-end" @click="toggleDrawer()">
			<AppSVGIcon icon="chevronLeft" />
		</button>
		<RouterLink
			v-for="project in projects"
			:key="project?.id"
			:to="{
				name: 'project',
				params: { userId: project?.userId, projectId: project?.id },
			}"
		>
			<div
				class="flex items-center gap-2 shrink-0 hover:bg-gray-700/50 transition duration-300 cursor-pointer py-1 pl-1 rounded-md"
			>
				<img
					class="w-9 h-9 rounded"
					:src="project?.avatar"
					:alt="project?.projectName"
				/>
				<p
					class="text-lg text-white font-semibold truncate whitespace-nowrap overflow-hidden"
				>
					{{ project?.projectName }}
				</p>
			</div>
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
