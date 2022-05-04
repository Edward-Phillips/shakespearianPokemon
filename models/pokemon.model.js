import prisma from "../db/prisma";
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

  async getOrCreatePokemon() {
    if (this.description && this.sprite) {
      return {
        name: this.name,
        description: this.description,
        sprite: this.sprite,
      };
    }
    const pokemon = await prisma.pokemonDetails.findFirst({
      where: { name: { equals: this.name } },
    });
    if (pokemon) {
      return pokemon;
    }
    return prisma.pokemonDetails.create({
      data: {
        name: this.name,
        description: await this.getPokemonDescription(),
        image: await this.getPokemonImage(),
  }
    });
  }

  parsePokemonDescription(data) {
    return data
      .json()
      .then((data) =>
        data.flavor_text_entries
          .filter((textEntry) => textEntry.language.name === "en")[0]
          .flavor_text.replace(/(\r\n|\n|\r|\f)/gm, " ")
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
      const databasePokemon = await prisma.pokemonDetails.findMany({
        where: { name: { equals: this.name } },
      });
    
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
