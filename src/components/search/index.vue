<template>
    <div class="relative">
        <input v-model="searchKey" @focus="handleFocus" @input="handleInput" class="bg-main-blue outline-0 border-0 border-b border-white px-1 py-2 focus:border-0 focus:shadow-lg w-full" type="text" placeholder="请输入城市名称">
        <ul v-show="store.isSearch" class="absolute top-[48px] flex flex-col gap-4 w-full">
            <li @click="toDetail(item)" v-for="item in props.cityList" :key="item" class="bg-dark-blue py-4 px-1">{{item.city}}</li>
        </ul>
    </div>
</template>

<script setup>
import {useWeatherStore} from '../../store/index'
const searchKey = ref('')
const emits = defineEmits()
const props = defineProps(["cityList"])
const router = useRouter()
const store = useWeatherStore()

function toDetail (item) {
    if (item.adcode) {
        store.hideSearchBox()
        router.push(`detail?city=${item.city}&adcode=${item.adcode}`)
    }
}
function handleInput () {
    if(searchKey.value) {
        if (!store.isSearch) store.showSearchBox()
        debounce(emits('search',searchKey.value), 1000)
    }else {
        if (store.isSearch) store.hideSearchBox()
    }
   
}

function debounce(func, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

</script>

<style lang="scss" scoped>

</style>