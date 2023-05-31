<script lang="ts" setup>
const message = ref('Welcome to Nuxtess!')
</script>

<template>
  <div class="text-center py-16">
    <h1 class="text-5xl font-bold">{{ message }}</h1>
    <nx-button class="mt-7">
      Read the docs
    </nx-button>
  </div>
</template>