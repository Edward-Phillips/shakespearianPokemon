import { createMocks } from "node-mocks-http";
import pokemonHandler from "../pages/api/pokemon/[id].js";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

const mockPokemonAPIRequests = (
  pokemonName,
  pokemonDescription,
  pokemonImage
) =>
  fetch
    .mockResponseOnce(
      JSON.stringify({
        name: pokemonName,
        flavor_text_entries: [
          {
            flavor_text: pokemonDescription,
          },
        ],
      })
    )
    .mockResponseOnce(
      JSON.stringify({
        sprites: {
          other: {
            "official-artwork": {
              front_default: pokemonImage,
            },
          },
        },
      })
    );

describe("pokemonAPI", () => {
  it("should return a pokemon", async () => {
    mockPokemonAPIRequests(
      "bulbasaur",
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon."
    );
    const { req, res } = createMocks({
      method: "GET",
      url: "/pokemon/bulbasaur",
      // nextjs adds a query object to the request object but the mocking library doesn't
      query: { id: "bulbasaur" },
    });
    await pokemonHandler(req, res);
    expect(res._getJSONData()).toHaveProperty("name", "bulbasaur");
  });

  it("should return the pokemon specified in the url", async () => {
    const pokemonOptionsArray = [
      "ivysaur",
      "venusaur",
      "charmander",
      "charmeleon",
      "charizard",
      "squirtle",
      "wartortle",
      "blastoise",
    ];

    const randomPokemon =
      pokemonOptionsArray[
        Math.floor(Math.random() * pokemonOptionsArray.length)
      ];
    mockPokemonAPIRequests(
      randomPokemon,
      "description not required for this test"
    );
    const { req, res } = createMocks({
      method: "GET",
      url: `/pokemon/${randomPokemon}",}`,
      query: { id: randomPokemon },
    });
    await pokemonHandler(req, res);
    expect(res._getJSONData()).toHaveProperty("name", randomPokemon);
  });

  it("should include the description of the pokemon in the response", async () => {
    mockPokemonAPIRequests(
      "bulbasaur",
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon."
    );
    const { req, res } = createMocks({
      method: "GET",
      url: "/pokemon/bulbasaur",
      query: { id: "bulbasaur" },
    });
    await pokemonHandler(req, res);
    expect(res._getJSONData()).toHaveProperty("name", "bulbasaur");
    expect(res._getJSONData()).toHaveProperty(
      "description",
      `A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.`
    );
  });

  it("should include the description of the pokemon specified in the url in the response", async () => {
    const pokemonOptionsArray = [
      {
        name: "ivysaur",
        description: `When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.`,
      },
      {
        name: "venusaur",
        description: `The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.`,
      },
      {
        name: "charmander",
        description: `Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.`,
      },
      {
        name: "charmeleon",
        description: `When it swings its burning tail, it elevates the temperature to unbearably high levels.`,
      },
      {
        name: "charizard",
        description: `Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.`,
      },
    ];

    const randomPokemon =
      pokemonOptionsArray[
        Math.floor(Math.random() * pokemonOptionsArray.length)
      ];
    mockPokemonAPIRequests(randomPokemon.name, randomPokemon.description);
    const { req, res } = createMocks({
      method: "GET",
      url: `/pokemon/${randomPokemon.name}",}`,
      query: { id: randomPokemon.name },
    });
    await pokemonHandler(req, res);
    expect(res._getJSONData()).toHaveProperty("name", randomPokemon.name);
    expect(res._getJSONData()).toHaveProperty(
      "description",
      randomPokemon.description
    );
  });

  it("should return a url to the pokemon image", async () => {
    mockPokemonAPIRequests(
      "bulbasaur",
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    );
    const { req, res } = createMocks({
      method: "GET",
      url: "/pokemon/bulbasaur",
      query: { id: "bulbasaur" },
    });
    await pokemonHandler(req, res);
    expect(res._getJSONData()).toHaveProperty("name", "bulbasaur");
    expect(res._getJSONData()).toHaveProperty(
      "image",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    );
  });
});
