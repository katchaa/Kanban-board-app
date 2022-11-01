<template>
	<section
		class="bg-gray-100 w-72 relative flex flex-col shrink-0 px-2 rounded-md mt-2 shadow-md h-fit"
		v-for="card in cards"
		:key="card.id"
	>
		<!-- Card title -->
		<div class="flex justify-between p-2">
			<h3 class="font-semibold text-gray-700 select-none">
				{{ card.title }}
			</h3>
			<i class="fa-solid fa-ellipsis text-gray-400 cursor-pointer"></i>
		</div>
		<ProjectTask :cardId="card.id" />
		<AddNewTask :cardId="card.id" />
	</section>
</template>

<script setup>
import ProjectTask from './ProjectTask.vue'
import AddNewTask from './AddNewTask.vue'
import { useProjectStore } from '../../../stores/project'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Filter project cards from store
const projectStore = useProjectStore()
const route = useRoute()
const cards = computed(() => {
	return projectStore.cards.filter(
		(card) => card.projectId === route.params.projectId
	)
})
</script>
