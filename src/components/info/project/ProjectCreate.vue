<template>
	<article>
		<h2 class="title">Create new project</h2>
		<p class="content">
			For creating new project click "plus" icon on main navbar and open
			the modal window.
		</p>
		<div class="img-content">
			<img
				class="example"
				src="../../../assets/svg/board.svg"
				alt="Board template"
				@click="toggleInfo()"
			/>
			<Transition name="modal">
				<img
					class="example overlay"
					src="../../../assets/svg/overlay.svg"
					alt="Modal create project"
					v-if="projectInfo"
					@click="toggleInfo()"
				/>
			</Transition>
			<p class="label">Click on this image</p>
		</div>
	</article>
</template>

<script setup>
import { ref } from 'vue'

const projectInfo = ref(false)
const toggleInfo = () => {
	projectInfo.value = !projectInfo.value
}
</script>

<style scoped lang="scss">
article {
	.title {
		margin-bottom: 0.4rem;
		font-size: $md;
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.content {
		font-size: $sm;
		text-align: justify;
		margin-bottom: 0.75rem;
	}
	.img-content {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;

		.example {
			max-width: 28rem;
			height: auto;
			margin: 0 auto;

			&.overlay {
				position: absolute;
			}
		}

		.label {
			font-size: $xs;
		}
	}
}

@media screen and (min-width: $media-sm) {
	article {
		.title {
			font-size: $lg;
			margin-bottom: 0.6rem;
		}

		.content {
			font-size: $md;
			margin-bottom: 1.5rem;
		}
	}
}
</style>
