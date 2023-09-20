import { defineStore } from "pinia";
export const useWeatherStore = defineStore('weather', ()=>{
    // state
    let isSearch = ref(false)
    
    let savedCities = ref(JSON.parse(localStorage.getItem('savedCities')) || [])
    // action, 异步的同样写法
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
    
    return {
        isSearch,
        showSearchBox,
        hideSearchBox,
        savedCities,
        addCity,
        deleteCity,
        saveCities
    }
})