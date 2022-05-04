import pokemonModel from '../models/pokemon.model';

export default async function pokemonService(pokemonName) {
  const pokemonModelInstance = new pokemonModel(pokemonName);
  const description = pokemonModelInstance.getPokemonDescription(pokemonName);
  const image = pokemonModelInstance.getPokemonImage(pokemonName);
  console.log(await description);
  console.log(await image);
  return {
    description: await description,
    image: await image,
  }
}