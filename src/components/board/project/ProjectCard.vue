<template>
	<Transition name="card" appear>
		<section
			class="bg-gray-100 w-72 max-h-[35rem] flex flex-col shrink-0 grow-0 px-2 mt-2 rounded-md shadow-md"
			@drop="onDrop($event, props.card.id)"
			@dragenter.prevent
			@dragover.prevent
		>
			<!-- Card title -->
			<div class="flex justify-between items-center py-2">
				<h3
					class="flex-1 mr-2 font-semibold text-gray-700 focus:outline-none select-none"
					:class="{ 'border-b-[3px]': edit }"
					:contenteditable="edit"
					ref="card"
					spellcheck="false"
					@click="startEdit()"
					@input="editTitle"
					@blur="editCard()"
				>
					{{ props.card.title }}
				</h3>
				<button class="self-start" @click="toggleDeleteModal()">
					<AppSVGIcon icon="trash" />
				</button>
			</div>
			<DeleteModal
				type="card"
				:id="props.card.id"
				:show="deleteModal"
				@close-delete-modal="toggleDeleteModal()"
			>
				Are you sure to delete {{ props.card.title }} card?
			</DeleteModal>
			<div class="overflow-y-scroll scrollbar-hidden">
				<ProjectTask
					v-for="task in tasks"
					:key="task?.id"
					:task="task"
					draggable="true"
					@dragstart="startDrag($event, task.id)"
				/>
			</div>
			<AddNewTask :cardId="props.card.id" />
		</section>
	</Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '../../../stores/project'
import { findById } from '../../../helpers/project'
import ProjectTask from './ProjectTask.vue'
import AddNewTask from './AddNewTask.vue'
import DeleteModal from '../modals/DeleteModal.vue'
import AppSVGIcon from '../../AppSVGIcon.vue'

const props = defineProps({
	card: {
		type: Object,
	},
})

// Find tasks according id's order in card.tasks array
const projectStore = useProjectStore()
const tasks = computed(() => {
	let currTasks = []
	props.card?.tasks.forEach((taskId) => {
		currTasks.push(findById(projectStore.tasks, taskId))
	})
	return currTasks
})

// Edit card title
const edit = ref(false)
const card = ref()
const startEdit = () => {
	edit.value = true
	setTimeout(() => {
		card.value.focus()
	}, 0)
}

const newTitle = ref('')
const editTitle = (e) => {
	newTitle.value = e.target.innerText
}

const editCard = async () => {
	if (newTitle.value === '' || newTitle.value === props.card.title) {
		edit.value = false
	} else {
		await projectStore.editCard(props.card.id, newTitle.value)
		await projectStore.fetchProjects()
		edit.value = false
	}
}

// Task drag and drop
const startDrag = (e, taskId) => {
	e.dataTransfer.dropEffect = 'move'
	e.dataTransfer.effectAllowed = 'move'
	e.dataTransfer.setData('taskId', taskId)
}

const onDrop = async (e, cardId) => {
	const taskId = e.dataTransfer.getData('taskId')
	await projectStore.dragAndDrop(cardId, taskId).then(() => {
		projectStore.fetchProjects()
	})
}
// Toggle delete modal
const deleteModal = ref(false)
const toggleDeleteModal = () => {
	deleteModal.value = !deleteModal.value
	// showPopup.value = false
}
</script>
