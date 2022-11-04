<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				class="flex justify-center items-start w-screen h-screen absolute left-0 top-0 pt-36 z-10 bg-black/40"
				v-if="props.show"
			>
				<section
					class="bg-gray-100 w-96 shrink-0 p-2 rounded-md shadow-md"
				>
					<h1 class="text-lg font-semibold ml-2">Edit task</h1>
					<form
						@submit.prevent="editTask()"
						class="w-full flex justify-around gap-3 my-2"
					>
						<textarea
							type="text"
							rows="4"
							class="w-3/4 focus:outline-none p-1"
							v-model="text"
							placeholder="New text"
						/>
						<button
							class="self-end py-0.5 px-1.5 rounded-md hover:bg-gray-200 transition duration-200"
							type="submit"
						>
							Save
						</button>
					</form>
				</section>
				<button
					class="relative right-6 top-0.5 text-lg text-gray-300 hover:text-gray-600 transition duration-200"
					@click="closeModal()"
				>
					<i class="fa-regular fa-circle-xmark"></i>
				</button>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useProjectStore } from '../../../stores/project'

const props = defineProps({
	task: {
		type: Object,
		required: true,
	},
	show: {
		type: Boolean,
		required: true,
	},
})

// Task text to edit
const projectStore = useProjectStore()
const currTask = computed(() => {
	return projectStore.tasks.find((task) => task.id === props.task.id)
})
const text = ref(currTask.value.text)

const editTask = async () => {
	await projectStore.editTask(props.task.id, text.value)
	await projectStore.fetchProjects()
	emit('closeEditModal')
}

// Emit to close modal
const emit = defineEmits(['closeEditModal'])
const closeModal = () => {
	emit('closeEditModal')
}
</script>
