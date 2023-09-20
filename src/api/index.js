import request  from "./axios";
const KEY = '792a0f0ea1f920a24882d3d1f6e2fc60'
export const getLocalCity = () => request.get(`/ip?key=${KEY}`)
export const getCityWeather = (adcode,extensions) => request.get(`/weather/weatherInfo?key=${KEY}&city=${adcode}&extensions=${extensions}`)
export const getCityAdcode = (city) => request.get(`/geocode/geo?key=${KEY}&address=${city}`)