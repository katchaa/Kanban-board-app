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
							<label for="username" class="text-gray-400"
								>Old password
							</label>

							<input
								type="password"
								placeholder="Username"
								id="username"
								class="w-full focus:outline-none p-1 text-black"
								v-model="passwordData.oldPassword"
							/>
							<!-- <span
								class="text-xs text-red-500 self-start -mt-2"
								v-for="error in v$.username.$errors"
								:key="error.$uid"
							>
								{{ error.$message }}
							</span> -->
						</div>
						<div>
							<label for="firstName" class="text-gray-400"
								>New password
							</label>

							<input
								type="password"
								placeholder="New password"
								id="firstName"
								class="w-full focus:outline-none p-1 text-black"
								v-model="passwordData.newPassword"
							/>
							<!-- <span
								class="text-xs text-red-500 self-start -mt-2"
								v-for="error in v$.firstName.$errors"
								:key="error.$uid"
							>
								{{ error.$message }}
							</span> -->
						</div>
						<div class="self-end -mb-2 -mr-1">
							<button
								class="px-2 py-1 rounded-md hover:bg-gray-300/50 transition duration-200"
							>
								Save
							</button>
						</div>
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
import { reactive } from 'vue'

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
})

const editPassword = () => {
	console.log(passwordData.newPassword)
	emit('closeModal')
}
</script>
