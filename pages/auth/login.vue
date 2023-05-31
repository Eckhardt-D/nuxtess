<script lang="ts" setup>
const flash = useFlash();
const user = useUser();
const loginForm = ref<null | HTMLFormElement>(null);

const credentials = reactive({
  email: '',
  password: '',
});

const login = async () => {
  if (loginForm.value === null) return;

  if (loginForm.value.checkValidity()) {
    await user.login({
      email: credentials.email,
      password: credentials.password,
    });

    credentials.email = '';
    credentials.password = '';
  }
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <form ref="loginForm" class="p-5 mt-5" @submit.prevent>
      <h1 class="text-3xl font-bold text-center mb-5">Login to your account</h1>
      <section class="flex flex-col mt-5">
        <label class="text-sm" for="email">Email address</label>
        <input v-model="credentials.email" class="p-2 rounded border border-slate-400" type="email" name="email"
          id="email" placeholder="Email address" required>
      </section>
      <section class="flex flex-col mt-5">
        <label class="text-sm" for="password">Password</label>
        <input v-model="credentials.password" class="p-2 rounded border border-slate-400" type="password" name="password"
          id="password" placeholder="Password" required>
      </section>
      <section class="flex flex-col mt-5">
        <nx-button @click="login">Login</nx-button>
      </section>
      <section class="mt-5">
        <nx-flash />
      </section>
    </form>
  </div>
</template>