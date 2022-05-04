export default function pokemonHandler(req, res) {
  const { id } = req.query;
  res.status(200).json({
    name: id,
    description: `A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.`,
  });
}
