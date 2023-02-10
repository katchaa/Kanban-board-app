<template>
	<AppModal :show="props.show">
		<section class="card">
			<h1 class="title">Edit project</h1>
			<form @submit.prevent="editProject()">
				<input
					type="text"
					v-model="project.projectName"
					placeholder="Project name"
				/>
				<input
					type="text"
					v-model="project.companyName"
					placeholder="Company name"
				/>
				<AppButton class="btn">Save</AppButton>
			</form>
			<button class="x-mark" @click="closeModal()">
				<AppSVGIcon icon="xmark" />
			</button>
		</section>
	</AppModal>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../../stores/project'
import { findById } from '../../../helpers/project'
import AppButton from '../../AppButton.vue'
import AppSVGIcon from '../../AppSVGIcon.vue'
import AppModal from '../../AppModal.vue'

const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
})

const route = useRoute()
const projectStore = useProjectStore()

// Current project data
const projectId = computed(() => route.params.projectId)
const currProject = computed(() => {
	return findById(projectStore.projects, projectId.value)
})
const project = reactive({
	projectName: currProject.value.projectName,
	companyName: currProject.value.companyName,
})

const editProject = async () => {
	await projectStore
		.editProject(projectId.value, project)
		.then(() => projectStore.fetchUser())
	closeModal()
}

// Emit to close modal
const emit = defineEmits(['closeEditModal'])
const closeModal = () => {
	emit('closeEditModal')
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/modalCard.scss';
</style>
