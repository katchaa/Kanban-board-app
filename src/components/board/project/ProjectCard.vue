<template>
	<section
		class="bg-gray-100 w-72 relative flex flex-col shrink-0 px-2 rounded-md mt-2 shadow-md h-fit"
	>
		<!-- Card title -->
		<div class="flex justify-between p-2">
			<h3 class="font-semibold text-gray-700 select-none">Card title</h3>
			<i class="fa-solid fa-ellipsis text-gray-400 cursor-pointer"></i>
		</div>
		<ProjectTask />
		<AddNewTask />
	</section>
	<section
		class="bg-gray-100 w-72 relative flex flex-col shrink-0 px-2 rounded-md mt-2 shadow-md h-fit"
	>
		<!-- Card title -->
		<div class="flex justify-between p-2">
			<h3 class="font-semibold text-gray-700 select-none">Card title</h3>
			<i class="fa-solid fa-ellipsis text-gray-400 cursor-pointer"></i>
		</div>
		<ProjectTask />
		<AddNewTask />
	</section>
</template>

<script setup>
import ProjectTask from './ProjectTask.vue'
import AddNewTask from './AddNewTask.vue'
</script>
