<template>
	<article>
		<h2
			class="mb-0.5 text-base font-semibold underline underline-offset-2 sm:text-lg sm:mb-1"
		>
			Delete project
		</h2>
		<p class="text-sm text-justify mb-3 sm:text-base sm:mb-6">
			For deleting your project click on project name, pick out Delete on
			popup menu and open the confirm modal window.
		</p>
		<div class="flex flex-col items-center relative">
			<img
				class="w-[28rem] h-auto mx-auto"
				src="../../../assets/svg/board-popup-delete.svg"
				alt="Delete project popup"
				@click="toggleInfo()"
			/>
			<Transition name="modal">
				<img
					class="w-[28rem] h-auto mx-auto absolute"
					src="../../../assets/svg/confirm.svg"
					alt="Modal confirm"
					v-if="projectInfo"
					@click="toggleInfo()"
				/>
			</Transition>
			<p class="text-xs">Click this image</p>
		</div>
	</article>
</template>

<script setup>
import { ref } from 'vue'

const projectInfo = ref(false)
const toggleInfo = () => {
	projectInfo.value = !projectInfo.value
}
</script>
