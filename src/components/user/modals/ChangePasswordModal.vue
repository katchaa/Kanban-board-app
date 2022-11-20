<template>
	<AppModal :show="props.show">
		<section class="card">
			<form novalidate @submit.prevent="editPassword()">
				<label for="newPassword">New password </label>

				<input
					type="password"
					id="newPassword"
					v-model="passwordData.newPassword"
				/>
				<span
					class="error-msg"
					v-for="error in v$.newPassword.$errors"
					:key="error.$uid"
				>
					{{ error.$message }}
				</span>
				<label for="confirmPassword">Confirm password </label>

				<input
					type="password"
					id="confirmPassword"
					v-model="passwordData.confirmNewPassword"
				/>
				<span
					class="error-msg"
					v-for="error in v$.confirmNewPassword.$errors"
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
import useVuelidate from '@vuelidate/core'
import { required, sameAs, not, helpers } from '@vuelidate/validators'
import { computed, reactive } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import AppButton from '../../AppButton.vue'
import AppModal from '../../AppModal.vue'
import AppSVGIcon from '../../AppSVGIcon.vue'

const props = defineProps({
	show: {
		type: Boolean,
		required: true,
	},
	user: {
		type: Object,
		required: true,
	},
})

const emit = defineEmits(['closeModal'])

const closeModal = () => {
	emit('closeModal')
}

// Passwords data
const passwordData = reactive({
	oldPassword: props.user.password,
	newPassword: '',
	confirmNewPassword: '',
})

// Validation settings
const rules = computed(() => {
	return {
		newPassword: {
			required: helpers.withMessage('New password is required', required),
			sameAs: helpers.withMessage(
				"New password can't be your old password",
				not(sameAs(passwordData.oldPassword))
			),
		},
		confirmNewPassword: {
			required: helpers.withMessage(
				'Confirm password is required',
				required
			),
			sameAs: helpers.withMessage(
				"Passwords don't match",
				sameAs(passwordData.newPassword)
			),
		},
	}
})
const v$ = useVuelidate(rules, passwordData)

// Change password action
const authStore = useAuthStore()
const editPassword = async () => {
	const result = await v$.value.$validate()
	if (result) {
		await authStore.changePassword(props.user.id, passwordData.newPassword)
		emit('closeModal')
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/modalCard.scss';
</style>
