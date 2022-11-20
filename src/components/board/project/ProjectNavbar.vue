<template>
	<nav class="navbar">
		<div class="project-menu">
			<button class="project-title" @click="togglePopup">
				<p>
					{{ project?.projectName }}
				</p>
				<button class="icon">
					<AppSVGIcon icon="chevronDown" />
				</button>
			</button>
			<AppPopup
				:show="showPopup"
				@edit-mode="toggleEditModal()"
				@delete-mode="toggleDeleteModal()"
			/>
			<EditProjectModal
				:show="editModal"
				@close-edit-modal="toggleEditModal()"
			/>
			<DeleteModal
				type="project"
				:id="project?.id"
				:show="deleteModal"
				@close-delete-modal="toggleDeleteModal()"
			>
				Are you sure to delete {{ project?.projectName }}?
			</DeleteModal>
		</div>
		<span class="divider">|</span>
		<div class="company-title">
			<p class="title">
				{{ project?.companyName }}
			</p>
		</div>
		<!-- Showing new card modal form -->
		<AppIconButton
			icon="addSmall"
			tooltip="Add card"
			size="7"
			@click="toggleNewCardModal()"
		/>
		<NewCardModal
			:show="showNewCardModal"
			@close-modal="toggleNewCardModal()"
		/>
	</nav>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../../stores/project'
import AppIconButton from '../../AppIconButton.vue'
import NewCardModal from '@/components/board/modals/NewCardModal.vue'
import AppPopup from '../../AppPopup.vue'
import DeleteModal from '../modals/DeleteModal.vue'
import EditProjectModal from '../modals/EditProjectModal.vue'
import { findById } from '../../../helpers/project'
import AppSVGIcon from '../../AppSVGIcon.vue'

const projectStore = useProjectStore()
const route = useRoute()
const project = computed(() => {
	return findById(projectStore.projects, route.params.projectId)
})

// Add new card modal
const showNewCardModal = ref(false)
const toggleNewCardModal = () => {
	showNewCardModal.value = !showNewCardModal.value
}

// Toggle popup
const showPopup = ref(false)
const togglePopup = () => {
	showPopup.value = !showPopup.value
}

// Delete modal
const deleteModal = ref(false)
const toggleDeleteModal = () => {
	deleteModal.value = !deleteModal.value
	showPopup.value = false
}

// Edit modal
const editModal = ref(false)
const toggleEditModal = () => {
	editModal.value = !editModal.value
	showPopup.value = false
}
</script>

<style scoped lang="scss">
.navbar {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 0.5rem;
	margin-left: 0.25rem;
	margin-top: 0.25rem;

	.project-menu {
		position: relative;
		max-width: 60%;

		.project-title {
			display: flex;
			align-items: center;
			max-width: 100%;

			p {
				color: #fff;
				font-size: 1.1rem;
				font-weight: 600;
				text-transform: capitalize;
				text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.icon {
				margin-top: 0.2rem;
				margin-left: 0.25rem;
				cursor: pointer;
			}
		}
	}
	.divider {
		display: none;
		color: rgba(255, 255, 255, 0.6);
		font-size: $lg;
		align-self: flex-start;
	}

	.company-title {
		display: none;
		background-color: $bg-user-tab;
		border-radius: $radius;
		height: 100%;

		.title {
			color: #fff;
			padding: 0 0.5rem;
		}
	}
}

@media screen and (min-width: $media-sm) {
	.navbar {
		.divider {
			display: block;
		}
		.company-title {
			display: flex;
			align-items: center;
		}
	}
}
</style>
