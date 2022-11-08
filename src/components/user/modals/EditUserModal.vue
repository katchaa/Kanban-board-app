<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				class="absolute left-0 top-0 z-10 w-full h-screen bg-black/40 flex justify-center items-start p-36"
				v-if="props.show"
			>
				<section
					class="w-64 bg-gray-100 px-3 py-4 rounded-lg shadow-lg"
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
							>
								Save
							</button>
						</div>
					</form>
				</section>
				<button
					class="relative right-6 top-0.5 text-lg text-gray-300 hover:text-gray-600 transition duration-200"
					@click="closeModal()"
				>
					<i class="fa-regular fa-circle-xmark"></i>
				</button>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { computed, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../../../stores/auth'

const props = defineProps({
	user: {
		type: Object,
		required: true,
	},
	show: {
		type: Boolean,
		required: true,
	},
})

// Edit user data
let userData = reactive({
	username: props.user.username,
	firstName: props.user.firstName,
	lastName: props.user.lastName,
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

// Emit to close modal
const emit = defineEmits(['closeModal'])
const closeModal = () => {
	emit('closeModal')
}

// Edit user action
const authStore = useAuthStore()
const editUser = async () => {
	const result = await v$.value.$validate()
	const newUser = reactive({
		username: userData.username,
		firstName: userData.firstName,
		lastName: userData.lastName,
	})
	if (result) {
		authStore
			.editUser(props.user.id, newUser)
			.then(() => authStore.fetchUser())
		emit('closeModal')
	}
}
</script>
