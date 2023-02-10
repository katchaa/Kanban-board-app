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
				<p>{{ fullName }}</p>
				<p>{{ user.email }}</p>
			</div>
		</main>
	</section>

	<!-- Edit form -->
	<EditUserModal :show="editUserModal" @close-modal="toggleEditModal()" />
	<ChangePasswordModal
		:show="changePasswordModal"
		@close-modal="togglePasswordModal()"
	/>
	<DeleteModal
		:id="user._id"
		type="user"
		:show="showDeleteModal"
		@close-delete-modal="toggleDeleteModal()"
	>
		Are you sure to delete your account?
	</DeleteModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '../../stores/project'
import AppSVGIcon from '../AppSVGIcon.vue'
import DeleteModal from '../board/modals/DeleteModal.vue'
import ChangePasswordModal from './modals/ChangePasswordModal.vue'
import EditUserModal from './modals/EditUserModal.vue'
import UserEditPopup from './UserEditPopup.vue'

// User data from store
const projectStore = useProjectStore()
const user = computed(() => projectStore.user)
const fullName = computed(() => projectStore.getFullName)

// Toggle edit popup
const showEditPopup = ref(false)
const toggleEditPopup = () => {
	showEditPopup.value = !showEditPopup.value
}

// Toggle edit profile modal
const editUserModal = ref(false)
const toggleEditModal = () => {
	editUserModal.value = !editUserModal.value
}

// Toggle change password modal
const changePasswordModal = ref(false)
const togglePasswordModal = () => {
	changePasswordModal.value = !changePasswordModal.value
}

// Toggle delete modal
const showDeleteModal = ref(false)
const toggleDeleteModal = () => {
	showDeleteModal.value = !showDeleteModal.value
}
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
