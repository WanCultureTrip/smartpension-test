import { SimpleGrid } from '@chakra-ui/react'
import type { FC } from 'react'
import type { CityType } from '../../types/city-types'
import { CityCard } from '../CityCard/CityCard'

interface CityLKistProps {
  cityList: CityType[]
  showEditMenu?: boolean
}

export const CityList: FC<CityLKistProps> = ({ cityList, showEditMenu = false }) => {
  return (
    <SimpleGrid aria-label="city-list" minChildWidth="200px" spacing="40px" mt="2rem">
      {cityList.map(city => (
        <CityCard key={city.id} city={city} showEditMenu={showEditMenu} />
      ))}
    </SimpleGrid>
  )
}
