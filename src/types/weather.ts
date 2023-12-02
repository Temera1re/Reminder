export interface Weather {
  timestamp: string
  source_id: number
  cloud_sover: number
  condition: string
  dew_point: number
  icon: string
  precipitation: number
  pressure_msl: number
  relative_humidity: number
  sunshine: number
  temperature: number
  visibility: number
  wind_direction: number
  wind_speed: number
  wind_gust_direction: number
  wind_gust_speed: number
  precipitation_probability: number | null
  precipitation_probability_6h: number | null
}

export interface Source {
  id: number
  dwd_station_id: string
  wmo_station_id: string
  station_name: string
  observation_type: string
  lat: number
  lon: number
  height: number
  distance: number
  last_record: string
}

export interface WeatherResponse {
  weather: Weather[]
  sources: Source[]
}

export interface SourcesResponse {
  sources: Source[]
}
