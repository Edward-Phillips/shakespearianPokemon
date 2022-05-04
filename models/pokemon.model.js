import { cache } from "../caches/pokemon.cache";

export default class pokemonModel {
  constructor(name) {
    this.name = name;
    if (cache[name]) {
      this.description = cache[name].description;
      this.sprite = cache[name].sprite;
    } else {
      cache[name] = {};
    }
    this.cache = cache[name];
  }

  parsePokemonDescription(data) {
    return data
      .json()
      .then((data) =>
        data.flavor_text_entries[0].flavor_text.replace(
          /(\r\n|\n|\r|\f)/gm,
          " "
        )
      );
  }
  parsePokemonImage(data) {
    return data
      .json()
      .then((data) => data.sprites.other["official-artwork"].front_default);
  }
  async getPokemonDescription() {
    if (this.description) {
      return this.description;
    }
    try {
      const pokemonSpeciesInfo = fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${this.name}`
      );

      this.cache.description = await pokemonSpeciesInfo.then((data) =>
        this.parsePokemonDescription(data)
      );
      return await this.cache.description;
    } catch (e) {
      console.log(e);
      return "we searched far and wide but could not find this pokemon";
    }
  }

  async getPokemonImage() {
    if (this.sprite) {
      return this.sprite;
    }
    try {
      const pokemonInfo = fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.name}`
      );
      this.cache.sprite = await pokemonInfo.then((data) =>
        this.parsePokemonImage(data)
      );
      return await this.cache.sprite;
    } catch (e) {
      console.log(e);
      return "urlNotFound";
    }
  }
}
