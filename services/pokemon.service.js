import pokemonModel from "../models/pokemon.model";

export default async function pokemonService(pokemonName) {
  const pokemonModelInstance = new pokemonModel(pokemonName);
  return pokemonModelInstance.getOrCreatePokemon();
}
