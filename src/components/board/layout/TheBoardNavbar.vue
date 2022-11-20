<template>
	<nav class="navbar">
		<!-- Icons tab -->
		<div class="icons">
			<RouterLink
				:to="{ name: 'projectHome', params: { userId: user.id } }"
			>
				<AppIconButton icon="home" tooltip="Home" size="9" />
			</RouterLink>
			<RouterLink :to="{ name: 'info', params: { userId: user.id } }">
				<AppIconButton icon="info" tooltip="Info" size="9" />
			</RouterLink>
			<AppIconButton
				icon="add"
				tooltip="Add project"
				size="9"
				@click="toggleNewProjectModal()"
			/>
			<NewProjectModal
				:show="showNewProjectModal"
				@close-modal="toggleNewProjectModal()"
			/>
		</div>
		<!-- User tab -->
		<div class="user-tab" @click="toggleUserMenu()">
			<img class="avatar" :src="user.avatar" :alt="user.username" />
			<p class="username">
				{{ user.username }}
			</p>
			<button class="icon">
				<AppSVGIcon icon="chevronDown" />
			</button>
		</div>
		<!-- User menu popup -->
		<UserMenuPopup :show="showUserMenu" @close-menu="toggleUserMenu()" />
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

<style scoped lang="scss">
.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-width: 100vw;

	padding: 0.25rem 0.5rem;
	background-color: $bg-gray-transparent;
	box-shadow: $navbar-shadow;

	.icons {
		display: flex;
		gap: 0.35rem;
	}

	.user-tab {
		display: flex;
		align-items: center;
		gap: 0.4rem;

		padding: 0.25rem 0.4rem;
		border-radius: $radius;
		cursor: pointer;
		transition: 200ms;

		&:hover {
			background-color: $bg-user-tab;
		}

		.avatar {
			width: 2rem;
			height: 2rem;
			border-radius: 50%;
		}

		.username {
			color: #fff;
			font-size: $md;
			font-weight: 600;
			margin-right: -0.2rem;
		}

		.icon {
			margin-top: 0.1rem;
		}
	}
}

@media screen and (min-width: $media-sm) {
	.navbar {
		.user-tab {
			margin-right: 0;
		}
	}
}
</style>
