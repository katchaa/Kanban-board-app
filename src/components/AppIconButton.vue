<template>
	<div
		:class="`w-${size} h-${size} relative flex justify-center items-center bg-white/50 rounded-md cursor-pointer hover:bg-white/70 transition duration-200`"
		@mouseenter="toggleTooltip()"
		@mouseleave="toggleTooltip()"
	>
		<button>
			<AppSVGIcon :icon="props.icon" />
		</button>
		<AppTooltip v-if="showTooltip" :msg="props.tooltip" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import AppSVGIcon from './AppSVGIcon.vue'
import AppTooltip from './AppTooltip.vue'

const props = defineProps({
	icon: {
		type: String,
		required: true,
	},
	tooltip: {
		type: String,
	},
	size: {
		type: String,
		default: '9',
	},
})

// Tooltip toggle
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
