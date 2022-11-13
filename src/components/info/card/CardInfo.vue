<template>
	<article class="py-2 px-3 bg-gray-100 rounded-md shadow-md sm:pt-2 sm:px-4">
		<Transition name="info" mode="out-in">
			<component :is="activeComponent"></component>
		</Transition>
		<div class="flex justify-end">
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
