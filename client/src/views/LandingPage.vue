<template>
	<div class="container">
		<header>
			<section class="social">
				<a href="https://www.instagram.com/k.atchaa/" target="_blank">
					<img src="../assets/svg/social/insta.svg" alt="Instagram" />
				</a>

				<a
					href="http://www.linkedin.com/in/kateřina-kratochvílová"
					target="_blank"
				>
					<img src="../assets/svg/social/li.svg" alt="LinkedIn" />
				</a>

				<a href="https://github.com/katchaa" target="_blank">
					<img src="../assets/svg/social/github.svg" alt="GitHub" />
				</a>
			</section>
			<RouterLink class="btn" :to="{ name: 'auth' }">
				Try it!
			</RouterLink>
		</header>
		<main>
			<h1>Hello!!</h1>
			<p class="intro">
				Hi, call me Katcha. I'm junior front-end developer and this is
				my first larger web application inspired by Trello.
			</p>
			<div class="content">
				<article class="info">
					<p>
						After simple registration you'll be redirected to your
						personal board, where you can create or edit your
						projects, cards and tasks. More information you can find
						in the Info section, the link to it is in the main
						navigation bar.
					</p>
					<div class="divider"></div>
					<p>
						On user page you can edit your personal data, change
						your password or delete account. After logout you can
						login again with your email and password.
					</p>
					<div class="divider"></div>

					<p>
						Avatars for projects and users are chosen randomly from
						<a href="https://picsum.photos/">Lorem Picsum</a>
						webpage. SVG icons are used from
						<a href="https://heroicons.com/">Heroicons</a>, social
						icons and illustrations are made in Adobe Illustrator.
					</p>
				</article>
				<aside class="stack">
					<h3>Technologies:</h3>
					<ul>
						<li>Vue.js 3</li>
						<li>Pinia</li>
						<li>Vite</li>
						<li>Vuelidate</li>
						<li>SASS</li>
						<li>Adobe Illustrator</li>
						<li>Axios</li>
						<li>Express.js</li>
						<li>MongoDB</li>
					</ul>
					<p>
						Don't forget run <span>npm run dev</span> in second
						terminal to start Express server and MongoDB.
					</p>
				</aside>
			</div>

			<RouterLink class="btn" :to="{ name: 'auth' }">
				Try it!
			</RouterLink>
		</main>
	</div>
</template>
<script setup></script>

<style scoped lang="scss">
.container {
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
		gap: 1rem;
		.social {
			display: flex;
			justify-content: center;
			align-items: flex-end;
			gap: 0.5rem;
			a {
				cursor: pointer;
				img {
					width: $lg;
				}
			}
		}
		.btn {
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
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 1.5rem;
		h1 {
			align-self: flex-start;
			font-size: clamp(3rem, 10vw, 6rem);
			text-transform: uppercase;
			font-family: 'Courier New', Courier, monospace;
			letter-spacing: 3px;
			color: transparentize(#fff, 0.4);
		}
		.intro {
			max-width: 25rem;
			margin: 0.5rem auto 1rem auto;
			text-align: center;
		}
		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
			margin: 0.5rem -0.5rem;

			.stack {
				background: linear-gradient(
					to right,
					transparent,
					$bg-user-tab
				);
				border-radius: $radius;
				padding: 0.7rem 1rem;
				max-width: 20rem;
				h3 {
					text-decoration: underline;
				}
				ul > li {
					font-size: $sm;
					list-style: circle;
					list-style-position: inside;
				}
				p {
					margin: 0.3rem 0 1rem 0;
					font-size: $xs;
					span {
						font-size: $xs;
						font-family: 'Courier New', Courier, monospace;
						color: $text-dark;
					}
				}
			}
			.info {
				background: linear-gradient(
					to right,
					$bg-user-tab,
					transparent
				);
				border-radius: $radius;
				padding: 0.7rem 1rem;
				margin: 0 -0.7rem;
				p {
					max-width: 25rem;
					text-align: justify;
					font-size: $sm;

					a {
						font-size: $sm;
						font-weight: 600;
						&:hover {
							color: $text-hover;
							text-decoration: underline;
						}
					}
				}
				.divider {
					width: 100%;
					height: 0.1rem;
					margin: 0.3rem 0;
					background: linear-gradient(
						to right,
						transparent,
						$bg-user-tab
					);
					border-radius: 50%;
				}
			}
		}

		.btn {
			background-color: $bg-user-tab;
			padding: 0.4rem 0.8rem;
			border-radius: $radius-sm;

			font-size: $lg;
			font-weight: 600;
			text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
			box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.2);
			text-transform: capitalize;
			transition: 200ms;

			&:hover {
				background-color: rgba(255, 255, 255, 0.8);
			}
		}
	}
}

@media screen and (min-width: $media-sm) {
	header {
		.btn {
			padding: 0.4rem 0.7rem;
			font-size: $md;
		}
	}
}

@media screen and (min-width: $media-md) {
	.container {
		max-width: 90%;
		margin: 0 auto;
	}
}

@media screen and (min-width: $media-lg) {
	.container {
		main {
			.intro {
				font-size: $lg;
			}
			.content {
				margin-top: 2rem;
				flex-direction: row;
				gap: 2rem;

				.stack {
					background: linear-gradient(
						to right,
						transparent,
						$bg-user-tab
					);
				}

				.info {
					background: linear-gradient(
						to right,
						$bg-user-tab,
						transparent
					);
				}
			}

			.btn {
				margin-top: 3rem;
				font-size: $xxl;
			}
		}
	}
}

@media screen and (min-width: $media-xl) {
	.container {
		max-width: 60%;
	}
}
</style>
