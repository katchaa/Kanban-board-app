<template>
	<Transition name="task" appear>
		<div
			class="flex justify-between bg-white pl-2 pr-1 py-1 mb-2 rounded-sm shadow-sm"
			v-if="props.task"
		>
			<!-- Task text -->
			<p
				class="flex-1 mt-2 max-w-full break-words focus:outline-none"
				:class="{ 'border-b-2': edit }"
				ref="text"
				:contenteditable="edit"
				spellcheck="false"
				@dblclick="startEdit()"
				@input="editText"
				@blur="editTask()"
			>
				{{ props.task.text }}
			</p>
			<button class="self-start" @click="toggleDeleteModal()">
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
