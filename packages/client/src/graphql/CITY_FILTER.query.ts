import { gql } from '@apollo/client'

export const CITY_FILTER = gql`
  query CityFilter($filter: CitiesFilters) {
    cities(filter: $filter) {
      total
      cities {
        id
        name
        country
        visited
        wishlist
      }
    }
  }
`
