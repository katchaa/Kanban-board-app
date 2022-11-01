<template>
	<nav class="p-2 flex gap-x-2">
		<div class="flex items-center relative shrink-0">
			<button class="text-white text-xl font-semibold select-none">
				{{ project.projectName }}
				<i class="fa-solid fa-chevron-down text-sm ml-1"></i>
			</button>
		</div>
		<span class="text-white/40 text-xl mx-1">|</span>
		<div
			class="bg-white/50 rounded-md flex justify-center items-center shrink-0"
		>
			<p class="text-white text-lg px-4 select-none">
				{{ project.companyName }}
			</p>
		</div>
		<AppIconButton
			icon="fa-solid fa-plus"
			tooltip="Add card"
			class="w-7 h-7"
			@click="toggleNewCardModal()"
		/>
		<NewCardModal
			:show="showNewCardModal"
			@close-modal="toggleNewCardModal()"
		/>
	</nav>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../../stores/project'
import AppIconButton from '../../AppIconButton.vue'
import NewCardModal from '@/components/board/modals/NewCardModal.vue'

const projectStore = useProjectStore()
const route = useRoute()
const project = computed(() => {
	return projectStore.projects.find(
		(project) => project.id === route.params.projectId
	)
})

// Add new card modal
const showNewCardModal = ref(false)
const toggleNewCardModal = () => {
	showNewCardModal.value = !showNewCardModal.value
}
</script>
