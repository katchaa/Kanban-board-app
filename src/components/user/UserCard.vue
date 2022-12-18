<template>
	<section class="card">
		<button class="icon" @click="toggleEditPopup()">
			<AppSVGIcon icon="ellipsis" />
		</button>
		<UserEditPopup
			:show="showEditPopup"
			@close-popup="toggleEditPopup()"
			@edit-profile="toggleEditModal()"
			@change-password="togglePasswordModal()"
			@delete-account="toggleDeleteModal()"
		/>
		<header>
			<img class="avatar" :src="user.avatar" :alt="user.username" />
			<h2 class="username">{{ user.username }}</h2>
		</header>
		<main>
			<div class="desc">
				<p>Name:</p>
				<p>Email:</p>
			</div>
			<div class="user-data">
				<p>{{ authStore.getFullName }}</p>
				<p>{{ user.email }}</p>
			</div>
		</main>
	</section>

	<!-- Edit form -->
	<EditUserModal
		:show="editUserModal"
		:user="user"
		@close-modal="toggleEditModal()"
	/>
	<ChangePasswordModal
		:user="user"
		:show="changePasswordModal"
		@close-modal="togglePasswordModal()"
	/>
	<DeleteModal
		:id="user.id"
		type="user"
		:show="showDeleteModal"
		@close-delete-modal="toggleDeleteModal()"
	>
		Are you sure to delete your account?
	</DeleteModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { User } from '../../types/userTypes'
import AppSVGIcon from '../AppSVGIcon.vue'
import DeleteModal from '../board/modals/DeleteModal.vue'
import ChangePasswordModal from './modals/ChangePasswordModal.vue'
import EditUserModal from './modals/EditUserModal.vue'
import UserEditPopup from './UserEditPopup.vue'

// User data from store
const authStore = useAuthStore()
const user = computed<User>(() => {
	return authStore.user
})

// Toggle edit popup
const showEditPopup = ref<boolean>(false)
const toggleEditPopup = (): boolean =>
	(showEditPopup.value = !showEditPopup.value)

// Toggle edit profile modal
const editUserModal = ref<boolean>(false)
const toggleEditModal = (): boolean =>
	(editUserModal.value = !editUserModal.value)

// Toggle change password modal
const changePasswordModal = ref<boolean>(false)
const togglePasswordModal = (): boolean =>
	(changePasswordModal.value = !changePasswordModal.value)

// Toggle delete modal
const showDeleteModal = ref<boolean>(false)
const toggleDeleteModal = (): boolean =>
	(showDeleteModal.value = !showDeleteModal.value)
</script>

<style scoped lang="scss">
.card {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;

	background-color: $gray-light;
	min-width: 15rem;
	max-width: max-content;
	height: max-content;
	margin-top: 3rem;
	padding: 1rem;

	border-radius: $radius;
	box-shadow: $card-shadow;

	.icon {
		position: absolute;
		right: 0.75rem;
		top: 0.55rem;
		cursor: pointer;
	}

	header {
		display: flex;
		align-items: center;
		gap: 1rem;

		.avatar {
			width: 3.5rem;
			height: 3.5rem;
			border-radius: 50%;
			margin-left: -0.25rem;
		}

		.username {
			font-size: $xl;
			font-weight: 600;
		}
	}

	main {
		display: flex;
		gap: 0.8rem;

		.desc > p {
			font-size: $sm;
			font-weight: 600;
		}

		.user-data > p {
			font-size: $sm;
		}
	}
}

@media screen and (min-width: $media-xs) {
	.card {
		margin-top: 4rem;
	}
}

@media screen and (min-width: $media-sm) {
	.card {
		main {
			.desc > p {
				font-size: $md;
			}

			.user-data > p {
				font-size: $md;
			}
		}
	}
}
</style>
