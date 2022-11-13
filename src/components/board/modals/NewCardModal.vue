<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				class="flex justify-center items-start bg-black/40 w-screen h-screen absolute left-0 top-0 z-10 pt-28 px-6 sm:pt-36"
				v-if="props.show"
			>
				<section
					class="bg-gray-100 w-full max-w-md shrink-0 p-2 ml-5 rounded-md shadow-md"
				>
					<h1 class="text-lg font-semibold text-center">New card</h1>
					<form
						@submit.prevent="add()"
						class="w-full flex flex-col items-center gap-3 my-2"
					>
						<input
							type="text"
							class="w-11/12 focus:outline-none p-1 sm:w-3/4"
							v-model="cardTitle"
							placeholder="Card title"
						/>
						<AppButton class="self-end">Add card</AppButton>
					</form>
				</section>
				<button
					class="relative right-6 top-0.5 text-lg text-gray-300 hover:text-gray-600 transition duration-200"
					@click="closeModal()"
				>
					<i class="fa-regular fa-circle-xmark"></i>
				</button>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../../stores/project'
import AppButton from '../../AppButton.vue'

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
