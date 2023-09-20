<template>
    <div class="flex flex-col bg-main-blue min-h-screen">
        <Suspense>
            <Header :res="res" :isShowPlus="isShowPlus" @addCity="addCity"></Header>
        </Suspense>
        <div class="text-white">
            <Suspense>
                <router-view ></router-view>
            </Suspense>
        </div>
  </div>
</template>

<script setup>
import Header from '../../components/Header/index.vue'
import {getLocalCity, getCityWeather} from '../../api/index'
import { useWeatherStore } from '../../store';
const route = useRoute()
const { adcode} = await getLocalCity()
const res = await getCityWeather(adcode, 'base')
const store = useWeatherStore()
store.setLocalAdcode(adcode)
let isShowPlus = ref(false)
function addCity () {
    const adcode = route.query.adcode
    store.addCity(adcode)
    isShowPlus.value = false
}
function checkRoute (route) {
    let code = adcode
    // 详情页
    if (route.query.adcode) {
        code = route.query.adcode
        const haveCity = store.savedCities.includes(code)
        // 展示加号
        if (!haveCity) isShowPlus.value = true
    } 
    // 获取4天天气预报
    store.setCasts(code)
}
checkRoute(route)
watch(route,  (newval)=>{
    // 根据路由不同获取不同的天气预报和判断是否展示加号
   checkRoute(newval)
})
</script>

<style lang="scss" scoped>

</style>