<template>
    <div>
        <div class="bg-dark-blue py-2 text-center">你正在预览{{ city }}的天气信息<span v-show="store.isShowPlus">，可以通过右上角的"+"号按钮保存起来</span></div>
        <div class="container flex flex-col gap-4 text-center mt-6">
            <div>当日气温是：{{ temperature }}摄氏度</div>
            <div>当日天气是：{{ weather }}</div>
            <div>当日风向是：{{ winddirection }}风</div>
            <div>当日风力是：{{ windpower }}级</div>
        </div>
        <hr class="mt-6 border-white border-opacity-10">
    </div>
</template>

<script setup>
import { useWeatherStore } from '../../store';
import { getCityWeather } from '../../api';
const store = useWeatherStore()
const route = useRoute()
const {city, adcode} = route.query
const res = await getCityWeather(adcode, 'base')
const {temperature, weather, windpower, winddirection} = res.lives[0]
</script>

<style lang="scss" scoped>

</style>
