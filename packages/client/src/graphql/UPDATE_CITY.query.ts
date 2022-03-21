import { gql } from '@apollo/client'

export const UPDATE_CITY = gql`
  mutation UpdateCity($input: CitiesMutationInput) {
    updateCity(input: $input) {
      id
      name
      country
      visited
      wishlist
    }
  }
`
