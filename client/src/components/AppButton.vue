<template>
	<button class="app-btn">
		<slot />
	</button>
</template>

<style scoped lang="scss">
.app-btn {
	font-size: $md;
	font-weight: 500;
	color: $text-primary;
	padding: 0.4rem 0.5rem;
	border-radius: $radius;
	transition: 200ms;

	&:hover {
		background-color: transparentize($gray-medium, 0.85);
	}
}
</style>
