import { Alert, AlertIcon, Checkbox, Flex, Spinner } from '@chakra-ui/react'
import type { ChangeEvent, FC } from 'react'
import { useUpdateCity } from '../../hooks/useUpdateCity'
interface CityCardProps {
  id: number
  visited: boolean
  wishlist: boolean
}

export const EditCardMenu: FC<CityCardProps> = ({ id, visited, wishlist }) => {
  const { loading, error, onUpdateVisited, onUpdateWishlist } = useUpdateCity()

  const onChangeVisited = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdateVisited({ id, visited: e.target.checked, wishlist })
  }

  const onChangeWishlist = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdateWishlist({ id, visited, wishlist: e.target.checked })
  }

  return (
    <>
      {loading && <Spinner aria-label="edit-card-spinner" mt="1rem" />}
      {error && (
        <Alert mt="1rem" status="error">
          <AlertIcon />
          There was an error updating your city
        </Alert>
      )}
      {!loading && (
        <Flex mt="1rem" direction="column">
          <Checkbox aria-label="visited-checkbox" isDisabled={loading} isChecked={visited} onChange={onChangeVisited}>
            Visited
          </Checkbox>
          <Checkbox
            aria-label="wishlist-checkbox"
            isDisabled={loading}
            isChecked={wishlist}
            onChange={onChangeWishlist}
          >
            Wish List
          </Checkbox>
        </Flex>
      )}
    </>
  )
}
