<template>
	<section
		class="bg-gray-100 w-72 relative flex flex-col shrink-0 px-2 rounded-md mt-2 shadow-md h-fit"
	>
		<!-- Card title -->
		<div class="flex justify-between p-2">
			<h3 class="font-semibold text-gray-700 select-none">
				{{ props.card.title }}
			</h3>
			<i
				class="fa-solid fa-ellipsis text-gray-400 cursor-pointer"
				@click="togglePopup()"
			></i>
		</div>
		<AppPopup
			v-if="showPopup"
			@edit-mode="showEditModal()"
			@delete-mode="showDeleteModal()"
		/>
		<ProjectTask v-for="task in tasks" :key="task.id" :task="task" />
		<AddNewTask :cardId="card.id" />
	</section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '../../../stores/project'
import ProjectTask from './ProjectTask.vue'
import AddNewTask from './AddNewTask.vue'
import AppPopup from '../../AppPopup.vue'

const props = defineProps({
	card: {
		type: Object,
	},
})

// Find tasks according id's order in card.tasks array
const projectStore = useProjectStore()
const tasks = computed(() => {
	let currTasks = []
	props.card.tasks.forEach((taskId) => {
		currTasks.push(projectStore.tasks.find((task) => task.id === taskId))
	})
	return currTasks
})

// Toggle popup
const showPopup = ref(false)
const togglePopup = () => {
	showPopup.value = !showPopup.value
}
</script>
