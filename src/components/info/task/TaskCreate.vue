<template>
	<article class="bg-gray-100 py-2 px-4">
		<h2 class="text-lg font-semibold mb-1 underline underline-offset-2">
			Create new task
		</h2>
		<p class="mb-6">
			For creating new task click "plus" icon on the bottom of the card.
		</p>
		<div class="flex flex-col items-center relative">
			<img
				class="w-auto h-80 mx-auto"
				src="../../../assets/svg/task.svg"
				alt=""
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
