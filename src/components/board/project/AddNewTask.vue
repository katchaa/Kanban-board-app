<template>
	<div class="mb-2">
		<i
			v-if="!showTextarea"
			class="fa-solid fa-plus text-gray-400 mr-2 mb-1 cursor-pointer"
			@click="toggleTextarea()"
		></i>
		<i
			v-else
			@click="toggleTextarea()"
			class="fa-solid fa-minus text-gray-400 mr-2 mb-1 cursor-pointer"
		></i>
	</div>
	<form @submit.prevent="addTask()" v-if="showTextarea" class="w-full mb-2">
		<textarea class="w-full focus:outline-none p-2" v-model="text" />
		<button type="submit">Odeslat</button>
	</form>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../../stores/project'

const props = defineProps({
	cardId: {
		type: String,
		required: true,
	},
})

//Toggle textarea
let showTextarea = ref(false)

const toggleTextarea = () => {
	showTextarea.value = !showTextarea.value
	text.value = ''
}

// Add task
const projectStore = useProjectStore()
const route = useRoute()
const text = ref('')

const addTask = async () => {
	await projectStore.addTask(text.value, props.cardId).then(() => {
		projectStore.fetchCards(route.params.projectId)
	})
	toggleTextarea()
}
</script>
