import { RootState } from "../../common/providers/model/store"

const selectCharacters = (state: RootState) => state.characters.characters;
const selectFilter = (state: RootState) => state.characters.filter;
const selectCharacter = (state: RootState) => state.characters.character;
const selectCharacterById = (state: RootState, id: number) =>
  state.characters.originalCharacters.find((character) => character.id === id);
const selectStatusFilter = (state: RootState) => state.characters.statusFilter;
const selectGenderFilter = (state: RootState) => state.characters.genderFilter;
const selectSpeciesFilter = (state: RootState) => state.characters.speciesFilter;
const selectSearchQuery = (state: RootState) => state.characters.searchQuery;

export { 
  selectCharacters,
  selectFilter,
  selectCharacter,
  selectCharacterById,
  selectStatusFilter,
  selectGenderFilter,
  selectSpeciesFilter,
  selectSearchQuery,
}