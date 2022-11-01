<template>
	<div
		class="relative flex justify-between w-full bg-white px-2 rounded-sm mb-2 shadow-sm py-1"
		v-for="task in tasks"
		:key="task?.id"
	>
		<!-- Task text -->
		<p class="pr-1">{{ task?.text }}</p>
		<i class="fa-solid fa-ellipsis text-gray-300 cursor-pointer"></i>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectStore } from '../../../stores/project'

const props = defineProps({
	cardId: {
		type: String,
		required: true,
	},
})

const projectStore = useProjectStore()

// Find tasks according id's order in card.tasks array
const tasks = computed(() => {
	let currTasks = []
	const card = projectStore.cards.find((card) => card.id === props.cardId)
	card.tasks.forEach((taskId) => {
		currTasks.push(projectStore.tasks.find((task) => task.id === taskId))
	})
	return currTasks
})
</script>
