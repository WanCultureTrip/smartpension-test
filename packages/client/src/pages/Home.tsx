import React, { useState } from 'react'
import type { FC, KeyboardEvent } from 'react'
import {
  Container,
  InputRightElement,
  Input,
  Heading,
  InputGroup,
  IconButton,
  VStack,
  Progress,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { CityList } from '../components/CityList/CityList'
import { useCitySearch } from '../hooks/useCitySearch'

export const Home: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { cities, loading, error, onSearch } = useCitySearch()

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm)
    }
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input
            aria-label="search-input"
            onKeyDown={handleKeyDown}
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <InputRightElement
            children={
              <IconButton onClick={() => onSearch(searchTerm)} aria-label="search-button" icon={<Search2Icon />} />
            }
          />
        </InputGroup>

        {loading && <Progress m="1rem" size="xs" isIndeterminate />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        )}
        <CityList cityList={cities} showEditMenu />
      </Container>
    </VStack>
  )
}
