<script lang="ts" setup>
const { user, update } = useUser();

const profileUpdateForm = ref<HTMLFormElement | null>(null);

definePageMeta({
  layout: "profile"
})

const details = reactive({
  name: user.value?.name ?? "",
  email: user.value?.email ?? "",
});

const updateUserProfile = async () => {
  if (profileUpdateForm.value!.checkValidity()) {
    await update({
      email: details.email,
      name: details.name,
    })
  }
}
</script>

<template>
  <form ref="profileUpdateForm" class=" w-96" @submit.prevent>
    <h2 class="text-2xl font-medium mb-3">Personal Details</h2>
    <p>Update your name or email. When updating your email address - you will have to re-verify it.</p>
    <section class="flex flex-col mt-5">
      <label class="text-sm" for="name">Full name</label>
      <input v-model="details.name" class="p-2 rounded border border-slate-400" type="text" name="name" id="name"
        placeholder="Full name" required>
    </section>

    <section class="flex flex-col mt-5">
      <label class="text-sm" for="email">Email address</label>
      <input v-model="details.email" class="p-2 rounded border border-slate-400" type="email" name="email" id="email"
        placeholder="Email address" required>
    </section>

    <nx-button class="mt-5" @click="updateUserProfile">Update</nx-button>

    <nx-flash class="mt-3" />
  </form>
</template>