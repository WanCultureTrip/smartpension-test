import { render, fireEvent, waitFor, findByLabelText } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Home } from '../Home'
import { MockedProvider } from '@apollo/client/testing'
import { clientMock } from '../../test-mocks/client-mock'

const renderComp = () => {
  const utils = render(
    <MockedProvider mocks={clientMock} addTypename={false}>
      <Home />
    </MockedProvider>
  )
  const input = utils.getByLabelText('search-input') as HTMLInputElement
  return {
    input,
    ...utils,
  }
}

describe('<Home /> component', () => {
  test('should match initial snapshot', async () => {
    const { container } = renderComp()
    expect(container).toMatchSnapshot()
  })

  test('should search for cities', async () => {
    const { input, getByLabelText, getAllByLabelText, findByText } = renderComp()

    // put Lo into the search input field
    fireEvent.change(input, { target: { value: 'Lo' } })
    expect(input.value).toBe('Lo')

    // click on the search button
    fireEvent.click(getByLabelText('search-button'))

    // wait for cards to load
    await waitFor(() => getAllByLabelText('city-card'))

    // check that 4 city cards is loaded
    expect(getAllByLabelText('city-card').length).toBe(4)

    // check that one of the cities is London
    expect(findByText('London')).toBeDefined()
  })

  test('should search for cities and click on visited and wish list', async () => {
    const { input, getByLabelText, getAllByLabelText, findAllByLabelText, queryByLabelText } = renderComp()

    // put Lo into the search input field
    fireEvent.change(input, { target: { value: 'Lo' } })
    expect(input.value).toBe('Lo')

    // click on the search button
    fireEvent.click(getByLabelText('search-button'))

    // wait for cards to load
    await waitFor(() => getAllByLabelText('city-card'))

    // check that 4 city cards is loaded
    expect(getAllByLabelText('city-card').length).toBe(4)

    // check that one of the cities is London
    const allVisitedCheckbox = await findAllByLabelText('visited-checkbox')
    expect(allVisitedCheckbox).toBeDefined()

    // last city should have visited false
    const lastVisitedCheckbox = allVisitedCheckbox[3] as HTMLInputElement
    expect(lastVisitedCheckbox.checked).toBe(false)

    // click the last city checkbox
    fireEvent.click(lastVisitedCheckbox)

    // last city checkbox should be null in loading state
    const allVisitedCheckboxAgain = await findAllByLabelText('visited-checkbox')
    allVisitedCheckboxAgain.forEach((checkbox, index) => {
      const checkboxElement = checkbox as HTMLInputElement
      expect(checkboxElement).toBeDefined()
      if (index === 3) {
        expect(checkboxElement).toBeNull()
      }
    })

    // expect last country card to display loading spinner
    expect(queryByLabelText('edit-card-spinner')).toBeDefined()
  })
})
