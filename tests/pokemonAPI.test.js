import { createMocks } from "node-mocks-http";
import pokemonHandler from "../pages/api/pokemon/[id].js";

describe("pokemonAPI", () => {
  it("should return a pokemon", async () => {
    const { req, res } = createMocks({
      method: "GET",
      url: "/pokemon/bulbasaur",
    });
    await pokemonHandler(req, res);
    expect(res._getJSONData()).toEqual({
      name: "Bulbasaur",
    });
  });
});