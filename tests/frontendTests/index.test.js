import { render, screen } from '@testing-library/react'
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
})