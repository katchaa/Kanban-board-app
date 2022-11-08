<template>
	<Transition name="popup">
		<div
			class="flex flex-col gap-1 absolute top-5 right-36 z-20 bg-gray-300/90 rounded-md"
			v-if="props.show"
		>
			<button
				class="flex justify-between items-center text-sm px-2 pt-1 pb-0.5 rounded-t-md hover:bg-gray-400/50 transition-all duration-300"
				@click="editProfile()"
			>
				Edit profile
			</button>
			<button
				class="flex justify-between items-center text-sm px-2 pt-1 pb-0.5 hover:bg-gray-400/50 transition-all duration-300"
				@click="editPassword()"
			>
				Change password
			</button>

			<button
				class="flex justify-between items-center text-sm px-2 pb-1 pt-0.5 rounded-b-md hover:bg-gray-400/50 transition-all duration-300"
				@click="deleteAccount()"
			>
				Delete account
			</button>
		</div>
	</Transition>
</template>

<script setup>
const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
})

const emit = defineEmits([
	'closePopup',
	'editProfile',
	'changePassword',
	'deleteAccount',
])

const editProfile = () => {
	emit('editProfile')
	emit('closePopup')
}

const editPassword = () => {
	emit('changePassword')
	emit('closePopup')
}

const deleteAccount = () => {
	emit('deleteAccount')
	emit('closePopup')
}
</script>
