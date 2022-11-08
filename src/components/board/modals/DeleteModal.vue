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
						<AppButton @click="deleteItem()"> Delete </AppButton>
						<AppButton
							class="text-gray-400 hover:text-black"
							@click="cancelDelete()"
						>
							Cancel</AppButton
						>
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
import AppButton from '../../AppButton.vue'

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
