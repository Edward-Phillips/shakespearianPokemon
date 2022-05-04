import pokemonModel from '../models/pokemon.model';

export default async function pokemonService(pokemonName) {
  const pokemonModelInstance = new pokemonModel(pokemonName);
  const description = pokemonModelInstance.getPokemonDescription();
  const image = pokemonModelInstance.getPokemonImage();
  return {
    description: await description,
    sprite: await image,
  }
}