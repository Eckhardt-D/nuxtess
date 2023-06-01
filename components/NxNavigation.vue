<script lang="ts" setup>
const { user, logout } = useUser();
</script>

<template>
  <nav class="h-16 px-10 flex items-center justify-between">
    <div>
      <a href="/" class="font-bold">Nuxtess</a>
    </div>
    <div>
      <ul class="flex gap-5 items-center justify-end">
        <li class="font-medium">
          <nuxt-link to="/">
            Home
          </nuxt-link>
        </li>
        <li class="font-medium">
          <nuxt-link to="/profile">
            Profile
          </nuxt-link>
        </li>
        <li class="font-medium">
          <nuxt-link v-if="!user" to="/auth/login">
            Login
          </nuxt-link>
          <a v-else href="#" @click="logout">
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>