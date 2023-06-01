<script lang="ts" setup>
const route = useRoute();
const menuItems = [
  {
    href: '/profile',
    title: 'Personal Details'
  },
  {
    href: '/profile/security',
    title: 'Security'
  },
  {
    href: '/profile/account',
    title: 'Account'
  },
]
</script>

<template>
  <div>
    <nx-navigation />
    <main class="flex gap-24 p-10">
      <aside class="w-72">
        <ul class="rounded-md">
          <li v-for="item in menuItems" :key="item.href" :class="item.href === $route.path && 'border border-black'"
            class="p-3 shadow-sm rounded-md font-medium mb-5 bg-purple-500 text-white cursor-pointer"
            @click="$router.push(item.href)">
            {{ item.title }}
          </li>
        </ul>
      </aside>
      <section class="flex-grow">
        <slot />
      </section>
    </main>
  </div>
</template>