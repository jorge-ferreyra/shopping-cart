import { products as listProducts } from '../../mocks/products.json'
import { Products } from '../Products/Products.jsx'
import { Footer } from '../Footer/Footer.jsx'
import { TopMenu } from '../TopMenu/TopMenu.jsx'
import { Cart } from '../Cart/Cart.jsx'
import { useEffect } from 'react'

export function Home () {
  useEffect(() =>       {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }, [])
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