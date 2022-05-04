import pokemonService from "../../../services/pokemon.service";

export default async function pokemonHandler(req, res) {
  const { id } = req.query;
  try {

    const pokemonServiceInstance = pokemonService(id);
    
    res.status(200).json({
      name: id,
      description: await(pokemonServiceInstance).then(data=> data.description),
      image: await(pokemonServiceInstance).then(data=> data.image),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
