import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterAppType, FilterAppType } from './characters.types';
import { CharacterType } from './api/rickMorty.types';
import { transformToCharacterAppType } from 'common/dto/transformToCharacterAppType';

interface CharacterState {
  originalCharacters: CharacterAppType[]; // Оригинальный список персонажей
  characters: CharacterAppType[]; // Отфильтрованный список
  filter: FilterAppType; // Текущий фильтр
  character: CharacterAppType | null; // Текущий выбранный персонаж
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
    // Устанавливаем персонажей при загрузке данных из API
    setCharacters(state, action: PayloadAction<CharacterType[]>) {
      state.originalCharacters = action.payload.map(transformToCharacterAppType); // Преобразуем данные
      state.characters = state.filter === 'favourites' 
        ? state.originalCharacters.filter(character => character.likes === 1)
        : state.originalCharacters;
    },

    // Удаляем персонажа из обоих списков
    removeCharacter(state, action: PayloadAction<number>) {
      state.originalCharacters = state.originalCharacters.filter(character => character.id !== action.payload);
      state.characters = state.characters.filter(character => character.id !== action.payload);
    },

    // Переключение лайков персонажа
    toggleLike(state, action: PayloadAction<number>) {
      const character = state.originalCharacters.find(character => character.id === action.payload);
      if (character) {
        character.likes = character.likes === 0 ? 1 : 0; // Меняем состояние лайка
      }

      // Применяем текущий фильтр после изменения лайка
      state.characters = state.filter === 'favourites' 
        ? state.originalCharacters.filter(character => character.likes === 1)
        : state.originalCharacters;
    },

    // Устанавливаем фильтр и применяем его
    setFilter(state, action: PayloadAction<FilterAppType>) {
      state.filter = action.payload;
      state.characters = action.payload === 'favourites'
        ? state.originalCharacters.filter(character => character.likes === 1)
        : state.originalCharacters;
    },

    // Устанавливаем текущего выбранного персонажа
    setCharacter(state, action: PayloadAction<CharacterType>) {
      state.character = transformToCharacterAppType(action.payload);
    },
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
