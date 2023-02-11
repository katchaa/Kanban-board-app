<template>
	<AppModal :show="props.show">
		<section class="card">
			<form novalidate @submit.prevent="editUser()">
				<label for="username">Username </label>

				<input
					type="text"
					placeholder="Username"
					id="username"
					v-model="userData.username"
				/>
				<span
					class="error-msg"
					v-for="error in v$.username.$errors"
					:key="error.$uid"
				>
					{{ error.$message }}
				</span>
				<label for="firstName">First name </label>

				<input
					type="text"
					placeholder="First name"
					id="firstName"
					v-model="userData.firstName"
				/>
				<span
					class="error-msg"
					v-for="error in v$.firstName.$errors"
					:key="error.$uid"
				>
					{{ error.$message }}
				</span>
				<label for="lastName">Last name </label>

				<input
					type="text"
					placeholder="Last name"
					id="lastName"
					v-model="userData.lastName"
				/>
				<span
					class="error-msg"
					v-for="error in v$.lastName.$errors"
					:key="error.$uid"
				>
					{{ error.$message }}
				</span>
				<AppButton class="btn">Save</AppButton>
			</form>
			<button class="x-mark" @click="closeModal()">
				<AppSVGIcon icon="xmark" />
			</button>
		</section>
	</AppModal>
</template>

<script setup>
import { computed, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../../../stores/auth'
import AppButton from '../../AppButton.vue'
import AppSVGIcon from '../../AppSVGIcon.vue'
import AppModal from '../../AppModal.vue'
import { useProjectStore } from '../../../stores/project'

const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
})

const projectStore = useProjectStore()
const user = computed(() => projectStore.user)
// Edit user data
let userData = reactive({
	username: user.value.username,
	firstName: user.value.firstName,
	lastName: user.value.lastName,
})
// Validation settings
const rules = computed(() => {
	return {
		username: {
			required: helpers.withMessage('Username is required', required),
		},
		firstName: {
			required: helpers.withMessage('First name is required', required),
		},
		lastName: {
			required: helpers.withMessage('Last name is required', required),
		},
	}
})
const v$ = useVuelidate(rules, userData)

// Emit to close modal
const emit = defineEmits(['closeModal'])
const closeModal = () => {
	emit('closeModal')
}

// Edit user action
const authStore = useAuthStore()
const editUser = async () => {
	const result = await v$.value.$validate()
	const newUser = reactive({
		username: userData.username,
		firstName: userData.firstName,
		lastName: userData.lastName,
	})
	if (result) {
		authStore.editUser(newUser).then(() => projectStore.fetchUser())
		emit('closeModal')
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/modalCard.scss';
</style>
