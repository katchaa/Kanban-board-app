<template>
	<article>
		<h2
			class="mb-0.5 text-base font-semibold underline underline-offset-2 sm:text-lg sm:mb-1"
		>
			Create new task
		</h2>
		<p class="text-sm text-justify mb-3 sm:text-base sm:mb-6">
			For creating new task click "plus" icon on the bottom of the card.
		</p>
		<div class="flex flex-col items-center">
			<img
				class="w-auto h-60 mx-auto sm:h-80"
				src="../../../assets/svg/task.svg"
				alt="Create task"
				@click="toggleInfo()"
			/>
		</div>
	</article>
</template>

<script setup>
import { ref } from 'vue'

const taskInfo = ref(false)
const toggleInfo = () => {
	taskInfo.value = !taskInfo.value
}
</script>
