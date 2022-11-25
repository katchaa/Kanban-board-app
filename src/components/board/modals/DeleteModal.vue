<template>
	<AppModal :show="props.show">
		<section class="card">
			<p class="question">
				<slot></slot>
			</p>
			<div class="btn-group">
				<AppButton @click="deleteItem()"> Delete </AppButton>
				<AppButton class="muted" @click="cancelDelete()">
					Cancel</AppButton
				>
			</div>
		</section>
	</AppModal>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import { useProjectStore } from '../../../stores/project'
import AppButton from '../../AppButton.vue'
import AppModal from '../../AppModal.vue'

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
	}
	emit('closeDeleteModal')
	await projectStore.fetchProjects()
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/modalCard.scss';
</style>
