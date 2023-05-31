<script lang="ts" setup>
const { flash } = useFlash();

const backgroundColorMap = computed(() => {
  return {
    "success": "bg-green-300",
    "error": "bg-red-300",
    "info": "bg-slate-300"
  }
});

const borderColorMap = computed(() => {
  return {
    "success": "bg-green-500",
    "error": "bg-red-500",
    "info": "bg-slate-500"
  }
});
</script>

<template>
  <div v-if="flash.show" class="border rounded w-full p-4 shadow text-white"
    :class="[backgroundColorMap[flash.variant], borderColorMap[flash.variant]]">
    {{ flash.message }}
  </div>
</template>