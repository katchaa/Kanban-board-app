<template>
	<section class="card">
		<h3>Sign up</h3>
		<form novalidate @submit.prevent="registration()">
			<input type="text" placeholder="Username" v-model="user.username" />
			<span
				class="error-msg"
				v-for="error in v$.username.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<input
				type="text"
				placeholder="First name"
				v-model="user.firstName"
			/>
			<span
				class="error-msg"
				v-for="error in v$.firstName.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<input
				type="text"
				placeholder="Last name"
				v-model="user.lastName"
			/>
			<span
				class="error-msg"
				v-for="error in v$.lastName.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<input type="email" placeholder="Email" v-model="user.email" />
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
			<input
				type="password"
				placeholder="Confirm password"
				v-model="user.passwordConfirm"
			/>
			<span
				class="error-msg"
				v-for="error in v$.passwordConfirm.$errors"
				:key="error.$uid"
			>
				{{ error.$message }}
			</span>
			<AppButton class="btn">Sign up</AppButton>
		</form>
		<p>
			Already have an account?
			<span class="link" @click="showLogin()"> Login here </span>
		</p>
	</section>
</template>

<script setup>
import { reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import AppButton from '../AppButton.vue'

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
		router.push({ name: 'board' })
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/authCard.scss';
</style>
