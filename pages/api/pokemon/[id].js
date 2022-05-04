import shakespearianPokemonService from "../../../services/shakespearianPokemon.service";

export default async function pokemonHandler(req, res) {
  const { id } = req.query;
  try {

    const shakespearianPokemonServiceOutput = shakespearianPokemonService(id);
    
    res.status(200).json({
      name: id,
      description: await(shakespearianPokemonServiceOutput).then(data=> data.description),
      sprite: await(shakespearianPokemonServiceOutput).then(data=> data.sprite),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
