import { GenderFilterType, SpeciesFilterType, StatusFilterType } from "../characters.types"

export type RickMortyDataType = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: CharacterType[]
}

export type CharacterType = {
  id: number
  name: string
  status: StatusFilterType
  species: SpeciesFilterType
  type: string
  gender: GenderFilterType
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string | undefined
  }
  image: string // path to image
  episode: [
    string
  ]
  url: string
  created: string
}