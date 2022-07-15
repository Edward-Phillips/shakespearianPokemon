
import pokemonService from "../../../services/pokemon.service";

export default async function pokemonHandler(req, res) {
  const { id } = req.query;
  try {
    const pokemonServiceOutput = await pokemonService(id);
    res.status(200).json({
      name: pokemonServiceOutput.name,
      description: pokemonServiceOutput.description,
      sprite: pokemonServiceOutput.image,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
}
