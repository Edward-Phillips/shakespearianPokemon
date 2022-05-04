import { createMocks } from "node-mocks-http";
import pokemonHandler from "../../pages/api/pokemon/[id].js";
import { enableFetchMocks } from "jest-fetch-mock";
import { resetCache } from "../../caches/pokemon.cache";

enableFetchMocks();

const mockPokemonAPIRequests = (
  pokemonName,
  pokemonDescription,
  pokemonImage,
  translatedText
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
    )
    .mockResponseOnce(
      JSON.stringify({
        success: {
          total: 1,
        },
        contents: {
          translated: translatedText,
        },
      })
    );

describe("pokemonAPI", () => {
  beforeEach(() => {
    fetch.resetMocks();
    resetCache();
  });
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
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
      "url not tested",
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
        shakespearianDescription: `at which hour the bulb on its back grows large, 't appears to loseth the ability to standeth on its hind forks.`,
      },
      {
        name: "venusaur",
        description: `The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.`,
        shakespearianDescription: `the plant blooms at which hour 't is absorbing solar energy. 't stays on the moveth to seek sunlight.`,
      },
      {
        name: "charmander",
        description: `Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.`,
        shakespearianDescription: `obviously prefers hot places. At which hour 't rains, steam is did doth sayeth to spout from the tip of its tail.`,
      },
      {
        name: "charmeleon",
        description: `When it swings its burning tail, it elevates the temperature to unbearably high levels.`,
        shakespearianDescription: `at which hour 't swings its burning tail, 't elevates the temperature to unbearably high levels.`,
      },
      {
        name: "charizard",
        description: `Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.`,
        shakespearianDescription: `spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally.`,
      },
    ];

    const randomPokemon =
      pokemonOptionsArray[
        Math.floor(Math.random() * pokemonOptionsArray.length)
      ];
    mockPokemonAPIRequests(
      randomPokemon.name,
      randomPokemon.description,
      "url not required",
      randomPokemon.shakespearianDescription
    );
    const { req, res } = createMocks({
      method: "GET",
      url: `/pokemon/${randomPokemon.name}",}`,
      query: { id: randomPokemon.name },
    });
    await pokemonHandler(req, res);
    expect(res._getJSONData()).toHaveProperty("name", randomPokemon.name);
    expect(res._getJSONData()).toHaveProperty(
      "description",
      randomPokemon.shakespearianDescription
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

  it("should return a status code of 500 if there is an error in fetching pokemon info", async () => {
    fetch.mockReject(new Error("fake error message"));
    const { req, res } = createMocks({
      method: "GET",
      url: "/pokemon/bulbasaur",
      query: { id: "bulbasaur" },
    });
    await pokemonHandler(req, res);
    expect(res).toHaveProperty("statusCode", 500);
    expect(res._getJSONData()).toHaveProperty("error", "fake error message");
  });
});
