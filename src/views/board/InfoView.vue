<template>
	<section class="wrapper">
		<ul>
			<li>
				<button @click="toggleInfo('project')">Projects</button>
			</li>
			<li>
				<button @click="toggleInfo('card')">Cards</button>
			</li>
			<li>
				<button @click="toggleInfo('task')">Tasks</button>
			</li>
		</ul>
		<TransitionGroup name="info-card" mode="out-in" tag="main">
			<ProjectInfo v-if="show === 'project'" :key="show" />
			<CardInfo v-if="show === 'card'" :key="show" />
			<TaskInfo v-if="show === 'task'" :key="show" />
		</TransitionGroup>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import TaskInfo from '../../components/info/task/TaskInfo.vue'
import CardInfo from '../../components/info/card/CardInfo.vue'
import ProjectInfo from '../../components/info/project/ProjectInfo.vue'

const show = ref('project')
const toggleInfo = (item) => {
	show.value = item
}
</script>

<style scoped lang="scss">
.wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;

	ul {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.4rem;

		li {
			background-color: $gray-light;
			border-radius: $radius-sm;
			box-shadow: $card-shadow;

			button {
				padding: 0.4rem 0.6rem;
				font-size: $sm;
				font-weight: 600;
			}
		}
	}
}

@media screen and (min-width: $media-sm) {
	.wrapper {
		align-items: flex-start;
		margin: 1rem 0 0 1rem;
	}
}
</style>
