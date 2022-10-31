<template>
	<nav class="p-2 flex items-center gap-x-2">
		<div class="flex items-center relative shrink-0">
			<button class="text-white text-xl font-semibold select-none">
				Project name
				<i class="fa-solid fa-chevron-down text-sm ml-1"></i>
			</button>
		</div>
		<span class="text-white/40 text-xl mx-1">|</span>
		<div
			class="bg-white/50 rounded-md flex justify-center items-center shrink-0"
		>
			<p class="text-white text-lg px-4 select-none">Company name</p>
		</div>
		<AppIconButton
			icon="fa-solid fa-plus"
			tooltip="Add card"
			class="w-7 h-7"
		/>
	</nav>
</template>

<script setup>
import AppIconButton from '../../AppIconButton.vue'
</script>
