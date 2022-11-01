<template>
	<div class="min-w-64 h-fit flex justify-center mt-10">
		<div
			class="flex flex-col gap-3 bg-gray-100 px-6 py-4 rounded-lg shadow-lg"
			v-if="!editUserForm"
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
				@click="toggleEdit"
			>
				Edit
			</button>
		</div>

		<!-- Edit form -->
		<div
			class="w-64 bg-gray-100 px-3 py-4 rounded-lg shadow-lg"
			v-if="editUserForm"
		>
			<form
				novalidate
				@submit.prevent="editUser()"
				class="w-full flex flex-col gap-2 my-2"
			>
				<div>
					<label for="username" class="text-gray-400"
						>Username
					</label>

					<input
						type="text"
						placeholder="Username"
						id="username"
						class="w-full focus:outline-none p-1 text-black"
						v-model="userData.username"
					/>
					<span
						class="text-xs text-red-500 self-start -mt-2"
						v-for="error in v$.username.$errors"
						:key="error.$uid"
					>
						{{ error.$message }}
					</span>
				</div>
				<div>
					<label for="firstName" class="text-gray-400"
						>First name
					</label>

					<input
						type="text"
						placeholder="First name"
						id="firstName"
						class="w-full focus:outline-none p-1 text-black"
						v-model="userData.firstName"
					/>
					<span
						class="text-xs text-red-500 self-start -mt-2"
						v-for="error in v$.firstName.$errors"
						:key="error.$uid"
					>
						{{ error.$message }}
					</span>
				</div>
				<div>
					<label for="lastName" class="text-gray-400"
						>Last name
					</label>

					<input
						type="text"
						placeholder="Last name"
						id="lastName"
						class="w-full focus:outline-none p-1 text-black"
						v-model="userData.lastName"
					/>
					<span
						class="text-xs text-red-500 self-start -mt-2"
						v-for="error in v$.lastName.$errors"
						:key="error.$uid"
					>
						{{ error.$message }}
					</span>
				</div>
				<div class="self-end -mb-2 -mr-1">
					<button
						class="px-2 py-1 rounded-md hover:bg-gray-300/50 transition duration-200"
						@click="toggleEdit()"
					>
						Back
					</button>
					<button
						class="px-2 py-1 rounded-md hover:bg-gray-300/50 transition duration-200"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../../stores/auth'

// Toggle edit form
const editUserForm = ref(false)
const toggleEdit = () => {
	editUserForm.value = !editUserForm.value
}

// User data from store
const authStore = useAuthStore()
const user = computed(() => {
	return authStore.user
})

// Edit user data
let userData = reactive({
	username: user.value.username,
	firstName: user.value.firstName,
	lastName: user.value.lastName,
})

// Validation settings
const rules = computed(() => {
	return {
		username: {
			required: helpers.withMessage('Username is required', required),
		},
		firstName: {
			required: helpers.withMessage('First name is required', required),
		},
		lastName: {
			required: helpers.withMessage('Last name is required', required),
		},
	}
})
const v$ = useVuelidate(rules, userData)

const editUser = async () => {
	const result = await v$.value.$validate()
	const newUser = reactive({
		username: userData.username,
		firstName: userData.firstName,
		lastName: userData.lastName,
	})
	if (result) {
		console.log(newUser)
		toggleEdit()
	}
}
</script>
