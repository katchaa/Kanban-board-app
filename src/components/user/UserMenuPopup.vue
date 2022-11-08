<template>
	<Transition name="popup">
		<ul
			class="text-right absolute top-10 right-0 bg-white rounded-md"
			v-if="props.show"
		>
			<RouterLink :to="{ name: 'user' }">
				<li
					class="rounded-t-md px-3 pt-1 mb-0.5 hover:bg-gray-200/50 transition duration-200 cursor-pointer"
					@click="closeUserMenu()"
				>
					Profile
				</li>
			</RouterLink>
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
import { useProjectStore } from '../../stores/project'
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
const projectStore = useProjectStore()
const router = useRouter()
const logout = () => {
	emit('closeMenu')
	authStore.logout()
	router.push({ name: 'auth' })
	projectStore.$reset()
}
</script>
