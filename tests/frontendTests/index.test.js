import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../pages/index";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

const mockPokemonAPIRequest = (
  pokemonName,
  pokemonDescription,
  pokemonImage,
) =>
  fetch
    .mockResponseOnce(
      JSON.stringify({
        name: pokemonName,
        image: pokemonImage,
        description: pokemonDescription,
      })
    )

describe("Home", () => {
  it("renders a heading about shakespearian pokemon", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Search for Pokemon, shakespearian style!/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders a searchbar", () => {
    render(<Home />);

    const searchbar = screen.getByLabelText("search");

    expect(searchbar).toBeInTheDocument();
  });

  it("has a list of pokemon to choose from in searchbar", async () => {
    render(<Home />);

    const pokemonList = screen.getByLabelText("search");
    fireEvent(pokemonList, new MouseEvent("click", { bubbles: true }));
    fireEvent.change(pokemonList, { target: { value: "nidoking" } });
    const nidoking = screen.getByText("nidoking");
    expect(nidoking).toBeInTheDocument();
  });

  it("renders a pokemon display with an image, caption and description", async () => {
    render(<Home />);

    mockPokemonAPIRequest('nidoking', 'A dangerous poison gas drifts from its mouth.', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/293.png');

    const pokemonList = screen.getByLabelText("search");
    fireEvent(pokemonList, new MouseEvent("click", { bubbles: true }));
    fireEvent.change(pokemonList, { target: { value: "nidoking" } });
    const nidokingImage = await screen.findByRole("img");
    const nidokingcaption = screen.findByRole('caption', {name: 'nidoking'});
    const nidokingdescription = screen.findByText("A dangerous poison gas drifts from its mouth.");
    waitFor(() => expect(nidokingImage.src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/293.png'))
    waitFor(() => expect(nidokingcaption.textContent).toBe('nidoking'));
    waitFor(() => expect(nidokingdescription).toBeInTheDocument());
  });
});
