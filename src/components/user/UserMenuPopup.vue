<template>
	<Transition name="popup">
		<ul
			class="text-right absolute top-10 right-0 z-30 bg-white rounded-md"
			v-if="props.show"
		>
			<li
				class="rounded-t-md px-3 pt-1 mb-0.5 hover:bg-gray-200/50 transition duration-200 cursor-pointer"
				@click="closeUserMenu()"
			>
				<RouterLink :to="{ name: 'user' }"> Profile </RouterLink>
			</li>
			<li
				class="rounded-b-md px-3 pb-1 hover:bg-gray-200/50 transition duration-200 cursor-pointer"
				@click="logout()"
			>
				Logout
			</li>
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
