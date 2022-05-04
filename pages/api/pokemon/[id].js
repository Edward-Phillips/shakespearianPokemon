import pokemonService from "../../../services/pokemon.service";

export default async function pokemonHandler(req, res) {
  const { id } = req.query;
  try {

    const pokemonServiceOutput = pokemonService(id);
    
    res.status(200).json({
      name: id,
      description: await(pokemonServiceOutput).then(data=> data.description),
      image: await(pokemonServiceOutput).then(data=> data.image),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
