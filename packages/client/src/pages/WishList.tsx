import React from 'react'
import type { FC } from 'react'
import { Alert, AlertIcon, Container, Heading, Progress } from '@chakra-ui/react'
import { CityList } from '../components/CityList/CityList'
import { CITY_FILTER } from '../graphql/CITY_FILTER.query'
import { useQuery } from '@apollo/client'

export const WishList: FC = () => {
  const { loading, error, data } = useQuery(CITY_FILTER, {
    variables: {
      filter: { wishlist: true },
    },
    // fetchPolicy: 'network-only', // this is no longer needed becuase update cache is used
  })

  const cities = data?.cities?.cities || []

  return (
    <>
      <Heading as="h1">Wish list</Heading>
      <Container maxW="container.md">
        {loading && <Progress m="1rem" size="xs" isIndeterminate />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        )}
        <CityList cityList={cities} />
      </Container>
    </>
  )
}
