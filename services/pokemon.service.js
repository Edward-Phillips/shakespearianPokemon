import pokemonModel from '../models/pokemon.model';

export default async function pokemonService(pokemonName) {
  const pokemonModelInstance = new pokemonModel(pokemonName);
  const description = pokemonModelInstance.getPokemonDescription(pokemonName);
  const image = pokemonModelInstance.getPokemonImage(pokemonName);
  return {
    description: await description,
    image: await image,
  }
}