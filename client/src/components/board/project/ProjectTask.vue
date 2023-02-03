<template>
	<Transition name="task" appear>
		<div class="task" v-if="props.task">
			<!-- Task text -->
			<p
				class="content"
				:class="{ edit: edit }"
				ref="text"
				:contenteditable="edit"
				spellcheck="false"
				@dblclick="startEdit()"
				@input="editText"
				@blur="editTask()"
			>
				{{ props.task.text }}
			</p>
			<button class="icon" @click="toggleDeleteModal()">
				<AppSVGIcon icon="trash" />
			</button>
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
import { useProjectStore } from '../../../stores/project'
import AppSVGIcon from '../../AppSVGIcon.vue'
import DeleteModal from '../modals/DeleteModal.vue'

const props = defineProps({
	task: {
		type: Object,
		required: true,
	},
})

// Edit task text
const edit = ref(false)
const text = ref()
const startEdit = () => {
	edit.value = true
	setTimeout(() => {
		text.value.focus()
	}, 0)
}

const newText = ref('')
const editText = (e) => {
	newText.value = e.target.innerText
}

const projectStore = useProjectStore()
const editTask = async () => {
	if (newText.value === '' || newText.value === props.task.text) {
		edit.value = false
	} else {
		await projectStore.editTask(props.task.id, newText.value)
		await projectStore.fetchProjects()
		edit.value = false
	}
}

// Toggle delete modal
const deleteModal = ref(false)
const toggleDeleteModal = () => {
	deleteModal.value = !deleteModal.value
	// showPopup.value = false
}
</script>

<style scoped lang="scss">
.task {
	display: flex;
	justify-content: space-between;

	padding: 0.25rem 0.3rem 0.25rem 0.5rem;
	background-color: #fff;
	border-radius: $radius-sm;
	border-bottom: 1px solid lighten($gray-medium, 40%);

	.content {
		flex: 1;
		font-size: $sm;
		margin-top: 0.25rem;
		margin-right: 0.2rem;

		&:focus {
			outline: none;
		}

		&.edit {
			border-bottom: $edit-border;
		}
	}

	.icon {
		align-self: flex-start;
	}
}
</style>
