import { products as listProducts } from '../../mocks/products.json'
import { Products } from '../Products/Products.jsx'
import { Footer } from '../Footer/Footer.jsx'
import { TopMenu } from '../TopMenu/TopMenu.jsx'
import { Cart } from '../Cart/Cart.jsx'

export function Home () {
  return (
    <section className='main-section'>
      <TopMenu />
      <h1>React Shop</h1>
      <Cart />
      <Products products={listProducts} />
      <Footer />
    </section>
  )
}