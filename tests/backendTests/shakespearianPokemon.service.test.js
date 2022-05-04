import shakespearianPokemonService from "../../services/shakespearianPokemon.service";
import { enableFetchMocks } from "jest-fetch-mock";
import dotenv from "dotenv";

dotenv.config({ path: '../config.env.test' });

enableFetchMocks();

const mockPokemonAndShakespearTranslationRequests = (
  pokemonName,
  pokemonDescription,
  pokemonImage,
  translatedText
) =>
  fetch.mockResponseOnce(
    JSON.stringify({
      name: pokemonName,
      flavor_text_entries: [
        {
          flavor_text: pokemonDescription,
        },
      ],
    })
  ).mockResponseOnce(
    JSON.stringify({
      sprites: {
        other: {
          "official-artwork": {
            front_default: pokemonImage,
          },
        },
      },
    })
  ).mockResponseOnce(
    JSON.stringify({
      success: {
        total: 1,
      },
      contents: {
        translated: translatedText,
      },
    })
  );

describe("shakespearianPokemon", () => {
  it("should return the name of the pokemon, a shakespearian description of the pokemon and an image of the pokemon", async () => {
    mockPokemonAndShakespearTranslationRequests(
      "charizard",
      "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      "Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally."
    );
    const shakespearianPokemon = await shakespearianPokemonService("charizard");
    expect(shakespearianPokemon).toHaveProperty("name", "charizard");
    expect(shakespearianPokemon).toHaveProperty(
      "description",
      "Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally."
    );
    expect(shakespearianPokemon).toHaveProperty(
      "image",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
    );
  });
});
