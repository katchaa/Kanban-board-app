<template>
	<div
		class="flex flex-col gap-1 absolute top-6 -right-16 z-20 bg-gray-300/90 rounded-md"
	>
		<button
			class="flex justify-between items-center text-sm px-2 pt-1 pb-0.5 rounded-t-md hover:bg-gray-400/50 transition-all duration-300"
			@click="editMode()"
		>
			Edit
			<i id="edit" class="fa-regular fa-pen-to-square"></i>
		</button>

		<button
			class="flex justify-between items-center text-sm px-2 pb-1 pt-0.5 rounded-b-md hover:bg-gray-400/50 transition-all duration-300"
			@click="deleteMode()"
		>
			Delete
			<i class="fa-regular fa-trash-can text-sm ml-3"></i>
		</button>
	</div>
</template>

<script setup>
const emit = defineEmits(['editMode', 'deleteMode'])

const editMode = () => {
	emit('editMode')
}

const deleteMode = () => {
	emit('deleteMode')
}
</script>
