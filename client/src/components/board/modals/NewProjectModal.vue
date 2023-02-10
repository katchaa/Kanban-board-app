<template>
	<AppModal :show="props.show">
		<section class="card">
			<h1 class="title">Start new project</h1>
			<form @submit.prevent="add()">
				<input
					type="text"
					placeholder="Project name"
					v-model="newProject.projectName"
				/>
				<input
					type="text"
					placeholder="Company name"
					v-model="newProject.companyName"
				/>
				<AppButton class="btn">Add project</AppButton>
			</form>
			<button class="x-mark" @click="closeModal()">
				<AppSVGIcon icon="xmark" />
			</button>
		</section>
	</AppModal>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../../stores/project'
import AppButton from '../../AppButton.vue'
import AppModal from '../../AppModal.vue'
import AppSVGIcon from '../../AppSVGIcon.vue'

const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
})

// Add new project
const projectStore = useProjectStore()
const route = useRoute()

let newProject = reactive({
	projectName: '',
	companyName: '',
})

const add = async () => {
	await projectStore.addProject(newProject, route.params.userId)

	newProject.projectName = ''
	newProject.companyName = ''
	closeModal()
}

// Emit to close modal
const emit = defineEmits(['closeModal'])
const closeModal = () => {
	emit('closeModal')
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/modalCard.scss';
</style>
