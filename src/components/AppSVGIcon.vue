<template>
	<!-- Home -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2.2"
		stroke="currentColor"
		class="white-md"
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
		class="white-md"
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
		class="white-md"
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
		class="white-sm"
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
		class="gray-md"
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
		class="gray-md"
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
		class="white-xs"
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
		class="white-xs-hover"
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
		class="white-xs-hover"
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
		class="gray-md"
		v-if="props.icon === 'ellipsis'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
		/>
	</svg>

	<!-- Trash -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="gray-sm"
		v-if="props.icon === 'trash'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
		/>
	</svg>

	<!-- X mark circle -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		class="gray-md"
		v-if="props.icon === 'xmark'"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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

<style scoped lang="scss">
.white-md {
	width: 1.75rem;
	height: 1.75rem;
}

.white-sm {
	width: 1.5rem;
	height: 1.5rem;
}

.white-xs {
	width: 1.25rem;
	height: 1.25rem;
}

.white-xs-hover {
	width: 1.25rem;
	height: 1.25rem;
	stroke: rgba(255, 255, 255, 0.5);
	transition: 200ms;

	&:hover {
		stroke: #fff;
	}
}

.gray-md {
	width: 1.25rem;
	height: 1.25rem;
	stroke: lighten($text-muted, 20%);
	transition: 200ms;

	&:hover {
		stroke: $text-muted;
	}
}
.gray-sm {
	width: 1rem;
	height: 1rem;
	stroke: lighten($text-muted, 20%);
	transition: 200ms;

	&:hover {
		stroke: $text-muted;
	}
}
</style>
