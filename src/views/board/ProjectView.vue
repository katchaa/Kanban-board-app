<template>
	<div class="h-[94%] px-2.5 overflow-x-auto scrollbar">
		<ProjectNavbar />
		<div class="flex items-start gap-3">
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
