<template>
	<nav
		class="flex justify-between items-center px-2 py-1 bg-gray-500/10 shadow shadow-black/10"
	>
		<!-- Icons -->
		<div class="flex gap-2">
			<RouterLink
				:to="{ name: 'projectHome', params: { userId: user.id } }"
			>
				<AppIconButton icon="home" tooltip="Home" class="w-9 h-9" />
			</RouterLink>
			<AppIconButton icon="info" tooltip="Info" class="w-9 h-9" />
			<AppIconButton
				icon="add"
				tooltip="Add project"
				class="w-9 h-9"
				@click="toggleNewProjectModal()"
			/>
			<NewProjectModal
				:show="showNewProjectModal"
				@close-modal="toggleNewProjectModal()"
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
				<AppSVGIcon icon="chevronDown" />
			</div>
			<!-- User menu popup -->
			<UserMenuPopup
				:show="showUserMenu"
				@close-menu="toggleUserMenu()"
			/>
		</div>
	</nav>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import AppIconButton from '../../AppIconButton.vue'
import AppSVGIcon from '../../AppSVGIcon.vue'
import UserMenuPopup from '../../user/UserMenuPopup.vue'
import NewProjectModal from '../modals/NewProjectModal.vue'

const authStore = useAuthStore()
const user = computed(() => {
	return authStore.user
})

// Toggle new project modal
const showNewProjectModal = ref(false)
const toggleNewProjectModal = () => {
	showNewProjectModal.value = !showNewProjectModal.value
}

// Toggle user menu popup
const showUserMenu = ref(false)
const toggleUserMenu = () => {
	showUserMenu.value = !showUserMenu.value
}
</script>
