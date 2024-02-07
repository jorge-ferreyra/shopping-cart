import { products as listProducts } from '../../mocks/products.json'
import { Products } from '../Products/Products.jsx'
import { Header } from '../Header/Header.jsx'
import { Footer } from '../Footer/Footer.jsx'
import { TopMenu } from '../TopMenu/TopMenu.jsx'
import { Cart } from '../Cart/Cart.jsx'

import { useFilters } from '../../hooks/useFilters.jsx'

import { IS_DEVELOPMENT } from '../../config.js'

export function Home () {
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(listProducts)
  return (
    <section className='main-section'>
      <TopMenu />
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      { IS_DEVELOPMENT && <Footer />}
    </section>
  )
}