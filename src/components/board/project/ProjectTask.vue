<template>
	<Transition name="task" appear>
		<div
			class="relative flex justify-between bg-white pl-2 pr-4 py-1 rounded-sm mb-2 shadow-sm"
			v-if="props.task"
		>
			<!-- Task text -->
			<button class="self-start absolute right-2" @click="togglePopup()">
				<AppSVGIcon icon="ellipsis" />
			</button>
			<p class="mt-2 max-w-full break-words">
				{{ props.task.text }}
			</p>
			<AppPopup
				:show="showPopup"
				@edit-mode="toggleEditModal()"
				@delete-mode="toggleDeleteModal()"
			/>
			<EditTaskModal
				:task="props.task"
				:show="editModal"
				@close-edit-modal="toggleEditModal()"
			/>
			<DeleteModal
				type="task"
				:id="props.task.id"
				:show="deleteModal"
				@close-delete-modal="toggleDeleteModal()"
			>
				Are you sure to delete current task?
			</DeleteModal>
		</div>
	</Transition>
</template>

<script setup>
import { ref } from 'vue'
import AppPopup from '../../AppPopup.vue'
import AppSVGIcon from '../../AppSVGIcon.vue'
import DeleteModal from '../modals/DeleteModal.vue'
import EditTaskModal from '../modals/EditTaskModal.vue'

const props = defineProps({
	task: {
		type: Object,
		required: true,
	},
})

// Toggle popup
const showPopup = ref(false)
const togglePopup = () => {
	showPopup.value = !showPopup.value
}

// Toggle delete modal
const deleteModal = ref(false)
const toggleDeleteModal = () => {
	deleteModal.value = !deleteModal.value
	showPopup.value = false
}

// Toggle edit modal
const editModal = ref(false)
const toggleEditModal = () => {
	editModal.value = !editModal.value
	showPopup.value = false
}
</script>
