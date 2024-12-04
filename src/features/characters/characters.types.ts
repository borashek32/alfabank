export type CharacterAppType = {
  id: number
  name: string
  status: string
  species?: string
  location: {
    name: string
    url?: string
  }
  image?: string
  episode?: [
    string
  ]
  likes?: number
  description: string
}

export type FilterAppType = 'all' | 'favourites'