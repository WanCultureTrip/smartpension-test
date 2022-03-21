import type { ApolloError } from '@apollo/client'
import { useLazyQuery } from '@apollo/client'
import { CITY_FILTER } from '../graphql/CITY_FILTER.query'
import type { CityType } from '../types/city-types'

interface CitySearchReturn {
  cities: CityType[]
  onSearch: (searchTerm: string) => void
  loading: boolean
  error: ApolloError | undefined
}

export const useCitySearch = (): CitySearchReturn => {
  const [getCities, { loading, error, data }] = useLazyQuery(CITY_FILTER)

  const onSearch = (searchTerm: string) => {
    getCities({
      variables: {
        filter: {
          name: searchTerm,
        },
      },
    })
  }

  const cities = data?.cities?.cities || []

  return {
    cities,
    onSearch,
    loading,
    error,
  }
}
