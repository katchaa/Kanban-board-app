<template>
	<article>
		<h2 class="title">Delete card</h2>
		<p class="content">
			For deleting your cards click on trash icon and open the confirm
			modal window.
		</p>
		<img
			class="example"
			src="../../../assets/svg/card-delete.svg"
			alt="Delete card"
			@click="toggleInfo()"
		/>
	</article>
</template>

<script setup>
import { ref } from 'vue'

const cardInfo = ref(false)
const toggleInfo = () => {
	cardInfo.value = !cardInfo.value
}
</script>

<style scoped lang="scss">
article {
	display: flex;
	flex-direction: column;
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
	.example {
		width: auto;
		height: 15rem;
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

		.example {
			height: 20rem;
			margin: 0.5rem 0;
		}
	}
}
</style>
