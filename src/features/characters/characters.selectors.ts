import { RootState } from "../../common/providers/model/store"

const selectCharacters = (state: RootState) => state.characters.characters;
const selectFilter = (state: RootState) => state.characters.filter;
const selectCharacter = (state: RootState) => state.characters.character;
const selectCharacterById = (state: RootState, id: number) =>
  state.characters.originalCharacters.find((character) => character.id === id);

export { 
  selectCharacters,
  selectFilter,
  selectCharacter,
  selectCharacterById
}