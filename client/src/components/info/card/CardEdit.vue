<template>
	<article>
		<h2 class="title">Edit card</h2>
		<p class="content">
			For editing your cards double click on card title, retype title and
			save it on click outside the title.
		</p>
		<img
			class="example"
			src="../../../assets/svg/card.svg"
			alt="Edit card"
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
