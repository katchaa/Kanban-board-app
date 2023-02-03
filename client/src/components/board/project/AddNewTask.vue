<template>
	<section class="wrapper">
		<button v-if="!showTextarea" @click="toggleTextarea()">
			<AppSVGIcon icon="addGray" />
		</button>
		<button v-else @click="toggleTextarea()">
			<AppSVGIcon icon="minus" />
		</button>
		<form @submit.prevent="addTask()" v-if="showTextarea">
			<textarea
				class="text-area"
				rows="4"
				cols="32"
				wrap="hard"
				v-model="text"
			/>
			<AppButton>Send</AppButton>
		</form>
	</section>
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
	await projectStore.addTask(text.value, props.cardId).then(() => {
		projectStore.fetchCards(route.params.projectId)
	})
	toggleTextarea()
}
</script>

<style scoped lang="scss">
.wrapper {
	width: 100%;
	margin-top: 0.2rem;

	form {
		.text-area {
			width: 100%;
			padding: 0.5rem;
			border-radius: $radius-sm;

			&:focus {
				outline: none;
			}
		}
	}
}
</style>
