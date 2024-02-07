import './CartPage.css'
import { CartProvider } from "../../context/cart.jsx"
import { TopMenu } from "../TopMenu/TopMenu.jsx"

export function CartPage () {
  return (
    <CartProvider>
      <TopMenu />
      <section className="cart-section">
        <h1>Cart</h1>
      </section>
    </CartProvider>
    
  )
}