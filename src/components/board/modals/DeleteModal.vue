<template>
	<Teleport to="body">
		<Transition name="modal">
			<section
				class="absolute left-0 top-0 z-10 w-full h-screen bg-black/40 flex justify-center items-start pt-36"
				v-if="props.show"
			>
				<div class="bg-gray-100 w-64 p-2 text-center rounded-md">
					<p class="text-xl font-semibold py-2">
						<slot></slot>
					</p>
					<div class="flex justify-around">
						<button
							class="font-semibold mt-1 py-0.5 px-1.5 rounded-md hover:bg-gray-200 transition duration-200"
							@click="deleteItem()"
						>
							Delete
						</button>
						<button
							class="font-semibold text-gray-400 mt-1 py-0.5 px-1.5 rounded-md hover:bg-gray-200 hover:text-black transition duration-200"
							@click="cancelDelete()"
						>
							Cancel
						</button>
					</div>
				</div>
			</section>
		</Transition>
	</Teleport>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import { useProjectStore } from '../../../stores/project'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	show: {
		type: Boolean,
		required: true,
	},
})

const emit = defineEmits(['closeDeleteModal'])
const cancelDelete = () => {
	emit('closeDeleteModal')
}

// Delete selected item
const projectStore = useProjectStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const deleteItem = async () => {
	if (props.type === 'project') {
		await projectStore.deleteProject(props.id)
		router.push({
			name: 'projectHome',
			params: { userId: route.params.userId },
		})
	} else if (props.type === 'card') {
		await projectStore.deleteCard(props.id)
	} else if (props.type === 'task') {
		await projectStore.deleteTask(props.id)
	} else if (props.type === 'user') {
		await authStore.deleteAccount(props.id)
		router.push({ name: 'auth' })
		projectStore.$reset()
	}
	emit('closeDeleteModal')
	await projectStore.fetchProjects()
}
</script>
