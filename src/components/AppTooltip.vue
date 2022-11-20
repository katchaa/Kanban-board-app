<template>
	<span class="msg" v-if="props.show && props.msg">
		{{ props.msg }}
	</span>
</template>

<script setup>
const props = defineProps({
	msg: {
		type: String || undefined,
	},
	show: {
		type: Boolean,
	},
})
</script>

<style scoped lang="scss">
.msg {
	position: absolute;
	left: 70%;
	top: 65%;
	z-index: 20;

	min-height: max-content;
	width: max-content;
	padding: 0.2rem 0.4rem;
	font-size: $sm;
	color: #fff;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
	background-color: $bg-user-tab;
	border-radius: $radius-sm;
}
</style>
