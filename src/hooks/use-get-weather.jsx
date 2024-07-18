import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchWeather = async (lat, lng) => {
  const { data } = await axios.get(`${import.meta.env.VITE_OPEN_METEO_URL}/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,is_day,weather_code&hourly=temperature_2m`)
  return data
}

export function useGetWeather(coords) {
  return useQuery({queryKey: ["weather"], queryFn: () => fetchWeather(coords.lat, coords.lng), enabled: !!coords})
}