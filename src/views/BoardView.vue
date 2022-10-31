<template>
	<TheBoardNavbar />
	<div class="flex justify-start">
		<TheAsideNavbar />
		<div class="overflow-y-auto w-full">
			<RouterView />
		</div>
	</div>
</template>

<script setup>
import TheAsideNavbar from '../components/board/layout/TheAsideNavbar.vue'
import TheBoardNavbar from '../components/board/layout/TheBoardNavbar.vue'
</script>
