<template>
    <div>
        <h2 class="mt-6">近期天气</h2>
        <div class="mt-2 bg-dark-blue p-10 rounded">
            <div class="flex justify-between">
                <div v-for="item,index in store.casts" class="flex flex-col gap-4 text-center">
                    <div>{{ getWeekMap(item,index) }}</div>
                    <div>{{ item.date.slice(-5) }}</div>
                    <div>{{ item.dayweather }}</div>
                    <div>风力 {{ item.daypower }}级</div>
                </div>
            </div>
            <div class="mt-10 h-40 w-full" >
                <v-chart :option="option"></v-chart>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useWeatherStore } from '../../store';
const store = useWeatherStore()
function getWeekMap (item, index) {
    let str = ''
    const map = ['周一','周二','周三','周四','周五','周六','周天']
    if (index === 0) str = '今天'
    else if(index === 1) str = '明天'
    else str = map[Number(item.week)-1]
    return str
}
const option = ref({})
function renderOption (dayData, nightData) {
    option.value = {
        grid: {
            top: 25,
            left: 30,
            right: 30,
            bottom: 0
        },
        xAxis: {
            type: 'category',
            show: false,
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series:[{
            type: 'line',
            smooth: true,
            label: {
                show: true,
                formatter: '白{c} ℃',
                color: '#fff'
            },
            data:  dayData
        },{
            type: 'line',
            smooth: true,
            label: {
                position: 'bottom',
                show: true,
                formatter: '晚{c} ℃',
                color: '#fff'
            },
            data: nightData
        }]
    }
}
function init () {
    let dayData = []
    let nightData = []
    store.casts.map(item => {
        dayData.push(item.daytemp)
        nightData.push(item.nighttemp)
    })
    renderOption(dayData, nightData)
}
init()
watch(()=>store.casts, ()=> {
    init()
})

</script>

<style lang="scss" scoped>

</style>