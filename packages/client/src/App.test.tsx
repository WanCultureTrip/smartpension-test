import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { render } from './test-utils'
import { App } from './App'
import { MockedProvider } from '@apollo/client/testing'
import { clientMock } from './test-mocks/client-mock'

describe('<App /> component', () => {
  it('renders the Header content', () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={clientMock} addTypename={false}>
          <App />
        </MockedProvider>
      </BrowserRouter>
    )
    const HeadingComponent = screen.getByText(/^Smart traveller$/i)
    expect(HeadingComponent).toBeInTheDocument()
  })
})
