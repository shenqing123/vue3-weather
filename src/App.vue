<template>
  <div class="flex flex-col bg-main-blue min-h-screen">
    <Suspense>
      <Header></Header>
    </Suspense>
    <div class="text-white">
      <Suspense>
        <router-view></router-view>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import Header from '../src/components/Header/index.vue'
</script>

<style scoped>
</style>
