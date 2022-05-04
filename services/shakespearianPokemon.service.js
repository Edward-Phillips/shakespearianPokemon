import pokemonService from "./pokemon.service";
import shakespeareTranslationService from "./shakespeareTranslation.service";

export default async function shakespearianPokemonService(pokemonName) {
  const pokemonServiceOutput = pokemonService(pokemonName);
  const description = await pokemonServiceOutput.then(data => data.description);
  const image = await pokemonServiceOutput.then(data => data.image);
  const shakespeareTranslationServiceOutput = shakespeareTranslationService(description);
  return {
    name: pokemonName,
    description: await shakespeareTranslationServiceOutput,
    image: image,
  };
}