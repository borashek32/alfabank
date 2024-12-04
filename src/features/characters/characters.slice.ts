import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterAppType, FilterAppType } from 'features/Characters/characters.types';

interface CharacterState {
  originalCharacters: CharacterAppType[]; // all characters from rickAndMortyApi
  characters: CharacterAppType[];         // filtered characters
  filter: FilterAppType;
  character: CharacterAppType | null;
}

const initialState: CharacterState = {
  originalCharacters: [],
  characters: [],
  filter: 'all',
  character: null,
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
    setFilter(state, action: PayloadAction<FilterAppType>) {
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
  },
});

export const {
  setCharacters,
  removeCharacter,
  toggleLike,
  setFilter,
  setCharacter,
  addCharacter,
} = charactersSlice.actions;

export const charactersReducer = charactersSlice.reducer;
