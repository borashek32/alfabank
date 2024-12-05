import { generateRandomDescription } from "common/utils/generateRandomDescription";
import { CharacterType } from "features/Characters/api/rickMorty.types";
import { CharacterAppType } from "features/Characters/characters.types";

export const transformToCharacterAppType = (character: CharacterType): CharacterAppType => ({
  id: character.id,
  name: character.name,
  image: character.image,
  location: character.location,
  status: character.status,
  species: character.species,
  gender: character.gender,
  likes: 0,
  description: generateRandomDescription(),
});