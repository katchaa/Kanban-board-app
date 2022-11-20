<template>
	<section class="container" v-if="user">
		<h1 class="welcome">Welcome {{ user.username }}</h1>
		<!-- Project card -->
		<main class="cards">
			<RouterLink
				class="link"
				:to="{
					name: 'project',
					params: {
						userId: user.id,
						projectId: project.id,
					},
				}"
				v-for="project in projects"
				:key="project.id"
			>
				<h3 class="title">
					{{ project.projectName }}
				</h3>
				<img :src="project.avatar" :alt="project.projectName" />
			</RouterLink>
		</main>
	</section>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useProjectStore } from '../../stores/project'

const authStore = useAuthStore()
const projectStore = useProjectStore()

const user = computed(() => {
	return authStore.user
})

const projects = computed(() => {
	let projects = []
	// if (user.value) {
	for (const projectId of user.value.projects) {
		projects.push(
			projectStore.projects.find((project) => project.id === projectId)
		)
		// }
	}
	return projects
})
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 89vw;

	.welcome {
		align-self: flex-start;
		font-size: $xl;
		font-weight: 600;
		color: $text-dark;
		text-shadow: $navbar-shadow;
		margin-bottom: 0.5rem;
	}

	.cards {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		width: 80vw;

		.link {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 90%;
			max-width: 24rem;
			height: 12rem;

			background-color: $gray-light;
			padding: 0.5rem 1rem;
			border-radius: $radius;

			&:hover {
				text-decoration: underline;
			}

			.title {
				font-size: $md;
				font-weight: 600;
				align-self: flex-start;
				margin-bottom: 0.25rem;

				max-width: 60%;
				overflow: hidden;
				text-overflow: ellipsis;
				text-transform: capitalize;
			}

			img {
				width: 98%;
				height: 80%;
				border: 3px solid $gray-light;
				border-radius: $radius;
				object-fit: cover;
				box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
				transition: 350ms;

				&:hover {
					transform: scale(1.025);
				}
			}
		}
	}
}

@media screen and (min-width: $media-sm) {
	.container {
		max-width: 96vw;
		align-items: flex-start;
		.welcome {
			font-size: 2.3rem;
			margin-left: 0.5rem;
		}

		.cards {
			flex-direction: row;
			justify-content: flex-start;

			.link {
				min-width: 20rem;
				height: 15rem;
			}
		}
	}
}
</style>
