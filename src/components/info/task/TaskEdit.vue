<template>
	<article>
		<h2 class="title">Edit task</h2>
		<p class="content">
			For editing your tasks double click on task content, retype content
			and save it on click outside the task card. You can move your tasks
			between cards also.
		</p>
		<img
			class="example"
			src="../../../assets/svg/task-edit.svg"
			alt="Edit task"
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
		width: auto;
		height: 15rem;
		margin: 0.5rem 0;
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
		}
	}
}
</style>
