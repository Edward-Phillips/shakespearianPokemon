import { createMocks } from "node-mocks-http";
import pokemonHandler from "../pages/api/pokemon/[id].js";

describe("pokemonAPI", () => {
  it("should return a pokemon", async () => {
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

    const randomPokemon = pokemonOptionsArray[Math.floor(Math.random() * pokemonOptionsArray.length)];
    const { req, res } = createMocks({
      method: "GET",
      url: `/pokemon/${randomPokemon}",}`,
      query: { id: randomPokemon }
    });
    await pokemonHandler(req, res);
    expect(res._getJSONData()).toHaveProperty("name", randomPokemon);
  });

  it("should include the description of the pokemon in the response", async () => {
    const { req, res } = createMocks({
      method: "GET",
      url: "/pokemon/bulbasaur",
      query: { id: "bulbasaur" },
    });
    await pokemonHandler(req, res);
    expect(res._getJSONData()).toHaveProperty("name", "bulbasaur");
    expect(res._getJSONData()).toHaveProperty("description", `A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.`);
  });
});
