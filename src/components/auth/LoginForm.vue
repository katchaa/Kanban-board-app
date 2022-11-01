<template>
	<section
		class="bg-gray-100 w-72 relative flex flex-col items-center mx-auto mt-16 shrink-0 py-2 px-4 rounded-md shadow-md h-fit"
	>
		<h3 class="font-semibold text-2xl text-gray-700 select-none my-2">
			Login
		</h3>
		<form
			novalidate
			@submit.prevent="login()"
			class="w-full flex flex-col items-center gap-3 my-2"
		>
			<input
				type="email"
				placeholder="Your email"
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
			<button
				type="submit"
				class="self-end py-0.5 px-1.5 rounded-md hover:bg-gray-200 transition duration-200"
			>
				Login
			</button>
		</form>
		<p class="text-xs mb-1 text-gray-400">
			Don't have an account?
			<span
				class="hover:text-black hover:underline cursor-pointer"
				@click="showRegister()"
			>
				Register here
			</span>
		</p>
	</section>
</template>

<script setup>
import { reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../../stores/auth'

const emit = defineEmits(['toggleForm'])
const showRegister = () => {
	emit('toggleForm')
}

const user = reactive({
	email: '',
	password: '',
})

// Validation settings
const rules = computed(() => {
	return {
		email: {
			email: helpers.withMessage('Invalid email format', email),
			required: helpers.withMessage('Email is required', required),
		},
		password: {
			required: helpers.withMessage('Password is required', required),
		},
	}
})
const v$ = useVuelidate(rules, user)

// Login action
const authStore = useAuthStore()
const login = async () => {
	const result = await v$.value.$validate()
	if (result) {
		authStore.login(user)
	}
}
</script>
