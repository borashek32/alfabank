import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterAppType, FavouriteFilterType, GenderFilterType, SpeciesFilterType, StatusFilterType } from 'features/Characters/characters.types';

interface CharacterState {
  originalCharacters: CharacterAppType[]; // all characters from rickAndMortyApi
  characters: CharacterAppType[];         // filtered characters
  filter: FavouriteFilterType;
  character: CharacterAppType | null;
  genderFilter: GenderFilterType | '';
  statusFilter: StatusFilterType | '';
  speciesFilter: SpeciesFilterType | '';
  searchQuery: string;
  page: number;
}

const initialState: CharacterState = {
  originalCharacters: [],
  characters: [],
  filter: 'all',
  character: null,
  statusFilter: '',
  genderFilter: '',
  speciesFilter: '',
  searchQuery: '',
  page: 1,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<CharacterAppType[]>) {
      state.originalCharacters = action.payload;
      state.characters = state.filter === 'favourites'
        ? state.originalCharacters.filter((character) => character.likes === 1)
        : state.originalCharacters;
    },
    removeCharacter(state, action: PayloadAction<number>) {
      state.originalCharacters = state.originalCharacters.filter(
        (character) => character.id !== action.payload
      );
      state.characters = state.characters.filter(
        (character) => character.id !== action.payload
      );
    },
    toggleLike(state, action: PayloadAction<number>) {
      const character = state.originalCharacters.find((character) => character.id === action.payload);
      if (character) {
        character.likes = character.likes === 0 ? 1 : 0;
      }
      state.characters = state.filter === 'favourites'
        ? state.originalCharacters.filter((character) => character.likes === 1)
        : state.originalCharacters;
    },
    setFilter(state, action: PayloadAction<FavouriteFilterType>) {
      state.filter = action.payload;
      state.characters = action.payload === 'favourites'
        ? state.originalCharacters.filter((character) => character.likes === 1)
        : state.originalCharacters;
    },
    setCharacter(state, action: PayloadAction<number>) {
      state.character = state.originalCharacters.find(
        (character) => character.id === action.payload
      ) || null;
    },
    addCharacter(state, action: PayloadAction<CharacterAppType>) {
      state.originalCharacters.unshift(action.payload);
      state.characters = state.filter === 'favourites'
        ? state.originalCharacters.filter((character) => character.likes === 1)
        : state.originalCharacters;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    updateCharacter(state, action: PayloadAction<CharacterAppType>) {
      const index = state.originalCharacters.findIndex(
        (character) => character.id === action.payload.id
      );
      if (index !== -1) {
        state.originalCharacters[index] = action.payload;
        state.characters = state.filter === 'favourites'
          ? state.originalCharacters.filter((character) => character.likes === 1)
          : state.originalCharacters;
      }
    },
    setStatusFilter(state, action: PayloadAction<StatusFilterType | ''>) {
      state.statusFilter = action.payload;
      state.characters = state.originalCharacters.filter((character) =>
        (state.filter === 'favourites' ? character.likes === 1 : true) &&
        (state.statusFilter === '' || character.status === state.statusFilter) &&
        (state.genderFilter === '' || character.gender === state.genderFilter) &&
        (state.speciesFilter === '' || character.species === state.speciesFilter) &&
        (state.searchQuery === '' || character.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
      );
    },
    setGenderFilter(state, action: PayloadAction<GenderFilterType | ''>) {
      state.genderFilter = action.payload;
      state.characters = state.originalCharacters.filter((character) =>
        (state.filter === 'favourites' ? character.likes === 1 : true) &&
        (state.statusFilter === '' || character.status === state.statusFilter) &&
        (state.genderFilter === '' || character.gender === state.genderFilter) &&
        (state.speciesFilter === '' || character.species === state.speciesFilter) &&
        (state.searchQuery === '' || character.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
      );
    },
    setSpeciesFilter(state, action: PayloadAction<SpeciesFilterType | ''>) {
      state.speciesFilter = action.payload;
      state.characters = state.originalCharacters.filter((character) =>
        (state.filter === 'favourites' ? character.likes === 1 : true) &&
        (state.statusFilter === '' || character.status === state.statusFilter) &&
        (state.genderFilter === '' || character.gender === state.genderFilter) &&
        (state.speciesFilter === '' || character.species === state.speciesFilter) &&
        (state.searchQuery === '' || character.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
      );
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.characters = state.originalCharacters.filter((character) =>
        (state.filter === 'favourites' ? character.likes === 1 : true) &&
        (state.statusFilter === '' || character.status === state.statusFilter) &&
        (state.genderFilter === '' || character.gender === state.genderFilter) &&
        (state.speciesFilter === '' || character.species === state.speciesFilter) &&
        (state.searchQuery === '' || character.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
      );
    },
  },
});

export const {
  setCharacters,
  removeCharacter,
  toggleLike,
  setFilter,
  setCharacter,
  addCharacter,
  updateCharacter,
  setStatusFilter,
  setGenderFilter,
  setSpeciesFilter,
  setSearchQuery,
} = charactersSlice.actions;

export const charactersReducer = charactersSlice.reducer;
