import { RootState } from "../../common/providers/model/store"

const selectCharacters = (state: RootState) => state.characters.characters;
const selectFilter = (state: RootState) => state.characters.filter;
const selectCharacter = (state: RootState) => state.characters.character;

export { 
  selectCharacters,
  selectFilter,
  selectCharacter,
}