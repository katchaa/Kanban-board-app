<template>
	<article class="container">
		<Transition name="info" mode="out-in">
			<component :is="activeComponent"></component>
		</Transition>
		<div class="btn-group">
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

<style scoped lang="scss">
.container {
	background-color: $gray-light;
	padding: 0.5rem 0.75rem;
	border-radius: $radius;
	box-shadow: $card-shadow;

	.btn-group {
		display: flex;
		justify-content: flex-end;
	}
}

@media screen and (min-width: $media-sm) {
	.container {
		padding: 0.5rem 2rem;
	}
}
</style>
