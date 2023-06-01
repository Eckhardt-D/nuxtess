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
  <Teleport to="body">
    <div v-if="flash.show"
      class="border rounded w-80 text-center p-4 shadow text-white fixed bottom-2 left-1/2 -translate-x-1/2"
      :class="[backgroundColorMap[flash.variant], borderColorMap[flash.variant]]">
      {{ flash.message }}
    </div>
  </Teleport>
</template>