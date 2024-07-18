import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchWeather = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_OPEN_METEO_URL}/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,is_day,weather_code&hourly=temperature_2m`, {withCredentials: true})
  return data
}

export function useGetWeather() {
  return useQuery({queryKey: ["weather"], queryFn: () => fetchWeather()})
}