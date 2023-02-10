<template>
	<div class="wrapper">
		<button class="icon" @click="toggleDrawer()">
			<AppSVGIcon icon="chevronRight" />
		</button>
		<RouterLink
			class="avatar"
			:to="{
				name: 'project',
				params: { projectId: project?._id },
			}"
			v-for="project in projects"
			:key="project?._id"
		>
			<img :src="project?.cover" :alt="project?.projectName" />
		</RouterLink>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectStore } from '../../../stores/project'
import AppSVGIcon from '../../AppSVGIcon.vue'

const emit = defineEmits(['toggleDrawer'])
const toggleDrawer = () => {
	emit('toggleDrawer')
}

const projectStore = useProjectStore()
const projects = computed(() => {
	return projectStore.projects
})
</script>

<style scoped lang="scss">
.wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 0.5rem;

	background: linear-gradient(to bottom, $bg-board-navbar, transparent);
	width: 1.75rem;
	height: 92vh;
	padding-top: 0.5rem;

	.icon {
		align-self: flex-end;
	}

	.avatar {
		display: none;

		img {
			width: 2.25rem;
			height: 2.25rem;
			border-radius: $radius-sm;
			object-fit: cover;
		}
	}
}

@media screen and (min-width: $media-xs) {
	.wrapper {
		width: 2.75rem;
		.avatar {
			display: block;
		}
	}
}
</style>
