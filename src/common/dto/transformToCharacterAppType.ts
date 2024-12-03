import { generateRandomDescription } from "common/utils/generateRandomDescription";
import { CharacterType } from "features/characters/api/rickMorty.types";
import { CharacterAppType } from "features/characters/characters.types";

export const transformToCharacterAppType = (character: CharacterType): CharacterAppType => ({
  id: character.id,
  name: character.name,
  image: character.image,
  location: character.location,
  status: character.status,
  species: character.species,
  likes: 0,
  description: generateRandomDescription(),
});