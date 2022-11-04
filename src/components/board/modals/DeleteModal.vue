<template>
	<Teleport to="body">
		<article
			class="absolute left-0 top-0 z-10 w-full h-screen bg-black/40 flex justify-center items-start pt-36"
		>
			<div class="bg-gray-100 w-64 p-2 text-center rounded-md">
				<p class="text-xl font-semibold py-2">
					<slot></slot>
				</p>
				<div class="flex justify-around">
					<button
						class="font-semibold mt-1 py-0.5 px-1.5 rounded-md hover:bg-gray-200 transition duration-200"
						@click="deleteCurr()"
					>
						Delete
					</button>
					<button
						class="font-semibold text-gray-400 mt-1 py-0.5 px-1.5 rounded-md hover:bg-gray-200 hover:text-black transition duration-200"
						@click="cancelDelete()"
					>
						Cancel
					</button>
				</div>
			</div>
		</article>
	</Teleport>
</template>

<script setup></script>
