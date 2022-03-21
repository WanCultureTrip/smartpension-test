import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { WishList } from '../WishList'
import { MockedProvider } from '@apollo/client/testing'
import { clientMock } from '../../test-mocks/client-mock'

const renderComp = () =>
  render(
    <MockedProvider mocks={clientMock} addTypename={false}>
      <WishList />
    </MockedProvider>
  )

describe('<WishList /> component', () => {
  test('should match initial snapshot', async () => {
    const { container } = renderComp()
    expect(container).toMatchSnapshot()
  })

  test('should display wishlist cities', async () => {
    const { getAllByLabelText, findByText } = renderComp()

    // wait for cards to load
    await waitFor(() => getAllByLabelText('city-card'))

    // check that 1 city cards is loaded
    expect(getAllByLabelText('city-card').length).toBe(1)

    // check that one of the cities is London
    expect(findByText('London')).toBeDefined()
  })
})
