import { defineStore } from "pinia";
import {getCityWeather} from '../api/index'
export const useWeatherStore = defineStore('weather', ()=>{
    // state
    let isSearch = ref(false)
    let isShowPlus = ref(false)
    let savedCities = ref(JSON.parse(localStorage.getItem('savedCities')) || [])
    let casts = ref([])
    let localCityAdcode = ref('')
    // action, 异步的同样写法
    function setShowPlus (flag) {
        isShowPlus.value = flag
    }
    function showSearchBox() {
        isSearch.value = true  
    }
    function hideSearchBox () {
        isSearch.value = false
    }
    
    function addCity (adcode) {
        savedCities.value.push(adcode)
        saveCities()
    }
    function deleteCity (adcode) {
        savedCities.value = savedCities.value.filter(item => item !== adcode)
        saveCities()
    }
    function saveCities () {
        localStorage.setItem('savedCities', JSON.stringify(savedCities.value))
    }
    function setLocalAdcode (adcode) {
        localCityAdcode.value = adcode
    }
    async function setCasts (adcode) {
        try{
            const res = await getCityWeather(adcode, 'all')
            if (res.status === '1') {
                casts.value = res.forecasts[0].casts
            }
        } catch (error){
            throw error
        }
        
    }
    return {
        isSearch,
        showSearchBox,
        hideSearchBox,
        savedCities,
        addCity,
        deleteCity,
        saveCities,
        localCityAdcode,
        setLocalAdcode,
        casts,
        setCasts,
        isShowPlus,
        setShowPlus
    }
})