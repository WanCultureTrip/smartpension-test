import { Box, Text } from '@chakra-ui/react'
import type { FC } from 'react'
import type { CityType } from '../../types/city-types'
import { EditCardMenu } from './EditCardMenu'

interface CityCardProps {
  city: CityType
  showEditMenu?: boolean
}

export const CityCard: FC<CityCardProps> = ({ city, showEditMenu = false }) => {
  const { id, name, country, visited, wishlist } = city

  return (
    <Box aria-label="city-card" key={id} bg="" border="1px" borderColor="gray.200" borderRadius=".5rem" padding="1rem">
      <Text textAlign="left" fontWeight="bold">
        {name}
      </Text>
      <Text textAlign="left">{country}</Text>
      {showEditMenu && <EditCardMenu id={id} visited={visited} wishlist={wishlist} />}
    </Box>
  )
}
