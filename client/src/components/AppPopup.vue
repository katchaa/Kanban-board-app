<template>
	<Transition name="popup">
		<div class="wrapper" v-if="props.show">
			<button class="item top" @click="editMode()">Edit</button>

			<button class="item bottom" @click="deleteMode()">Delete</button>
		</div>
	</Transition>
</template>

<script setup>
const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
})
const emit = defineEmits(['editMode', 'deleteMode'])

const editMode = () => {
	emit('editMode')
}

const deleteMode = () => {
	emit('deleteMode')
}
</script>

<style scoped lang="scss">
.wrapper {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;

	position: absolute;
	top: 1.5rem;
	right: -4rem;
	z-index: 20;

	background-color: $bg-popup;
	border-radius: $radius;

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;

		font-size: $sm;
		padding: 0 1rem 0 0.5rem;
		cursor: pointer;
		transition: 300ms;

		&:hover {
			background-color: darken($bg-popup, 5%);
		}

		&.top {
			padding-top: 0.25rem;
			padding-bottom: 0.125rem;
			border-radius: $radius $radius 0 0;
		}
		&.bottom {
			padding-bottom: 0.25rem;
			padding-top: 0.125rem;
			border-radius: 0 0 $radius $radius;
		}
	}
}
</style>
