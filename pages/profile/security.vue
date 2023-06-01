<script lang="ts" setup>
const { user, enableTwoFactorAuth, disableTwoFactorAuth, getTwoFactorAuthSettings } = useUser();

definePageMeta({
  layout: "profile"
});

const { data: twoFactorSettings } = await useAsyncData("twoFactorSettings", async () => getTwoFactorAuthSettings())

const passwordDetails = reactive({
  currentPassword: "",
  newPassword: "",
});

const otp = ref('');

const enable2FA = async () => {
  const updated = await enableTwoFactorAuth(otp.value);
  if (updated) {
    twoFactorSettings.value = updated;
  }
}

const disable2FA = async () => {
  const updated = await disableTwoFactorAuth();
  if (updated) {
    twoFactorSettings.value = updated;
  }
}
</script>

<template>
  <div>
    <div class="w-96">
      <nx-flash class="mb-10" />
    </div>


    <form class=" w-96" @submit.prevent>
      <h2 class="text-2xl font-medium mb-3">Security settings</h2>
      <p>Here you can update your password and set up 2FA. Currently only the authenticator app method is supported.</p>

      <section class="flex flex-col mt-10">
        <h2 class="mb-3 text-xl">Update your password</h2>
        <label class="text-sm" for="current-password">Current password</label>
        <input v-model="passwordDetails.currentPassword" class="p-2 rounded border border-slate-400" type="text"
          name="current-password" id="current-password" placeholder="Enter your current password" required>
      </section>

      <section class="flex flex-col mt-5">
        <label class="text-sm" for="email">New password</label>
        <input v-model="passwordDetails.newPassword" class="p-2 rounded border border-slate-400" type="new-password"
          name="new-password" id="new-password" placeholder="New password" required>
      </section>

      <nx-button class="mt-5">Update</nx-button>

    </form>

    <form v-if="twoFactorSettings?.enabled === false" class=" w-96" @submit.prevent>
      <section class="flex flex-col mt-10">
        <h2 class="mb-3 text-xl">Set up Two Factor Authentication</h2>
        <p class="mb-5">Scan the QR code with your favorite authenticator app to enable.</p>
        <img width="166" height="166" :src="twoFactorSettings?.qr" alt="2FA QR Code">
      </section>

      <section class="flex flex-col mt-5">
        <label class="text-sm" for="email">Or copy the code below</label>
        <input :value="twoFactorSettings?.secret" class="p-2 rounded border border-slate-400" disabled>
      </section>

      <section class="flex flex-col mt-5">
        <label class="text-sm" for="email">Then enter your OTP here</label>
        <input v-model="otp" class="p-2 rounded border border-slate-400" placeholder="123456">
      </section>

      <nx-button class="mt-5" @click="enable2FA">Enable</nx-button>

      <nx-flash />
    </form>

    <form v-else class="w-96" @submit.prevent>
      <section class="flex flex-col mt-10">
        <h2 class="mb-3 text-xl">Two Factor Authentication is enabled</h2>
      </section>
      <nx-button class="mt-5" @click="disable2FA">Disable</nx-button>
    </form>
  </div>
</template>