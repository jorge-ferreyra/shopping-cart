import { Products } from '../Products/Products.jsx'
import { Footer } from '../Footer/Footer.jsx'
import { TopMenu } from '../TopMenu/TopMenu.jsx'
import { Cart } from '../Cart/Cart.jsx'

// eslint-disable-next-line react/prop-types
export function Home ({ products }) {
  return (
    <section className='main-section'>
      <TopMenu />
      <h1>React Shop</h1>
      <Cart />
      <Products products={products} />
      <Footer />
    </section>
  )
}