<template>
    <Suspense>
        <asyncMain></asyncMain>
        <template #fallback>
            <div class="text-center">数据加载中</div>
        </template>
    </Suspense>
</template>

<script setup>
import asyncMain from './asyncMain.vue';
</script>

<style lang="scss" scoped>

</style>