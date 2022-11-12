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
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useProjectStore } from '../stores/project'

const authStore = useAuthStore()
const projectStore = useProjectStore()
onMounted(() => {
	authStore.$reset()
	projectStore.$reset()
})

const showForm = ref(false)

const toggleForm = () => {
	showForm.value = !showForm.value
}
</script>
