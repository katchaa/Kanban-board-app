<template>
	<section class="card">
		<h3>Login</h3>
		<p v-if="authError" class="auth-error">
			{{ authError }}
		</p>
		<form novalidate @submit.prevent="login()">
			<input type="email" placeholder="Your email" v-model="user.email" />
			<span
				class="error-msg"
				v-for="error in v$.email.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<input
				type="password"
				placeholder="Password"
				v-model="user.password"
			/>
			<span
				class="error-msg"
				v-for="error in v$.password.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<AppButton class="btn">Login</AppButton>
		</form>
		<p>
			Don't have an account?
			<span class="link" @click="showRegister()"> Register here </span>
		</p>
	</section>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../../stores/auth'
import AppButton from '../AppButton.vue'

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
const authError = computed(() => authStore.authError)
const router = useRouter()
const login = async () => {
	const result = await v$.value.$validate()
	if (result) {
		await authStore.login(user)
		if (authError.value || v$.value.$error) {
			return
		}
		router.push({ name: 'board' })
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/authCard.scss';
</style>
