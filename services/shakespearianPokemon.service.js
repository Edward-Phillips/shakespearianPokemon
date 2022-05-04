import pokemonService from "./pokemon.service";
import shakespeareTranslationService from "./shakespeareTranslation.service";

export default async function shakespearianPokemonService(pokemonName) {
  const pokemonServiceOutput = await pokemonService(pokemonName);
  const description = pokemonServiceOutput.description;
  const image = pokemonServiceOutput.image;
  const shakespeareTranslationServiceOutput = await shakespeareTranslationService(description);
  return {
    name: pokemonName,
    description: shakespeareTranslationServiceOutput.output,
    sprite: image,
  };
}