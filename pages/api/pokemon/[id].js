export default async function pokemonHandler(req, res) {
  const { id } = req.query;
  const pokemonSpeciesInfo = fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  const pokemonInfo = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  res.status(200).json({
    name: id,
    description: await pokemonSpeciesInfo.then((data) =>
      data
        .json()
        .then((data) =>
          data.flavor_text_entries[0].flavor_text.replace(
            /(\r\n|\n|\r|\f)/gm,
            " "
          )
        )
    ),
    image: await pokemonInfo.then((data) =>
      data
        .json()
        .then((data) => data.sprites?.other["official-artwork"]?.front_default)
    ),
  });
}
