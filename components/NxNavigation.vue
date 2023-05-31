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
          <nuxt-link to="/">
            Profile
          </nuxt-link>
        </li>
        <li class="font-medium">
          <nuxt-link to="/">
            Login
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>