<template>
	<div class="container">
		<ProjectNavbar />
		<div class="cards">
			<ProjectCard v-for="card in cards" :key="card._id" :card="card" />
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
		(card) => card.projectId === route.params.projectId
	)
})
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	max-width: 89vw;

	.cards {
		margin: 0 auto;
		flex: 1;
		align-self: center;
	}
}

@media screen and (min-width: $media-sm) {
	.container {
		max-width: 98vw;

		.cards {
			margin: 0;
			align-self: flex-start;
			display: flex;
			align-items: flex-start;
			gap: 0.75rem;
		}
	}
}
</style>
