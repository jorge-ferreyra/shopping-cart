import './CartPage.css'
import { CartProvider } from "../../context/cart.jsx"
import { TopMenu } from "../TopMenu/TopMenu.jsx"
import { Footer } from '../Footer/Footer.jsx'
import { useCart } from '../../hooks/useCart.jsx'
import { ClearCartIcon, RemoveFromCartIcon } from '../Icons/Icons.jsx'
import { Link } from 'react-router-dom'

export function CartPage () {
  const { cart, removeOneFromCart, removeFromCart, clearCart, addToCart, previousPrice, totalPriceProduct, totalToPay } = useCart()

  return (
    <CartProvider>
      <TopMenu />
      <section className="cart-section">
        <h1>Cart</h1>
        <div className='cart-wrapper'>
          <div className='division-cells'>
            <ul>
              {cart.map(product => {if (product.quantity > 0) return (
                <li key={product.id}>
                  <div className='cart-image'>
                    <img src={product.thumbnail} alt={product.title} />
                  </div>
                  <div className='cart-details'>
                    <Link to={`/products/:${product.title}`} >{product.title}</Link>
                    <span>${previousPrice(product.discountPercentage, product.price)}</span>
                    <small>
                      Qty: {product.quantity}
                      <button onClick={() => removeOneFromCart(product)}>-</button>
                      <button onClick={() => addToCart(product)}>+</button>
                    </small>
                    <footer>
                      <button onClick={() => removeFromCart(product)}>
                        <RemoveFromCartIcon />
                      </button>
                    </footer>
                  </div>
                </li>
              )})}
            </ul>
            <div className='list-prices'>
              <h2>List of Prices</h2>
              <ul>
                {cart.map(product => {if (product.quantity > 0) return (
                  <>
                    <div className='cells-prices'>
                      <li>
                        <h3>{product.title}</h3>
                        <span>$ {previousPrice(product.discountPercentage, product.price)}</span>
                        <small>Quantity: {product.quantity}</small>
                        
                      </li>
                      <div className='total-of-product'>
                        <h4>$ {totalPriceProduct(previousPrice(product.discountPercentage, product.price), product.quantity)}</h4>
                      </div>
                    </div>
                  </>
                )})}
                <div className='total-prices'>
                  <h2>Total amount: <span>${totalToPay}</span></h2>
                </div>
                <button onClick={clearCart}>
                  <ClearCartIcon />
                </button>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </CartProvider>
    
  )
}