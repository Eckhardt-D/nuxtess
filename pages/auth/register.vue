<script lang="ts" setup>
const flash = useFlash();
const user = useUser();
const registerForm = ref<null | HTMLFormElement>(null);

const credentials = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
});

const register = async () => {
  if (registerForm.value === null) return;

  if (registerForm.value.checkValidity()) {
    await user.register({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      passwordConfirm: credentials.passwordConfirm
    });

    credentials.name = '';
    credentials.email = '';
    credentials.password = '';
    credentials.passwordConfirm = '';
  }
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <form ref="registerForm" class="p-5 mt-5" @submit.prevent>
      <h1 class="text-3xl font-bold text-center mb-5">Create an account</h1>
      <p>Already have an account? <nuxt-link class="text-blue-500" to="/auth/login">Login</nuxt-link></p>
      <section class="flex flex-col mt-5">
        <label class="text-sm" for="name">Full name</label>
        <input v-model="credentials.name" class="p-2 rounded border border-slate-400" type="text" name="name"
          id="name" placeholder="Full name" required>
      </section>
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
        <label class="text-sm" for="password-confirm">Confirm password</label>
        <input v-model="credentials.passwordConfirm" class="p-2 rounded border border-slate-400" type="password" name="password-confirm"
          id="password-confirm" placeholder="Password" required>
      </section>
      <section class="flex flex-col mt-5">
        <nx-button @click="register">Register</nx-button>
      </section>
      <section class="mt-5">
        <nx-flash />
      </section>
    </form>
  </div>
</template>