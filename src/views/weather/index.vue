<template>
    <div class="flex flex-col bg-main-blue min-h-screen">
        <Suspense>
            <Header :res="res" :isShowPlus="isShowPlus" @addCity="addCity"></Header>
                <template #fallback>
                    <div class="text-center text-white">数据加载中</div>
                </template>
         </Suspense>
        
        <div class="text-white">
            <router-view ></router-view>
        </div>
  </div>
</template>

<script setup>
import Header from '../../components/Header/index.vue'

</script>

<style lang="scss" scoped>

</style>