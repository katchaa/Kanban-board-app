<template>
	<article class="bg-gray-100 py-2 px-4 rounded-md shadow-md">
		<Transition name="info" mode="out-in">
			<component :is="activeComponent"></component>
		</Transition>
		<div class="flex justify-end my-2">
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
