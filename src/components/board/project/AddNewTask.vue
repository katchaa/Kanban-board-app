<template>
	<div>
		<button v-if="!showTextarea" @click="toggleTextarea()">
			<AppSVGIcon icon="addGray" />
		</button>
		<button v-else @click="toggleTextarea()">
			<AppSVGIcon icon="minus" />
		</button>
	</div>
	<form @submit.prevent="addTask()" v-if="showTextarea" class="w-full mb-2">
		<textarea class="w-full focus:outline-none p-2" v-model="text" />
		<AppButton>Send</AppButton>
	</form>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../../stores/project'
import AppButton from '../../AppButton.vue'
import AppSVGIcon from '../../AppSVGIcon.vue'

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
	await projectStore.addTask(text.value, props.cardId)
	await projectStore.fetchCards(route.params.projectId)
	toggleTextarea()
}
</script>
