<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				class="flex justify-center items-start w-screen h-screen absolute left-0 top-0 pt-36 z-10 bg-black/40"
				v-if="props.show"
			>
				<section class="bg-gray-100 w-96 p-2 rounded-md shadow-md">
					<h1 class="text-lg font-semibold ml-2">New card</h1>
					<form
						@submit.prevent="add()"
						class="w-full flex justify-around gap-3 my-2"
					>
						<input
							type="text"
							class="w-3/4 focus:outline-none p-1"
							v-model="cardTitle"
							placeholder="Card title"
						/>
						<button
							class="py-0.5 px-1.5 rounded-md hover:bg-gray-200 transition duration-200"
							type="submit"
						>
							Add card
						</button>
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
