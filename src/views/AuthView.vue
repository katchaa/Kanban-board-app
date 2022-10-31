<template>
	<TransitionGroup
		name="auth"
		mode="out-in"
		appear
		tag="div"
		class="overflow-y-hidden"
	>
		<LoginForm v-if="showForm" @toggleForm="toggleForm()" />
		<RegistrationForm v-if="!showForm" @toggleForm="toggleForm()" />
	</TransitionGroup>
</template>

<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import RegistrationForm from '@/components/auth/RegistrationForm.vue'
import { ref } from 'vue'

const showForm = ref(true)

const toggleForm = () => {
	showForm.value = !showForm.value
}
</script>

<style>
.auth-enter-from,
.auth-leave-to {
	opacity: 0;
	transform: scale(0.9);
}

.auth-enter-active {
	transition: all 0.3s ease 0.2s;
}

.auth-leave-active,
.auth-move {
	transition: all 0.2s ease;
}
</style>
