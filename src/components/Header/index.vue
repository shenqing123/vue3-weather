<template>
    <header class="sticky shadow-lg top-0 z-10">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <RouterLink to="/">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <p class="text-2xl">新中地天气</p>
                </div>
            </RouterLink>
            <div class="flex items-center gap-4">
                <div>{{city}}</div>
                <div class="text-sm">实时天气: {{ weather }} {{ temperature }}℃</div>
                <div class="text-sm">{{winddirection}}风 {{ windpower }}</div>
            </div>
            <div class="flex flex-1 gap-3 justify-end">
                <span @click="open">
                    <i class="fa-solid fa-circle-info cursor-pointer hover:text-dark-blue text-xl duration-1000"></i>
                </span>
                <span v-show="props.isShowPlus" @click="$emit('addCity', adcode)">
                    <i class="fa-solid fa-plus cursor-pointer hover:text-dark-blue text-xl duration-1000"></i>
                </span>
            </div>
        </nav>
        <div v-show="show" class="duration-100 flex w-full h-screen bg-black bg-opacity-30 fixed top-0 left-0 z-20">
            <div class="self-start max-w-screen-md bg-white text-black flex flex-col gap-4 mx-auto mt-32 p-4">
                <div>
                    <h2>关于</h2>
                    <span class="text-sm">这个应用可以用来追踪你选择城市的当前天气</span>
                </div>
                <div>
                    <h2>如何使用:</h2>
                    <p class="text-sm">1.点击搜索框输入你希望追踪的城市<br>
                        2.在搜索结果中选中一个城市，你将获取当地最新的天气<br>
                        3.点击右侧的＋号可以将追踪城市的天气情况保存在首页</p>
                </div>
                <div>
                    <h2>移除城市</h2>
                    <span class="text-sm">如果你不想在首页关注某个城市,可以通过底部的按钮删除它</span>
                </div>
                <button class="bg-dark-blue text-white w-20 py-2 " @click="close">关闭</button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useWeatherStore } from '../../store';

const props = defineProps(['res', 'isShowPlus'])
const {city, temperature, weather, windpower, winddirection} = props.res.lives[0]
let show = ref(false)
const store = useWeatherStore()
function open () {
    show.value = true
}
function close () {
    show.value = false
}



</script>

<style lang="scss" scoped>

</style>