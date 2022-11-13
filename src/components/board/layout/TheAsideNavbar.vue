<template>
	<TransitionGroup tag="aside" name="drawer" mode="out-in" class="h-screen">
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
.drawer-enter-from {
	transform: translateX(-12rem);
}

.drawer-leave-to {
	transform: translateX(-15rem);
}

.drawer-enter-active {
	transition: all 0.8s;
}

.drawer-leave-active,
.drawer-move {
	position: absolute;
	transition: all 0.7s;
}
</style>
