import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { transformToCharacterAppType } from 'common/dto/transformToCharacterAppType';
import { CharacterAppType } from '../characters.types';
import { RickMortyDataType } from 'features/Characters/api/rickMorty.types';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
});

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (build) => ({
    getCharacters: build.query<CharacterAppType[], number>({
      query: (page: number) => ({
        method: 'GET',
        url: `character/?page=${page}`,
      }),
      transformResponse: (response: RickMortyDataType) =>
        response.results.map(transformToCharacterAppType),
    }),
  }),
});

export const { useGetCharactersQuery } = rickMortyApi;
