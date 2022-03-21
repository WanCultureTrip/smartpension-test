import type { ApolloCache, ApolloError } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { CITY_FILTER } from '../graphql/CITY_FILTER.query'
import { UPDATE_CITY } from '../graphql/UPDATE_CITY.query'
import type { CitiesType, CityType, UpdateType } from '../types/city-types'

interface VisitedWishListType {
  visited?: boolean
  wishlist?: boolean
}

interface UpdateCityReturn {
  loading: boolean
  error: ApolloError | undefined
  onUpdateVisited: (update: UpdateType) => void
  onUpdateWishlist: (update: UpdateType) => void
}

const updateCache = (filter: VisitedWishListType, store: ApolloCache<CitiesType>, data: { updateCity: CityType }) => {
  const cachedData = store.readQuery<CitiesType>({
    query: CITY_FILTER,
    variables: { filter },
  })

  // remove/add city to cache
  if (cachedData) {
    // add update remove
    const cachedCities = cachedData?.cities?.cities || []
    let updatedCities = [...cachedCities]

    const itemIndex = updatedCities.findIndex(city => city.id === data.updateCity.id)
    if (itemIndex === -1) {
      // add to cache
      updatedCities = [...cachedCities, data?.updateCity]
    } else {
      // remove from cache
      updatedCities.splice(itemIndex, 1)
    }

    store.writeQuery({
      query: CITY_FILTER,
      variables: { filter },
      data: {
        cities: {
          ...cachedData.cities,
          cities: updatedCities,
          total: updatedCities.length,
        },
      },
    })
  }
}

export const useUpdateCity = (): UpdateCityReturn => {
  const [updateCity, { loading, error }] = useMutation(UPDATE_CITY)

  // @ TODO these can be merged, the only difference is the filter
  const onUpdateVisited = useCallback((update: UpdateType) => {
    updateCity({
      variables: {
        input: update,
      },
      update: (store, { data }) => {
        updateCache({ visited: true }, store, data)
      },
    })
  }, [])

  const onUpdateWishlist = useCallback((update: UpdateType) => {
    updateCity({
      variables: {
        input: update,
      },
      update: (store, { data }) => {
        updateCache({ wishlist: true }, store, data)
      },
    })
  }, [])

  return {
    loading,
    error,
    onUpdateVisited,
    onUpdateWishlist,
  }
}
