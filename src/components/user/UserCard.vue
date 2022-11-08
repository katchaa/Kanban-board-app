<template>
	<div class="h-fit flex justify-center mt-10">
		<div
			class="flex flex-col gap-3 bg-gray-100 px-6 py-4 rounded-lg shadow-lg"
		>
			<header class="flex items-center gap-4">
				<img
					class="w-14 h-14 rounded-full -ml-1"
					:src="`/img/${user.avatar}`"
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
			<button
				class="self-end -mb-2 -mr-2 px-2 py-1 rounded-md hover:bg-gray-300/50 transition duration-200"
				@click="toggleEditModal"
			>
				Edit
			</button>
		</div>

		<!-- Edit form -->
		<EditUserModal
			:show="editUserModal"
			:user="user"
			@close-modal="toggleEditModal()"
		/>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import EditUserModal from './modals/EditUserModal.vue'

// User data from store
const authStore = useAuthStore()
const user = computed(() => {
	return authStore.user
})

// Toggle edit modal
const editUserModal = ref(false)
const toggleEditModal = () => {
	editUserModal.value = !editUserModal.value
}
</script>
