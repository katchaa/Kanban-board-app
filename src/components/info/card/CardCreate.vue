<template>
	<article class="bg-gray-100 py-2 px-4">
		<h2 class="text-lg font-semibold mb-1 underline underline-offset-2">
			Create new card
		</h2>
		<p class="mb-6">
			For creating new card click "plus" icon on project navbar and open
			the modal window.
		</p>
		<div class="flex flex-col items-center relative">
			<img
				class="w-[28rem] h-auto mx-auto"
				src="../../../assets/svg/board-card.svg"
				alt=""
				@click="toggleInfo()"
			/>
			<Transition name="modal">
				<img
					class="w-[28rem] h-auto mx-auto absolute"
					src="../../../assets/svg/overlay-card.svg"
					alt=""
					v-if="cardInfo"
					@click="toggleInfo()"
				/>
			</Transition>
			<p class="text-xs text-right">Click this image</p>
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
