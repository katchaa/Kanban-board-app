<template>
	<Transition name="popup">
		<aside class="wrapper" v-if="props.show">
			<button class="item top" @click="editProfile()">
				Edit profile
			</button>
			<button class="item middle" @click="editPassword()">
				Change password
			</button>
			<button class="item bottom" @click="deleteAccount()">
				Delete account
			</button>
		</aside>
	</Transition>
</template>

<script setup>
const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
})

const emit = defineEmits([
	'closePopup',
	'editProfile',
	'changePassword',
	'deleteAccount',
])

const editProfile = () => {
	emit('editProfile')
	emit('closePopup')
}

const editPassword = () => {
	emit('changePassword')
	emit('closePopup')
}

const deleteAccount = () => {
	emit('deleteAccount')
	emit('closePopup')
}
</script>

<style scoped lang="scss">
.wrapper {
	display: flex;
	flex-direction: column;
	// gap: 0.5rem;
	position: absolute;
	top: 1.5rem;
	right: 1rem;
	z-index: 20;

	background-color: $bg-popup;
	border-radius: $radius;

	.item {
		width: 100%;
		font-size: $sm;
		text-align: right;
		padding: 0 0.5rem;
		transition: 300ms;

		&:hover {
			background-color: darken($bg-popup, 5%);
		}

		&.top {
			padding-top: 0.25rem;
			padding-bottom: 0.15rem;
			border-radius: $radius $radius 0 0;
		}
		&.middle {
			padding-top: 0.15rem;
			padding-bottom: 0.15rem;
		}
		&.bottom {
			padding-bottom: 0.25rem;
			padding-top: 0.15rem;
			border-radius: 0 0 $radius $radius;
		}
	}
}

@media screen and (min-width: $media-sm) {
	.wrapper {
		right: -7rem;

		.item {
			text-align: left;
		}
	}
}
</style>
