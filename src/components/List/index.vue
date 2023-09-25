<template>
    <div v-if="show" class="max-h-[300px] overflow-y-scroll scrollbar-thin hover:scrollbar-thumb-blue-300">
        <h2 v-if="cityList.length === 0" class="text-center">暂时没有保存过天气信息，请查询后点击右上角"＋"号保存</h2>
        <template v-else>
            <TransitionGroup name="list">
                <div v-for="item,index in cityList" :key="item" class="flex cursor-pointer mb-4" @mouseleave="item.showBtns=false" @mouseenter="item.showBtns = true">
                    <div class="flex justify-between bg-dark-blue p-2 duration-300 transition-all w-full" :class="{'w-4/5':item.showBtns === true}">
                        <div>{{ item.city }}</div>
                        <div>{{ item.temperature }}度</div>
                    </div>
                    <div v-show="item.showBtns" class="flex gap-4">
                        <button @click="toDetail(item)" class="bg-yellow-500 w-[80px]">查看</button>
                        <button @click="deleteCity(item, index)" class="bg-yellow-500 w-[80px]">删除</button>
                    </div>
                </div>
            </TransitionGroup>
        </template>
    </div>
</template>

<script setup>
import { useWeatherStore } from '../../store';
import { getCityWeather } from '../../api';
const props = defineProps(['list'])
const adcodeList = JSON.parse(localStorage.getItem('savedCities')) || []
const store = useWeatherStore()
const router = useRouter()
let cityList = ref([])
await getTemperatures()
const show = computed(()=>{
    return !store.isSearch
})

async function getTemperatures () {
    let list = []
    if(adcodeList.length === 0) return
    adcodeList.map(item => {
        let itemFunc = null
        itemFunc = getCityWeather(item, 'base')
        list.push(itemFunc)
    })
    
    const res = await Promise.all(list)
    cityList.value = []
    res?.map(item => {
        const city = item.lives[0]
        const obj = {
            city: city.city,
            adcode: city.adcode,
            temperature: city.temperature,
            showBtns: false
        }
        cityList.value.push(obj)
    })
}


const showBtns = ref(false)

function toDetail (item) {
    if (item.adcode) {
        router.push(`detail?city=${item.city}&adcode=${item.adcode}`)
    }
}
function deleteCity (item,index) {
    cityList.value.splice(index, 1)
    store.deleteCity(item.adcode)
}
</script>

<style lang="scss" scoped>

</style>