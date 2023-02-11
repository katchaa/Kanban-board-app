<template>
	<AppModal :show="props.show">
		<section class="card">
			<form novalidate @submit.prevent="editPassword()">
				<label for="newPassword">Old password </label>

				<input
					type="password"
					id="oldPassword"
					v-model="passwordData.oldPassword"
				/>
				<span
					class="error-msg"
					v-for="error in v$.oldPassword.$errors"
					:key="error.$uid"
				>
					{{ error.$message }}
				</span>
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
					v-model="passwordData.confirmPassword"
				/>
				<span
					class="error-msg"
					v-for="error in v$.confirmPassword.$errors"
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
})

const emit = defineEmits(['closeModal'])

const closeModal = () => {
	emit('closeModal')
}

// Passwords data
const passwordData = reactive({
	oldPassword: '',
	newPassword: '',
	confirmPassword: '',
})

// Validation settings
const rules = computed(() => {
	return {
		oldPassword: {
			required: helpers.withMessage('Old password is required', required),
		},
		newPassword: {
			required: helpers.withMessage('New password is required', required),
			sameAs: helpers.withMessage(
				"New password can't be your old password",
				not(sameAs(passwordData.oldPassword))
			),
		},
		confirmPassword: {
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
		await authStore.changePassword(passwordData)
		emit('closeModal')
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/modalCard.scss';
</style>
