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
			background-color: $bg-user-tab;
			padding: 0.25rem 0.5rem;
			border-radius: $radius-sm;

			font-size: $sm;
			font-weight: 600;
			text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
			box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.2);
			text-transform: capitalize;
			transition: 200ms;

			&:hover {
				background-color: rgba(255, 255, 255, 0.8);
				text-decoration: underline;
				text-underline-offset: 2px;
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
