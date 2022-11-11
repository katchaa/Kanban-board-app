<template>
	<section class="bg-gray-100 py-2 px-4 rounded-md shadow-md">
		<Transition name="info" mode="out-in">
			<component :is="activeComponent"></component>
		</Transition>
		<div class="flex justify-end my-2">
			<AppButton v-if="activeComponent !== ProjectCreate" @click="back()"
				>Back</AppButton
			>
			<AppButton v-if="activeComponent !== ProjectDelete" @click="next()"
				>Next</AppButton
			>
		</div>
	</section>
</template>

<script setup>
import { shallowRef } from 'vue'
import AppButton from '../../AppButton.vue'
import ProjectCreate from '../project/ProjectCreate.vue'
import ProjectEdit from '../project/ProjectEdit.vue'
import ProjectDelete from '../project/ProjectDelete.vue'

const activeComponent = shallowRef(ProjectCreate)

const next = () => {
	if (activeComponent.value === ProjectCreate) {
		activeComponent.value = ProjectEdit
	} else {
		activeComponent.value = ProjectDelete
	}
}
const back = () => {
	if (activeComponent.value === ProjectEdit) {
		activeComponent.value = ProjectCreate
	} else {
		activeComponent.value = ProjectEdit
	}
}
</script>
