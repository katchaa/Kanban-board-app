<template>
	<section class="container">
		<Transition name="info" mode="out-in">
			<component :is="activeComponent"></component>
		</Transition>
		<div class="btn-group">
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
