<template>
	<Transition name="popup">
		<ul class="wrapper" v-if="props.show">
			<li class="item first" @click="closeUserMenu()">
				<RouterLink :to="{ name: 'user' }"> Profile </RouterLink>
			</li>
			<li class="item second" @click="logout()">Logout</li>
		</ul>
	</Transition>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
})

const emit = defineEmits(['closeMenu'])

// Emit to close menu
const closeUserMenu = () => {
	emit('closeMenu')
}

// Logout user
const authStore = useAuthStore()
const router = useRouter()
const logout = async () => {
	emit('closeMenu')
	router.push({ name: 'auth' })
	await authStore.logout()
}
</script>

<style scoped lang="scss">
.wrapper {
	position: absolute;
	top: 1.6rem;
	right: 0.5rem;
	z-index: 30;

	background-color: #fff;
	text-align: right;
	border-radius: $radius;

	.item {
		// width: 100%;
		padding: 0 0.5rem 0 1rem;
		cursor: pointer;

		&.first {
			padding-top: 0.25rem;
			margin-bottom: 0.2rem;
			transition: 200ms;
			border-radius: $radius $radius 0 0;

			&:hover {
				background-color: $bg-board-navbar;
			}
		}

		&.second {
			padding-bottom: 0.25rem;
			transition: 200ms;
			border-radius: 0 0 $radius $radius;

			&:hover {
				background-color: $bg-board-navbar;
			}
		}
	}
}
</style>
