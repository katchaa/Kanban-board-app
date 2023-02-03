<template>
	<!-- Start on screen 340px -->
	<Suspense>
		<RouterView />
	</Suspense>
</template>

<style lang="scss">
#app {
	background-image: linear-gradient(to right, #38bdf8, #5eead4);
	min-height: 100vh;
}
</style>
