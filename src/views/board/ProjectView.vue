<template>
	<div class="flex-1 h-[94%] grid-cols-2 sm:px-2">
		<ProjectNavbar />
		<div
			class="flex flex-col items-center gap-2 sm:flex-row sm:items-start"
		>
			<ProjectCard v-for="card in cards" :key="card.id" :card="card" />
		</div>
	</div>
</template>

<script setup>
import { useProjectStore } from '../../stores/project'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProjectNavbar from '../../components/board/project/ProjectNavbar.vue'
import ProjectCard from '../../components/board/project/ProjectCard.vue'

const projectStore = useProjectStore()
const route = useRoute()

// Filter project cards from store
const cards = computed(() => {
	return projectStore.cards.filter(
		(card) => card.projectId === route.params?.projectId
	)
})
</script>
