<template>
    <div v-if="show">
        <TransitionGroup name="list">
            <div v-for="item,index in cityList" :key="item" class="flex cursor-pointer mb-4" @mouseleave="item.showBtns=false" @mouseenter="item.showBtns = true">
                <div class="flex-1 flex justify-between bg-dark-blue p-2 duration-300 transition-all">
                    <div>{{ item.city }}</div>
                    <div>{{ item.temperature }}度</div>
                </div>
                <div v-show="item.showBtns" class="flex gap-4">
                    <button @click="toDetail(item)" class="bg-yellow-500 w-[80px]">查看</button>
                    <button @click="deleteCity(item, index)" class="bg-yellow-500 w-[80px]">删除</button>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup>
import { useWeatherStore } from '../../store';
import { getCityWeather } from '../../api';
const props = defineProps(['list'])
const store = useWeatherStore()
const router = useRouter()
let cityList = ref([])
await getTemperatures()
const show = computed(()=>{
    return cityList.value.length > 0 && !store.isSearch
})

async function getTemperatures () {
    let list = []
    if(props.list.length === 0) return
    props.list.map(item => {
        let itemFunc = null
        itemFunc = getCityWeather(item, 'base')
        list.push(itemFunc)
    })
    
    Promise.all(list).then(res=>{
        let item = {}
        cityList.value = []
        res.map(item => {
            const city = item.lives[0]
            const obj = {
                city: city.city,
                adcode: city.adcode,
                temperature: city.temperature,
                showBtns: false
            }
            cityList.value.push(obj)
        })
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