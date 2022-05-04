import { fireEvent, render, screen } from '@testing-library/react'
import Home from '../../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading about shakespearian pokemon', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Search for Pokemon, shakespearian style!/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders a searchbar', () => {
    render(<Home />)

    const searchbar = screen.getByLabelText('search')

    expect(searchbar).toBeInTheDocument()
  });

  it('has a list of pokemon to choose from in searchbar', async() => {
    render(<Home />)

    const pokemonList = screen.getByLabelText('search')
    fireEvent(pokemonList, new MouseEvent('click', { bubbles: true }))
    fireEvent.change(pokemonList, {target: {value: 'nidoking'}})
    const bulbasaur = screen.getByText('nidoking')
    expect(bulbasaur).toBeInTheDocument();
  })
})