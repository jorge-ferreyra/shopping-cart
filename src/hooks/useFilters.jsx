import { useContext } from 'react'
import { FiltersContext } from '../context/filters.jsx'

export function useFilters () {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {
    return products.filter(product => {
      const realPrice = product.price - (product.discountPercentage * product.price / 100)
      return (
        realPrice >= filters.minPrice &&
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }
  return { filterProducts, filters, setFilters }
}