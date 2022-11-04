<template>
	<section
		class="bg-gray-100 w-72 relative flex flex-col shrink-0 px-2 rounded-md mt-2 shadow-md h-fit"
	>
		<!-- Card title -->
		<div class="flex justify-between p-2">
			<h3 class="font-semibold text-gray-700 select-none">
				{{ props.card.title }}
			</h3>
			<i
				class="fa-solid fa-ellipsis text-gray-400 cursor-pointer"
				@click="togglePopup()"
			></i>
		</div>
		<AppPopup
			:show="showPopup"
			@edit-mode="toggleEditModal()"
			@delete-mode="toggleDeleteModal()"
		/>
		<EditCardModal
			:card="props.card"
			:show="editModal"
			@close-edit-modal="toggleEditModal()"
		/>
		<DeleteModal
			type="card"
			:id="props.card.id"
			:show="deleteModal"
			@close-delete-modal="toggleDeleteModal()"
		>
			Are you sure to delete {{ props.card.title }} card?
		</DeleteModal>
		<ProjectTask v-for="task in tasks" :key="task.id" :task="task" />
		<AddNewTask :cardId="card.id" />
	</section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '../../../stores/project'
import ProjectTask from './ProjectTask.vue'
import AddNewTask from './AddNewTask.vue'
import AppPopup from '../../AppPopup.vue'
import DeleteModal from '../modals/DeleteModal.vue'
import EditCardModal from '../modals/EditCardModal.vue'

const props = defineProps({
	card: {
		type: Object,
	},
})

// Find tasks according id's order in card.tasks array
const projectStore = useProjectStore()
const tasks = computed(() => {
	let currTasks = []
	props.card.tasks.forEach((taskId) => {
		currTasks.push(projectStore.tasks.find((task) => task.id === taskId))
	})
	return currTasks
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
