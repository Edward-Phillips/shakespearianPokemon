import pokemonService from "../../../services/pokemon.service";

export default async function pokemonHandler(req, res) {
  const { id } = req.query;
  const pokemonServiceInstance = pokemonService(id);
  res.status(200).json({
    name: id,
    description: await(pokemonServiceInstance).then(data=> data.description),
    image: await(pokemonServiceInstance).then(data=> data.image),
  });
}
