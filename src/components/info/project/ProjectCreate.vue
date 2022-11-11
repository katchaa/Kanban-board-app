<template>
	<article class="bg-gray-100 py-2 px-4">
		<h2 class="text-lg font-semibold mb-1 underline underline-offset-2">
			Create new project
		</h2>
		<p class="mb-6">
			For creating new project click "plus" icon on main navbar and open
			the modal window.
		</p>
		<div class="flex flex-col items-center relative">
			<img
				class="w-[28rem] h-auto mx-auto"
				src="../../../assets/svg/board.svg"
				alt=""
				@click="toggleInfo()"
			/>
			<Transition name="modal">
				<img
					class="w-[28rem] h-auto mx-auto absolute"
					src="../../../assets/svg/overlay.svg"
					alt=""
					v-if="projectInfo"
					@click="toggleInfo()"
				/>
			</Transition>
			<p class="text-xs text-right">Click this image</p>
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
