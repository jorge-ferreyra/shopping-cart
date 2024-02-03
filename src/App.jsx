import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { Header } from './components/Header.jsx'
import { useState } from 'react'
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'
import { useFilters } from './hooks/useFilters.jsx'

function App() {
  const [products] = useState(initialProducts)
  const { filterProducts, filters } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header />
      <Products products={filteredProducts} />
      { IS_DEVELOPMENT && <Footer filters={filters} />}
    </>
  )
}

export default App
