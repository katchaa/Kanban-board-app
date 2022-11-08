<template>
	<!-- Home -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.2"
		stroke="currentColor"
		class="w-7 h-7 text-white"
		v-if="props.icon === 'home'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
		/>
	</svg>

	<!-- Info -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.2"
		stroke="currentColor"
		class="w-7 h-7 text-white"
		v-if="props.icon === 'info'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
		/>
	</svg>

	<!-- Add -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.5"
		stroke="currentColor"
		class="w-7 h-7 text-white"
		v-if="props.icon === 'add'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 4.5v15m7.5-7.5h-15"
		/>
	</svg>

	<!-- Add small -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.5"
		stroke="currentColor"
		class="w-6 h-6 text-white"
		v-if="props.icon === 'addSmall'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 4.5v15m7.5-7.5h-15"
		/>
	</svg>

	<!-- Add gray -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.5"
		stroke="currentColor"
		class="w-5 h-5 text-gray-400 hover:text-gray-600 transition duration-200"
		v-if="props.icon === 'addGray'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 4.5v15m7.5-7.5h-15"
		/>
	</svg>

	<!-- Minus -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-5 h-5 text-gray-400 hover:text-gray-600 transition duration-200"
		v-if="props.icon == 'minus'"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
	</svg>

	<!-- Chevron down -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.8"
		stroke="currentColor"
		class="w-5 h-5 text-white"
		v-if="props.icon === 'chevronDown'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M19.5 8.25l-7.5 7.5-7.5-7.5"
		/>
	</svg>

	<!-- Chevron left -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.5"
		stroke="currentColor"
		class="w-5 h-5 text-white/50 hover:text-white transition duration-200"
		v-if="props.icon === 'chevronLeft'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M15.75 19.5L8.25 12l7.5-7.5"
		/>
	</svg>

	<!-- Chevron right -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.5"
		stroke="currentColor"
		class="w-5 h-5 text-white/50 hover:text-white transition duration-200"
		v-if="props.icon === 'chevronRight'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M8.25 4.5l7.5 7.5-7.5 7.5"
		/>
	</svg>

	<!-- Ellipsis -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.4"
		stroke="currentColor"
		class="w-5 h-5 -mr-1 -mt-1 text-gray-400 hover:text-gray-600 transition duration-200"
		v-if="props.icon === 'ellipsis'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
		/>
	</svg>
</template>

<script setup>
const props = defineProps({
	icon: {
		type: String,
		required: true,
	},
})
</script>
