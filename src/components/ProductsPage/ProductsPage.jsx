import './ProductsPage.css'
import { CartProvider } from "../../context/cart.jsx"
import { TopMenu } from "../TopMenu/TopMenu.jsx"

export function ProductsPage () {
  return (
    <CartProvider>
      <TopMenu />
      <section className="products-section">
        <h1>Products</h1>
      </section>
    </CartProvider>
  )
}