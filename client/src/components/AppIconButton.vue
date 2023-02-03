<template>
	<div class="wrapper">
		<div
			class="btn"
			@mouseenter="toggleTooltip()"
			@mouseleave="toggleTooltip()"
		>
			<button>
				<AppSVGIcon :icon="props.icon" />
			</button>
		</div>
		<Transition name="popup">
			<AppTooltip :show="showTooltip" :msg="props.tooltip" />
		</Transition>
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
})

// Tooltip toggle
const showTooltip = ref(false)
const toggleTooltip = () => {
	showTooltip.value = !showTooltip.value
}
</script>

<style scoped lang="scss">
.wrapper {
	position: relative;

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 0.2rem;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: $radius;
		transition: 200ms;
		cursor: pointer;

		&:hover {
			background-color: rgba(255, 255, 255, 0.7);
		}
	}
}
</style>
