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

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../../stores/project'
import { findById } from '../../../helpers/project'
import AppButton from '../../AppButton.vue'
import AppSVGIcon from '../../AppSVGIcon.vue'
import AppModal from '../../AppModal.vue'
import { Project } from '../../../types/projectTypes'

const props = defineProps<{
	show: boolean
}>()
// Current project data
const route = useRoute()
const projectId = ref<string | string[]>(route.params.projectId)

const projectStore = useProjectStore()
const currProject = computed<Project | undefined>(() => {
	return findById(projectStore.projects, projectId.value)
})

// Project data to edit
const project = reactive({
	projectName: currProject.value?.projectName,
	companyName: currProject.value?.companyName,
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

<style scoped lang="scss">
@import '@/assets/scss/modalCard.scss';
</style>
