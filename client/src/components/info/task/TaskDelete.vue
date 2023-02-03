<template>
	<article>
		<h2 class="title">Delete task</h2>
		<p class="content">
			For deleting your tasks click on trash icon and open the confirm
			modal window.
		</p>
		<img
			class="example"
			src="../../../assets/svg/task-delete.svg"
			alt="Delete task"
		/>
	</article>
</template>

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
		max-width: 20rem;
		height: auto;
		margin: 0.5rem auto;
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
