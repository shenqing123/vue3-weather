<template>
    <div class="flex flex-col gap-4 mt-4 container ">
        <Search @search="search" :cityList="cityList"></Search>
        <Suspense>
            <List :list="savedCities"></List>
            <template #fallback>
                loading ...
            </template>
        </Suspense>
        <WeatherBox></WeatherBox>
    </div>
</template>

<script setup>
import List from '../../components/List/index.vue'
import Search from '../../components/search/index.vue'
import WeatherBox from '../../components/WeatherBox/index.vue'
import { getCityAdcode } from '../../api';
const cityList = ref([])
async function search (searchKey) {
    let list = []
    try {
        const res = await getCityAdcode(searchKey)
        if (res.status === '1') {
            res.geocodes.map(item => {
                const param = {
                    adcode: item.adcode
                }
                if (item.level === '省') {
                    param.city = item.province
                } else if (item.level === '市') {
                    param.city = item.city
                } else {
                    param.city = item.district
                }
                list.push(param)
            })
            cityList.value = list
        } else {
            cityList.value = [{city: '似乎没有找到你查找的城市'}]
        }
    } catch {
        cityList.value = [{city: '网络异常，请稍后再试'}]
    }
}
const savedCities = JSON.parse(localStorage.getItem('savedCities')) || []

</script>

<style lang="scss" scoped>

</style>