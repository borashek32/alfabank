export type CharacterAppType = {
  id: number
  name: string
  status: StatusFilterType
  species: SpeciesFilterType
  gender: GenderFilterType
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

export type FavouriteFilterType = 'all' | 'favourites'

export type StatusFilterType = 'alive' | 'dead' | ''

export type SpeciesFilterType = 'human' | 'alien' | ''

export type GenderFilterType = 'male' | 'female' | ''