<template>
	<article class="bg-gray-100 py-2 px-4">
		<h2 class="text-lg font-semibold mb-1 underline underline-offset-2">
			Delete card
		</h2>
		<p class="w-76 mb-6">
			For deleting your cards click on trash icon and open the confirm
			modal window.
		</p>
		<div class="flex flex-col items-center relative">
			<img
				class="w-auto h-80 mx-auto"
				src="../../../assets/svg/card-delete.svg"
				alt=""
				@click="toggleInfo()"
			/>
		</div>
	</article>
</template>

<script setup>
import { ref } from 'vue'

const cardInfo = ref(false)
const toggleInfo = () => {
	cardInfo.value = !cardInfo.value
}
</script>
