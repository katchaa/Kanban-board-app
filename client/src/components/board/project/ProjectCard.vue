<template>
	<Transition name="card" appear>
		<section
			class="card"
			@drop="onDrop($event, props.card._id)"
			@dragenter.prevent
			@dragover.prevent
		>
			<!-- Card title -->
			<header>
				<h3
					class="title"
					:class="{ edit: edit }"
					:contenteditable="edit"
					ref="card"
					spellcheck="false"
					@dblclick="startEdit()"
					@input="editTitle"
					@blur="editCard()"
				>
					{{ props.card.title }}
				</h3>
				<button class="icon" @click="toggleDeleteModal()">
					<AppSVGIcon icon="trash" />
				</button>
			</header>
			<DeleteModal
				type="card"
				:id="props.card._id"
				:show="deleteModal"
				@close-delete-modal="toggleDeleteModal()"
			>
				Are you sure to delete {{ props.card.title }} card?
			</DeleteModal>
			<div class="tasks">
				<ProjectTask
					v-for="task in tasks"
					:key="task?._id"
					:task="task"
					draggable="true"
					@dragstart="startDrag($event, task._id)"
				/>
			</div>
			<AddNewTask :cardId="props.card._id" />
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
		required: true,
	},
})

// Find tasks according id's order in card.tasks array
const projectStore = useProjectStore()
const tasks = computed(() => {
	let currTasks = []
	props.card.tasks.forEach((taskId) => {
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
		await projectStore.editCard(props.card._id, newTitle.value)
		await projectStore.fetchUser()
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
}
</script>

<style scoped lang="scss">
.card {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;

	background-color: $gray-light;
	margin-top: 0.5rem;
	padding: 0 0.5rem 0.3rem 0.5rem;
	width: 75vw;
	border-radius: $radius;
	box-shadow: $card-shadow;

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.5rem;
		margin-bottom: 0.2rem;

		.title {
			flex: 1;
			margin-right: 0.5rem;

			color: $text-primary;
			font-weight: 600;
			text-transform: capitalize;

			&:focus {
				outline: none;
			}

			&.edit {
				border-bottom: $edit-border;
			}
		}

		.icon {
			margin-right: 0.25rem;
			cursor: pointer;
		}
	}

	.tasks {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		-ms-overflow-style: none;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}
}

@media screen and (min-width: $media-sm) {
	.card {
		max-width: 18rem;
		max-height: 35rem;

		.tasks {
			overflow-y: scroll;
		}
	}
}
</style>
