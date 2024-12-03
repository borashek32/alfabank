import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterAppType, FilterAppType } from './characters.types';
import { CharacterType } from './api/rickMorty.types';
import { transformToCharacterAppType } from 'common/dto/transformToCharacterAppType';

interface CharacterState {
  characters: CharacterAppType[],
  filter: FilterAppType,
  character: CharacterAppType | null,
}

const initialState: CharacterState = {
  characters: [],
  filter: 'all',
  character: {} as CharacterAppType,
};

const charactersSlice = createSlice({
  name: 'rickAndMorty',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<CharacterType[]>) {
      state.characters = action.payload.map(transformToCharacterAppType);
    },
    removeCharacter(state, action: PayloadAction<number>) {
      state.characters = state.characters.filter(item => item.id !== action.payload);
    },
    toggleLike(state, action: PayloadAction<number>) {
      const character = state.characters.find(item => item.id === action.payload);
      if (character) {
        character.likes = character.likes === 0 ? 1 : 0;
      }
    },
    setFilter(state, action: PayloadAction<FilterAppType>) {
      state.filter = action.payload;
    },
    setCharacter(state, action: PayloadAction<CharacterType>) {
      state.character = transformToCharacterAppType(action.payload);
    }
  },
});

export const { 
  setCharacters, 
  removeCharacter,
  toggleLike,
  setFilter,
  setCharacter,
} = charactersSlice.actions;
export const charactersReducer = charactersSlice.reducer;
