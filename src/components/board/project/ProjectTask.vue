<template>
	<div
		class="relative flex justify-between w-full bg-white px-2 rounded-sm mb-2 shadow-sm py-1"
	>
		<!-- Task text -->
		<p class="pr-1">{{ props.task.text }}</p>
		<i
			class="fa-solid fa-ellipsis text-gray-300 cursor-pointer"
			@click="togglePopup()"
		></i>
		<AppPopup
			v-if="showPopup"
			@edit-mode="showEditModal()"
			@delete-mode="showDeleteModal()"
		/>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import AppPopup from '../../AppPopup.vue'

const props = defineProps({
	task: {
		type: Object,
		required: true,
	},
})

// Toggle popup
const showPopup = ref(false)
const togglePopup = () => {
	showPopup.value = !showPopup.value
}
</script>
