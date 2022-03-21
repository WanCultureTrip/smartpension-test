import type { MockedResponse } from '@apollo/client/testing'
import { CITY_FILTER } from '../graphql/CITY_FILTER.query'
import { UPDATE_CITY } from '../graphql/UPDATE_CITY.query'
import type { CityType } from '../types/city-types'

const mockCityList = [
  {
    id: 1,
    name: 'London',
    visited: true,
    wishlist: true,
    country: 'United Kingdom',
  },
  {
    id: 14,
    name: 'Barcelona',
    visited: true,
    wishlist: false,
    country: 'Spain',
  },
  {
    id: 50,
    name: 'Lodz',
    visited: false,
    wishlist: false,
    country: 'Poland',
  },
  {
    id: 82,
    name: 'Oslo',
    visited: false,
    wishlist: false,
    country: 'Norway',
  },
]

const getMockResults = (cityList: CityType[]) => {
  return {
    data: {
      cities: {
        total: cityList.length,
        cities: cityList,
      },
    },
  }
}

export const clientMock = [
  {
    request: {
      query: CITY_FILTER,
      variables: {
        filter: { name: 'Lo' },
      },
    },
    result: getMockResults(mockCityList),
  },
  {
    request: {
      query: UPDATE_CITY,
      variables: {
        input: {
          visited: true,
          wishlist: false,
          id: 82,
        },
      },
    },
    result: { data: { updateCity: { ...mockCityList[3], visited: true } } },
  },
  {
    request: {
      query: CITY_FILTER,
      variables: {
        filter: { visited: true },
      },
    },
    result: getMockResults(mockCityList.filter(item => item.visited)),
  },
  {
    request: {
      query: CITY_FILTER,
      variables: {
        filter: { wishlist: true },
      },
    },
    result: getMockResults(mockCityList.filter(item => item.wishlist)),
  },
] as MockedResponse[]
