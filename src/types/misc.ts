export enum Page {
  Reminder = 'Reminder',
  Coordinates = 'Koordinaten',
  Weather = 'Weather',
  Todos = 'Todos',
  Shoes = 'Shoes',
  Music = 'Music',
}

export interface Todo {
  id: string
  title: string
  starttime: number
  endtime: number
}

export interface Shoe {
  id: string
  name: string
  image: string
  wears: ShoeWear[]
  active: boolean
}

export interface ShoeWear {
  timestamp: number
  distance: number
}
