<template>
	<article class="container">
		<Transition name="info" mode="out-in">
			<component :is="activeComponent"></component>
		</Transition>
		<div class="btn-group">
			<AppButton v-if="activeComponent !== CardCreate" @click="back()"
				>Back</AppButton
			>
			<AppButton v-if="activeComponent !== CardDelete" @click="next()"
				>Next</AppButton
			>
		</div>
	</article>
</template>

<script setup>
import { shallowRef } from 'vue'
import CardCreate from './CardCreate.vue'
import CardEdit from './CardEdit.vue'
import CardDelete from './CardDelete.vue'
import AppButton from '../../AppButton.vue'

const activeComponent = shallowRef(CardCreate)

const next = () => {
	if (activeComponent.value === CardCreate) {
		activeComponent.value = CardEdit
	} else {
		activeComponent.value = CardDelete
	}
}
const back = () => {
	if (activeComponent.value === CardEdit) {
		activeComponent.value = CardCreate
	} else {
		activeComponent.value = CardEdit
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
