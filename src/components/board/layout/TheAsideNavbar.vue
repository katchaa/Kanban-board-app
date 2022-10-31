<template>
	<aside class="h-screen bg-gray-500/10 px-2 pt-2">
		<TheAsideList v-if="!showDrawer" @toggle-drawer="toggleDrawer()" />
		<TheAsideDrawer v-if="showDrawer" @toggle-drawer="toggleDrawer()" />
	</aside>
</template>

<script setup>
import TheAsideList from './TheAsideList.vue'
import TheAsideDrawer from './TheAsideDrawer.vue'
import { ref } from 'vue'

const showDrawer = ref(false)

const toggleDrawer = () => {
	showDrawer.value = !showDrawer.value
}
</script>
