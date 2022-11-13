<template>
	<article>
		<h2
			class="mb-0.5 text-base font-semibold underline underline-offset-2 sm:text-lg sm:mb-1"
		>
			Delete card
		</h2>
		<p class="text-sm text-justify mb-3 sm:text-base sm:mb-6">
			For deleting your cards click on trash icon and open the confirm
			modal window.
		</p>
		<div class="flex flex-col items-center">
			<img
				class="w-auto h-60 mx-auto sm:h-80"
				src="../../../assets/svg/card-delete.svg"
				alt="Delete card"
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
