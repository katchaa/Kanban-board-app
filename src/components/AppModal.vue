<template>
	<Teleport to="body">
		<Transition name="modal">
			<div class="overlay" v-if="props.show">
				<slot />
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
})
</script>

<style lang="scss" scoped>
.overlay {
	display: flex;
	justify-content: center;
	align-items: flex-start;

	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	padding-top: 7rem;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
}

@media screen and (min-width: $media-sm) {
	.overlay {
		padding-top: 9rem;
	}
}
</style>
