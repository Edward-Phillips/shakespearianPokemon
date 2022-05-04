export default function pokemonHandler(req, res) {
  const { id } = req.query;
  res.status(200).json({
    name: id,
  });
}
