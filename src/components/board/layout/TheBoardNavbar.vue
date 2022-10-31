<template>
	<nav
		class="flex justify-between items-center px-2 py-1 bg-gray-500/10 shadow shadow-black/10"
	>
		<!-- Icons -->
		<div class="flex gap-2">
			<AppIconButton
				icon="fa-solid fa-house"
				tooltip="Home"
				class="w-9 h-9"
			/>
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
					src="../../../../public/img/groot.jpg"
					alt=""
				/>
				<p class="font-semibold text-white ml-1 select-none">
					User name
				</p>
				<i class="fa-solid fa-chevron-down text-sm text-white"></i>
			</div>
			<!-- User menu popup -->
			<Transition name="popup">
				<ul
					class="text-right absolute top-10 right-0 bg-white rounded-md"
					v-if="showUserMenu"
				>
					<li
						class="rounded-t-md px-3 pt-1 mb-0.5 hover:bg-gray-200/50 transition duration-200 cursor-pointer"
					>
						Profile
					</li>
					<li
						class="rounded-b-md px-3 pb-1 hover:bg-gray-200/50 transition duration-200 cursor-pointer"
					>
						Logout
					</li>
				</ul>
			</Transition>
		</div>
	</nav>
</template>

<script setup>
import { ref } from 'vue'
import AppIconButton from '../../AppIconButton.vue'

// User menu popup toggle
const showUserMenu = ref(false)
const toggleUserMenu = () => {
	showUserMenu.value = !showUserMenu.value
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
