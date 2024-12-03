import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RickMortyDataType } from 'features/characters/api/rickMorty.types';

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
        query: (page) => {
          return {
            method: 'GET',
            url: `character/?page=${page}`
          }
        }
      })
    }
  },
})

export const {
  useGetCharactersQuery,
} = rickMortyApi