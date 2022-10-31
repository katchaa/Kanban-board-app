<template>
	<div class="h-[94%] px-2.5 overflow-x-auto">
		<ProjectNavbar />
		<div class="flex gap-3">
			<ProjectCard />
		</div>
	</div>
</template>

<script setup>
import ProjectNavbar from '../../components/board/project/ProjectNavbar.vue'
import ProjectCard from '../../components/board/project/ProjectCard.vue'
</script>
