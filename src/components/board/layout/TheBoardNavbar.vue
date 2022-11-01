<template>
	<nav
		class="flex justify-between items-center px-2 py-1 bg-gray-500/10 shadow shadow-black/10"
	>
		<!-- Icons -->
		<div class="flex gap-2">
			<RouterLink
				:to="{ name: 'projectHome', params: { userId: user.id } }"
			>
				<AppIconButton
					icon="fa-solid fa-house"
					tooltip="Home"
					class="w-9 h-9"
				/>
			</RouterLink>
			<AppIconButton
				icon="fa-regular fa-circle-question"
				tooltip="Info"
				class="w-9 h-9"
			/>
			<AppIconButton
				icon="fa-solid fa-plus"
				tooltip="Add project"
				class="w-9 h-9"
			/>
		</div>
		<!-- User tab -->
		<div class="flex gap-2 relative">
			<div
				class="flex items-center gap-1.5 px-1.5 py-1 rounded-md hover:bg-white/50 transition duration-200 cursor-pointer"
				@click="toggleUserMenu()"
			>
				<img
					class="w-9 h-9 rounded-full"
					:src="`/img/${user.avatar}`"
					:alt="user.username"
				/>
				<p class="font-semibold text-white ml-1 select-none">
					{{ user.username }}
				</p>
				<i class="fa-solid fa-chevron-down text-sm text-white"></i>
			</div>
			<!-- User menu popup -->
			<Transition name="popup">
				<ul
					class="text-right absolute top-10 right-0 bg-white rounded-md"
					v-if="showUserMenu"
				>
					<RouterLink :to="{ name: 'user' }">
						<li
							class="rounded-t-md px-3 pt-1 mb-0.5 hover:bg-gray-200/50 transition duration-200 cursor-pointer"
							@click="toggleUserMenu()"
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
		</div>
	</nav>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import AppIconButton from '../../AppIconButton.vue'

// User menu popup toggle
const showUserMenu = ref(false)
const toggleUserMenu = () => {
	showUserMenu.value = !showUserMenu.value
}

const authStore = useAuthStore()
const user = computed(() => {
	return authStore.user
})

// Logout user
const router = useRouter()
const logout = () => {
	toggleUserMenu()
	authStore.logout()
	router.push({ name: 'auth' })
}
</script>

<style>
.popup-enter-from,
.popup-leave-to {
	opacity: 0;
	transform: scale(0.7);
}

.popup-enter-active,
.popup-leave-active {
	transition: all 0.3s;
}
</style>
