<template>
	<div class="flex flex-col items-start justify-center gap-2 mx-12 my-8">
		<aside>
			<ul class="flex gap-2">
				<li>
					<button
						class="bg-gray-100 hover:bg-gray-200 w-full font-semibold py-1.5 px-3 mb-1.5 rounded-md shadow-md border-b-2 border-b-gray-300 transition duration-200"
						@click="toggleInfo('project')"
					>
						Projects
					</button>
				</li>
				<li>
					<button
						class="bg-gray-100 hover:bg-gray-200 w-full font-semibold py-1.5 px-3 mb-1.5 rounded-md shadow-md border-b-2 border-b-gray-300 transition duration-200"
						@click="toggleInfo('card')"
					>
						Cards
					</button>
				</li>
				<li>
					<button
						class="bg-gray-100 hover:bg-gray-200 w-full font-semibold py-1.5 px-3 mb-1.5 rounded-md shadow-md border-b-2 border-b-gray-300 transition duration-200"
						@click="toggleInfo('task')"
					>
						Tasks
					</button>
				</li>
			</ul>
		</aside>
		<section class="flex-1 w-1/2 max-w-3xl">
			<TransitionGroup name="info-card" mode="out-in">
				<ProjectInfo v-if="show === 'project'" :key="show" />
				<CardInfo v-if="show === 'card'" :key="show" />
				<TaskInfo v-if="show === 'task'" :key="show" />
			</TransitionGroup>
		</section>
	</div>
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
