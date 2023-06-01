<script lang="ts" setup>
const { verifyTwoFactorCode } = useUser();
const otp = ref("");

const verify2FA = async () => {
  const isValid = await verifyTwoFactorCode(otp.value);
  if (isValid) {
    useRouter().push("/profile")
  }
}
</script>
<template>
  <form class="w-96 mx-auto mt-16" @submit.prevent>
    <h1 class="text-2xl text-center">Enter your 2FA code to continue</h1>
    <section class="flex flex-col mt-5  mx-auto">
      <label class="text-sm" for="email">Enter your code</label>
      <input v-model="otp" class="p-2 rounded border border-slate-400" placeholder="123456">
    </section>
    <nx-button class="mt-5" @click="verify2FA">Verify</nx-button>
    <nx-flash />
  </form>
</template>