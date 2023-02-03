<template>
	<TransitionGroup tag="aside" name="drawer" mode="out-in" class="aside-menu">
		<TheAsideList v-if="!showDrawer" @toggle-drawer="toggleDrawer()" />
		<TheAsideDrawer v-if="showDrawer" @toggle-drawer="toggleDrawer()" />
	</TransitionGroup>
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

<style>
.aside-menu {
	height: calc(100vh - 3rem);
}
</style>
