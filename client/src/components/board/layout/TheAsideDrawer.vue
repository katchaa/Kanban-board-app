<template>
	<div class="wrapper">
		<button class="icon" @click="toggleDrawer()">
			<AppSVGIcon icon="chevronLeft" />
		</button>
		<RouterLink
			@click="toggleDrawer()"
			class="link"
			v-for="project in projects"
			:key="project?.id"
			:to="{
				name: 'project',
				params: { userId: project?.userId, projectId: project?.id },
			}"
		>
			<img :src="project?.avatar" :alt="project?.projectName" />
			<p class="title">
				{{ project?.projectName }}
			</p>
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
	position: absolute;
	z-index: 10;

	width: 15rem;
	height: 92vh;
	padding: 0.5rem 0.7rem 0 0.3rem;
	background: linear-gradient(to bottom, $bg-drawer, transparent);

	.icon {
		align-self: flex-end;
	}

	.link {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		padding: 0.3rem 0 0.3rem 0.25rem;
		margin-bottom: 0.2rem;
		cursor: pointer;
		transition: 300ms;

		&:hover {
			background-color: $bg-user-tab;
			border-radius: $radius;
		}

		img {
			width: 2.25rem;
			height: 2.25rem;
			border-radius: $radius-sm;
		}
		.title {
			font-size: $md;
			font-weight: 500;
			color: #fff;

			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>
