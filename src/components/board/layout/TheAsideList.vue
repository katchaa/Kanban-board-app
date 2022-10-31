<template>
	<div class="flex flex-col items-center gap-y-2">
		<i
			class="fa-solid fa-chevron-right text-white/50 hover:text-white transition duration-200 self-end mb-0.5 cursor-pointer"
			@click="toggleDrawer()"
		></i>

		<img
			class="w-9 h-9 rounded"
			src="../../../../public/img/groot.jpg"
			alt=""
		/>
		<img
			class="w-9 h-9 rounded"
			src="../../../../public/img/groot.jpg"
			alt=""
		/>
		<img
			class="w-9 h-9 rounded"
			src="../../../../public/img/groot.jpg"
			alt=""
		/>
	</div>
</template>

<script setup>
const emit = defineEmits(['toggleDrawer'])
const toggleDrawer = () => {
	emit('toggleDrawer')
}
</script>
