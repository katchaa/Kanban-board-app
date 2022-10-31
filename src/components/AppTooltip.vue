<template>
	<span
		class="absolute left-[70%] top-[65%] z-30 max-h-10 min-w-max bg-gray-200/70 rounded-md px-1 py-0.5 text-sm"
		v-if="props.msg"
	>
		{{ props.msg }}
	</span>
</template>

<script setup>
const props = defineProps({
	msg: {
		type: String || undefined,
	},
})
</script>
