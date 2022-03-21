import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Visited } from '../Visited'
import { MockedProvider } from '@apollo/client/testing'
import { clientMock } from '../../test-mocks/client-mock'

const renderComp = () =>
  render(
    <MockedProvider mocks={clientMock} addTypename={false}>
      <Visited />
    </MockedProvider>
  )

describe('<Visited /> component', () => {
  test('should match initial snapshot', async () => {
    const { container } = renderComp()
    expect(container).toMatchSnapshot()
  })

  test('should display visited cities', async () => {
    const { getAllByLabelText, findByText } = renderComp()

    // wait for cards to load
    await waitFor(() => getAllByLabelText('city-card'))

    // check that 2 city cards is loaded
    expect(getAllByLabelText('city-card').length).toBe(2)

    // check that one of the cities is London
    expect(findByText('London')).toBeDefined()
  })
})
