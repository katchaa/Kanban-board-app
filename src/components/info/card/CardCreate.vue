<template>
	<article>
		<h2
			class="mb-0.5 text-base font-semibold underline underline-offset-2 sm:text-lg sm:mb-1"
		>
			Create new card
		</h2>
		<p class="text-sm text-justify mb-3 sm:text-base sm:mb-6">
			For creating new card click "plus" icon on project navbar and open
			the modal window.
		</p>
		<div class="flex flex-col items-center relative">
			<img
				class="w-[28rem] h-auto mx-auto"
				src="../../../assets/svg/board-card.svg"
				alt="Board"
				@click="toggleInfo()"
			/>
			<Transition name="modal">
				<img
					class="w-[28rem] h-auto mx-auto absolute"
					src="../../../assets/svg/overlay-card.svg"
					alt="Modal create card"
					v-if="cardInfo"
					@click="toggleInfo()"
				/>
			</Transition>
			<p class="text-xs">Click this image</p>
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
