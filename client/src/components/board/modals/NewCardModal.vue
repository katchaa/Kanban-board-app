<template>
	<AppModal :show="props.show">
		<section class="card">
			<h1 class="title">New card</h1>
			<form @submit.prevent="add()">
				<input
					type="text"
					v-model="cardTitle"
					placeholder="Card title"
				/>
				<AppButton class="btn">Add card</AppButton>
			</form>
			<button class="x-mark" @click="closeModal()">
				<AppSVGIcon icon="xmark" />
			</button>
		</section>
	</AppModal>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../../stores/project'
import AppButton from '../../AppButton.vue'
import AppModal from '../../AppModal.vue'
import AppSVGIcon from '../../AppSVGIcon.vue'

const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
})

// Add new card
const cardTitle = ref('')
const projectStore = useProjectStore()
const route = useRoute()
const add = async () => {
	await projectStore
		.addCard(cardTitle.value, route.params.projectId)
		.then(() => projectStore.fetchProjects())
	closeModal()
}

// Emit to close modal
const emit = defineEmits(['closeModal'])
const closeModal = () => {
	cardTitle.value = ''
	emit('closeModal')
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/modalCard.scss';
</style>
