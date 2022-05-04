export default class pokemonModel {
  constructor (name) {
    this.name = name;
  }
  async getPokemonDescription () {
    const pokemonSpeciesInfo = fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${this.name}`
    );
    return await pokemonSpeciesInfo.then((data) =>
      data
        .json()
        .then((data) =>
          data.flavor_text_entries[0].flavor_text.replace(
            /(\r\n|\n|\r|\f)/gm,
            " "
          )
        )
    );
  }

  async getPokemonImage () {
    const pokemonInfo = fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`);
    return await pokemonInfo.then((data) =>
      data
        .json()
        .then((data) => data.sprites?.other["official-artwork"]?.front_default)
    );
  }
};