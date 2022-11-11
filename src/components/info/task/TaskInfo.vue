<template>
	<article class="bg-gray-100 py-2 px-4 rounded-md shadow-md">
		<Transition name="info" mode="out-in">
			<component :is="activeComponent"></component>
		</Transition>
		<div class="flex justify-end my-2">
			<AppButton v-if="activeComponent !== TaskCreate" @click="back()"
				>Back</AppButton
			>
			<AppButton v-if="activeComponent !== TaskDelete" @click="next()"
				>Next</AppButton
			>
		</div>
	</article>
</template>

<script setup>
import { shallowRef } from 'vue'
import TaskCreate from './TaskCreate.vue'
import TaskEdit from './TaskEdit.vue'
import TaskDelete from './TaskDelete.vue'
import AppButton from '../../AppButton.vue'

const activeComponent = shallowRef(TaskCreate)

const next = () => {
	if (activeComponent.value === TaskCreate) {
		activeComponent.value = TaskEdit
	} else {
		activeComponent.value = TaskDelete
	}
}
const back = () => {
	if (activeComponent.value === TaskEdit) {
		activeComponent.value = TaskCreate
	} else {
		activeComponent.value = TaskEdit
	}
}
</script>
