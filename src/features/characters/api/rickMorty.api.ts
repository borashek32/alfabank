import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharacterType, RickMortyDataType } from 'features/characters/api/rickMorty.types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://rickandmortyapi.com/api',
})

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: build => {
    return {
      getCharacters: build.query<RickMortyDataType, number>({
        query: (page: number) => {
          return {
            method: 'GET',
            url: `character/?page=${page}`
          }
        }
      }),
      getCharacter: build.query<CharacterType, number>({
        query: (id: number) => {
          return {
            method: 'GET',
            url: `character/${id}`
          }
        }
      })
    }
  },
})

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
} = rickMortyApi