<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				class="flex justify-center items-start w-screen h-screen absolute left-0 top-0 pt-36 z-10 bg-black/40"
				v-if="props.show"
			>
				<section
					class="bg-gray-100 w-1/2 shrink-0 p-2 rounded-md shadow-md"
				>
					<h1 class="text-lg font-semibold text-center">
						Start New Project
					</h1>
					<form
						@submit.prevent="add()"
						class="w-full flex flex-col items-center gap-3 my-2"
					>
						<input
							type="text"
							class="w-3/4 focus:outline-none p-1"
							placeholder="Project name"
							v-model="newProject.projectName"
						/>
						<input
							type="text"
							class="w-3/4 focus:outline-none p-1"
							placeholder="Company name"
							v-model="newProject.companyName"
						/>
						<AppButton class="self-end">Add project</AppButton>
					</form>
				</section>
				<button
					class="relative z-60 right-6 top-0.5 text-lg text-gray-300 hover:text-gray-600 transition duration-200"
					@click="closeModal()"
				>
					<i class="fa-regular fa-circle-xmark"></i>
				</button>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import { useProjectStore } from '../../../stores/project'
import AppButton from '../../AppButton.vue'

const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
})

// Add new project
const projectStore = useProjectStore()
const authStore = useAuthStore()
const route = useRoute()

let newProject = reactive({
	projectName: '',
	companyName: '',
	avatar: `http://picsum.photos/id/${Math.floor(
		Math.random() * 1000
	)}/200/300`,
})

const add = async () => {
	await projectStore.addProject(newProject, route.params.userId).then(() => {
		projectStore.fetchProjects()
		authStore.fetchUser()
	})
	closeModal()
}

// Emit to close modal
const emit = defineEmits(['closeModal'])
const closeModal = () => {
	emit('closeModal')
}
</script>
