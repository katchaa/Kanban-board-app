<template>
	<nav class="p-2 flex gap-x-2">
		<div class="flex items-center relative shrink-0">
			<button
				class="flex items-center text-white text-xl font-semibold select-none"
				@click="togglePopup"
			>
				{{ project?.projectName }}
				<button class="ml-1.5 self-end">
					<AppSVGIcon icon="chevronDown" />
				</button>
			</button>
			<AppPopup
				:show="showPopup"
				@edit-mode="toggleEditModal()"
				@delete-mode="toggleDeleteModal()"
			/>
			<EditProjectModal
				:show="editModal"
				@close-edit-modal="toggleEditModal()"
			/>
			<DeleteModal
				type="project"
				:id="project?.id"
				:show="deleteModal"
				@close-delete-modal="toggleDeleteModal()"
			>
				Are you sure to delete {{ project?.projectName }}?
			</DeleteModal>
		</div>
		<span class="text-white/40 text-xl mx-1">|</span>
		<div
			class="bg-white/50 rounded-md flex justify-center items-center shrink-0"
		>
			<p class="text-white text-lg px-4 select-none">
				{{ project?.companyName }}
			</p>
		</div>
		<!-- Showing new card modal form -->
		<AppIconButton
			icon="addSmall"
			tooltip="Add card"
			size="7"
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
import AppPopup from '../../AppPopup.vue'
import DeleteModal from '../modals/DeleteModal.vue'
import EditProjectModal from '../modals/EditProjectModal.vue'
import { findById } from '../../../helpers/project'
import AppSVGIcon from '../../AppSVGIcon.vue'

const projectStore = useProjectStore()
const route = useRoute()
const project = computed(() => {
	return findById(projectStore.projects, route.params.projectId)
})

// Add new card modal
const showNewCardModal = ref(false)
const toggleNewCardModal = () => {
	showNewCardModal.value = !showNewCardModal.value
}

// Toggle popup
const showPopup = ref(false)
const togglePopup = () => {
	showPopup.value = !showPopup.value
}

// Delete modal
const deleteModal = ref(false)
const toggleDeleteModal = () => {
	deleteModal.value = !deleteModal.value
	showPopup.value = false
}

// Edit modal
const editModal = ref(false)
const toggleEditModal = () => {
	editModal.value = !editModal.value
	showPopup.value = false
}
</script>
