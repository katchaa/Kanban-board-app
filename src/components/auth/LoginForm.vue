<template>
	<section
		class="bg-gray-100 w-72 relative flex flex-col items-center mx-auto mt-16 shrink-0 py-2 px-4 rounded-md shadow-md h-fit"
	>
		<h3 class="font-semibold text-2xl text-gray-700 select-none my-2">
			Login
		</h3>
		<form class="w-full flex flex-col items-center gap-3 my-2">
			<input
				type="email"
				placeholder="Your email"
				class="w-full focus:outline-none p-1 rounded-sm"
			/>
			<input
				type="password"
				placeholder="Password"
				class="w-full focus:outline-none p-1 rounded-sm"
			/>
			<button
				type="submit"
				class="self-end py-0.5 px-1.5 rounded-md hover:bg-gray-200 transition duration-200"
			>
				Login
			</button>
		</form>
		<p class="text-xs mb-1 text-gray-400">
			Don't have an account?
			<span class="hover:text-black hover:underline cursor-pointer">
				Register here
			</span>
		</p>
	</section>
</template>

<script setup></script>
