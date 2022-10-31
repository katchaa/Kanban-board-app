<template>
	<TheBoardNavbar />
	<div class="flex justify-start overflow-y-hidden">
		<TheAsideNavbar />
		<RouterView />
	</div>
</template>

<script setup>
import TheAsideNavbar from '../components/board/layout/TheAsideNavbar.vue'
import TheBoardNavbar from '../components/board/layout/TheBoardNavbar.vue'
</script>
