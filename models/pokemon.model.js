import pokemonCache from '../caches/pokemon.cache';

export default class pokemonModel {
  constructor (name) {
    this.name = name;
    if (pokemonCache[name]) {
      this.description = pokemonCache[name].description;
      this.image = pokemonCache[name].image;
    } else {
      pokemonCache[name] = {};
    }
    this.cache = pokemonCache[name];
  }

  parsePokemonDescription (data) {
    return data.json().then(data=> data.flavor_text_entries[0].flavor_text.replace(
      /(\r\n|\n|\r|\f)/gm,
      " "
    ));
  }
  parsePokemonImage (data) {
    return data.json().then(data=> data.sprites.other["official-artwork"].front_default);
  }
  async getPokemonDescription () {
    if (this.description) {
      return this.description;
    }
    const pokemonSpeciesInfo = fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${this.name}`
    );

    this.cache.description =  await pokemonSpeciesInfo.then((data) =>
      this.parsePokemonDescription(data)
    );
    return await this.cache.description;
  }

  async getPokemonImage () {
    if (this.image) {
      return this.image;
    }
    const pokemonInfo = fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`);
    this.cache.image = await pokemonInfo.then((data) =>
      this.parsePokemonImage(data)
    );
    return await this.cache.image;
  }
};