export default async function pokemonHandler(req, res) {
  const { id } = req.query;
  const PokemonInfo = fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  res.status(200).json({
    name: id,
    description: await PokemonInfo.then((data) =>
      data
        .json()
        .then((data) =>
          data.flavor_text_entries[0].flavor_text.replace(
            /(\r\n|\n|\r|\f)/gm,
            " "
          )
        )
    ),
  });
}
