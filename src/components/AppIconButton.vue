<template>
	<div
		class="relative flex justify-center items-center bg-white/50 rounded-md cursor-pointer hover:bg-white/70 transition duration-200"
	>
		<button
			:class="`w-${size} h-${size}`"
			@mouseenter="toggleTooltip()"
			@mouseleave="toggleTooltip()"
		>
			<i :class="`text-white text-xl ${icon}`"></i>
		</button>
		<AppTooltip v-if="showTooltip" :msg="tooltip" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import AppTooltip from './AppTooltip.vue'
defineProps({
	icon: {
		type: String,
		required: true,
	},
	size: {
		type: String,
		required: true,
	},
	tooltip: {
		type: String,
	},
})

const showTooltip = ref(false)
const toggleTooltip = () => {
	showTooltip.value = !showTooltip.value
}
</script>

<style scoped>
.tooltip-enter-from,
.tooltip-leave-to {
	opacity: 0;
	transform: scale(0.9);
}

.tooltip-enter-active,
.tooltip-leave-active {
	transition: all 0.25s;
}
</style>
