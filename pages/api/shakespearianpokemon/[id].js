import shakespearianPokemonService from "../../../services/shakespearianPokemon.service";

export default async function pokemonHandler(req, res) {
  const { id } = req.query;
  try {
    const shakespearianPokemonServiceOutput = await shakespearianPokemonService(
      id
    );
    res.status(200).json({
      name: id,
      description: shakespearianPokemonServiceOutput.description,
      sprite: shakespearianPokemonServiceOutput.sprite,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
}
