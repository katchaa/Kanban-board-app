<template>
	<div class="relative flex justify-center mt-10">
		<div
			class="relative flex flex-col gap-3 bg-gray-100 px-6 py-6 rounded-lg shadow-lg"
		>
			<button class="absolute right-3 top-3" @click="toggleEditPopup()">
				<AppSVGIcon icon="ellipsis" />
			</button>
			<UserEditPopup
				:show="showEditPopup"
				@close-popup="toggleEditPopup()"
				@edit-profile="toggleEditModal()"
				@change-password="togglePasswordModal()"
				@delete-account="toggleDeleteModal()"
			/>
			<header class="flex items-center gap-4">
				<img
					class="w-14 h-14 rounded-full -ml-1"
					:src="user.avatar"
					:alt="user.username"
				/>
				<h2 class="text-lg font-semibold">{{ user.username }}</h2>
			</header>
			<main class="flex gap-5">
				<div>
					<p class="font-semibold">Name:</p>
					<p class="font-semibold">Email:</p>
				</div>
				<div>
					<p>{{ authStore.getFullName }}</p>
					<p>{{ user.email }}</p>
				</div>
			</main>
		</div>

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
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import AppSVGIcon from '../AppSVGIcon.vue'
import DeleteModal from '../board/modals/DeleteModal.vue'
import ChangePasswordModal from './modals/ChangePasswordModal.vue'
import EditUserModal from './modals/EditUserModal.vue'
import UserEditPopup from './UserEditPopup.vue'

// User data from store
const authStore = useAuthStore()
const user = computed(() => {
	return authStore.user
})

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
