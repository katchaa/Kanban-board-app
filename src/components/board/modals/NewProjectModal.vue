<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				class="flex justify-center items-start bg-black/40 w-screen h-screen absolute left-0 top-0 z-10 pt-28 px-6 sm:pt-36"
				v-if="props.show"
			>
				<section
					class="bg-gray-100 w-full max-w-md shrink-0 p-2 ml-5 rounded-md shadow-md"
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
							class="w-11/12 focus:outline-none p-1 sm:w-3/4"
							placeholder="Project name"
							v-model="newProject.projectName"
						/>
						<input
							type="text"
							class="w-11/12 focus:outline-none p-1 sm:w-3/4"
							placeholder="Company name"
							v-model="newProject.companyName"
						/>
						<AppButton class="self-end">Add project</AppButton>
					</form>
				</section>
				<button
					class="relative z-60 right-6 top-1 text-lg text-gray-300 hover:text-gray-600 transition duration-200"
					@click="closeModal()"
				>
					<AppSVGIcon icon="xmark" />
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
import AppSVGIcon from '../../AppSVGIcon.vue'

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
