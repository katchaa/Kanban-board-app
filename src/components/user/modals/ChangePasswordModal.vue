<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				class="absolute left-0 top-0 z-10 w-full h-screen bg-black/40 flex justify-center items-start p-36"
				v-if="props.show"
			>
				<section
					class="w-64 bg-gray-100 px-3 py-4 rounded-lg shadow-lg"
				>
					<form
						novalidate
						@submit.prevent="editPassword()"
						class="w-full flex flex-col gap-2 my-2"
					>
						<div>
							<label for="newPassword" class="text-gray-400"
								>New password
							</label>

							<input
								type="password"
								id="newPassword"
								class="w-full focus:outline-none p-1 text-black"
								v-model="passwordData.newPassword"
							/>
							<span
								class="text-xs text-red-500 self-start -mt-2"
								v-for="error in v$.newPassword.$errors"
								:key="error.$uid"
							>
								{{ error.$message }}
							</span>
						</div>
						<div>
							<label for="confirmPassword" class="text-gray-400"
								>Confirm password
							</label>

							<input
								type="password"
								id="confirmPassword"
								class="w-full focus:outline-none p-1 text-black"
								v-model="passwordData.confirmNewPassword"
							/>
							<span
								class="text-xs text-red-500 self-start -mt-2"
								v-for="error in v$.confirmNewPassword.$errors"
								:key="error.$uid"
							>
								{{ error.$message }}
							</span>
						</div>
						<AppButton class="self-end -mb-2 -mr-1">Save</AppButton>
					</form>
				</section>
				<button
					class="relative right-6 top-0.5 text-lg text-gray-300 hover:text-gray-600 transition duration-200"
					@click="closeModal()"
				>
					<i class="fa-regular fa-circle-xmark"></i>
				</button>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import useVuelidate from '@vuelidate/core'
import { required, sameAs, not, helpers } from '@vuelidate/validators'
import { computed, reactive } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import AppButton from '../../AppButton.vue'

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
