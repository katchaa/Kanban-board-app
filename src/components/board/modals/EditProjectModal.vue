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
					<h1 class="text-lg font-semibold ml-2">Edit card</h1>
					<form
						@submit.prevent="editProject()"
						class="w-full flex flex-col items-center gap-3 py-2 px-3"
					>
						<input
							type="text"
							class="w-full focus:outline-none p-1"
							v-model="project.projectName"
							placeholder="Project name"
						/>
						<input
							type="text"
							class="w-full focus:outline-none p-1"
							v-model="project.companyName"
							placeholder="Company name"
						/>
						<input
							type="text"
							class="w-full focus:outline-none p-1"
							v-model="project.avatar"
							placeholder="Avatar"
						/>
						<AppButton class="self-end">Save</AppButton>
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
import { reactive, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../../stores/project'
import { findById } from '../../../helpers/project'
import AppButton from '../../AppButton.vue'

const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
})
// Current project data
const route = useRoute()
const projectId = ref(route.params.projectId)

const projectStore = useProjectStore()
const currProject = computed(() => {
	return findById(projectStore.projects, projectId.value)
})

// Project data to edit
const project = reactive({
	projectName: currProject.value.projectName,
	companyName: currProject.value.companyName,
	avatar: 'groot.jpg',
})

const editProject = async () => {
	await projectStore.editProject(projectId.value, project)
	await projectStore.fetchProjects()
	closeModal()
}

// Emit to close modal
const emit = defineEmits(['closeEditModal'])
const closeModal = () => {
	emit('closeEditModal')
}
</script>
