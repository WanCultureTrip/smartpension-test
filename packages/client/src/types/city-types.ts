export interface CityType {
  id: number
  name: string
  country: string
  visited: boolean
  wishlist: boolean
}

export interface UpdateType {
  id: number
  visited: boolean
  wishlist: boolean
}

export interface VisitedWishListFilter {
  visited?: boolean
  wishlist?: boolean
}

export interface CitiesType {
  cities: { cities: CityType[]; total: number }
}
