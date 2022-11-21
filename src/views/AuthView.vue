<template>
	<div class="container">
		<header>
			<RouterLink :to="{ name: 'landingPage' }">Back</RouterLink>
		</header>
		<TransitionGroup
			name="auth"
			mode="out-in"
			appear
			tag="div"
			class="auth-view"
		>
			<LoginForm v-if="!showForm" @toggleForm="toggleForm()" />
			<RegistrationForm v-if="showForm" @toggleForm="toggleForm()" />
		</TransitionGroup>
	</div>
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

<style scoped lang="scss">
.container {
	margin: 0 auto;
	header {
		display: flex;
		justify-content: flex-end;
		padding: 0.5rem 0.5rem 0 0;

		a {
			font-size: $sm;
			padding: 0.2rem 0.4rem;
			border-radius: $radius;
			transition: 200ms;

			&:hover {
				background-color: $bg-user-tab;
			}
		}
	}
	.auth-view {
		padding: 6rem 1rem 0 1rem;
	}
}

@media screen and (min-width: $media-lg) {
	.container {
		max-width: 80%;
	}
}
@media screen and (min-width: $media-xl) {
	.container {
		max-width: 40%;
	}
}
</style>
