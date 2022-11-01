<template>
	<section
		class="bg-gray-100 w-72 relative flex flex-col items-center mx-auto mt-16 shrink-0 py-2 px-4 rounded-md shadow-md h-fit"
	>
		<h3 class="font-semibold text-2xl text-gray-700 select-none my-2">
			Register
		</h3>
		<form
			novalidate
			@submit.prevent="registration()"
			class="w-full flex flex-col items-center gap-3 my-2"
		>
			<input
				type="text"
				placeholder="Username"
				class="w-full focus:outline-none p-1 rounded-sm"
				v-model="user.username"
			/>
			<span
				class="text-xs text-red-500 self-start -mt-2"
				v-for="error in v$.username.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<input
				type="text"
				placeholder="First name"
				class="w-full focus:outline-none p-1 rounded-sm"
				v-model="user.firstName"
			/>
			<span
				class="text-xs text-red-500 self-start -mt-2"
				v-for="error in v$.firstName.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<input
				type="text"
				placeholder="Last name"
				class="w-full focus:outline-none p-1 rounded-sm"
				v-model="user.lastName"
			/>
			<span
				class="text-xs text-red-500 self-start -mt-2"
				v-for="error in v$.lastName.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<input
				type="email"
				placeholder="Email"
				class="w-full focus:outline-none p-1 rounded-sm"
				v-model="user.email"
			/>
			<span
				class="text-xs text-red-500 self-start -mt-2"
				v-for="error in v$.email.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<input
				type="password"
				placeholder="Password"
				class="w-full focus:outline-none p-1 rounded-sm"
				v-model="user.password"
			/>
			<span
				class="text-xs text-red-500 self-start -mt-2"
				v-for="error in v$.password.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<input
				type="password"
				placeholder="Confirm password"
				class="w-full focus:outline-none p-1 rounded-sm"
				v-model="user.passwordConfirm"
			/>
			<span
				class="text-xs text-red-500 self-start -mt-2"
				v-for="error in v$.passwordConfirm.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<button
				class="self-end py-0.5 px-1.5 rounded-md hover:bg-gray-200 transition duration-200"
			>
				Registration
			</button>
		</form>
		<p class="text-xs mb-1 text-gray-400">
			Already have an account?
			<span
				class="hover:text-black hover:underline cursor-pointer"
				@click="showLogin()"
			>
				Login here
			</span>
		</p>
	</section>
</template>

<script setup>
import { reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const emit = defineEmits(['toggleForm'])

const showLogin = () => {
	emit('toggleForm')
}

const user = reactive({
	username: '',
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	passwordConfirm: '',
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
		email: {
			required: helpers.withMessage('Email is required', required),
			email: helpers.withMessage('Invalid email format', email),
		},
		password: {
			required: helpers.withMessage('Password is required', required),
		},
		passwordConfirm: {
			required: helpers.withMessage(
				'Password confirm is required',
				required
			),
			sameAs: helpers.withMessage(
				"Passwords don't match",
				sameAs(user.password)
			),
		},
	}
})
const v$ = useVuelidate(rules, user)

// Registration action
const authStore = useAuthStore()
const router = useRouter()
const registration = async () => {
	const result = await v$.value.$validate()
	if (result) {
		await authStore.registration(user)
		router.push({ name: 'board', params: { userId: authStore.authUser } })
	}
}
</script>
