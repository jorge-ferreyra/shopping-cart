/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import './Cart.css'
import { useEffect, useId } from "react";
import { CartIcon, ClearCartIcon } from "../Icons/Icons";
import { useCart } from '../../hooks/useCart';

function CartItem ({ thumbnail, price, title, quantity, addToCart, remove }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <small>
          Qty: {quantity}
        </small>
        <button onClick={remove}>-</button>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart, removeOneFromCart, animationButton, setAnimationButton } = useCart()

  useEffect(() => {
    setAnimationButton('')
  }, [])

  const handleChangeCart = () => {
    setAnimationButton(animationButton === 'open' ? 'close' : 'open')
  }

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId} onClick={handleChangeCart}>
        <CartIcon />
      </label>

      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className={`cart ${animationButton}`}>
        <ul>
          {cart.map(product => {if (product.quantity > 0) return (
            <CartItem key={product.id} {...product} addToCart={() => addToCart(product)} remove={() => removeOneFromCart(product)} />
          )})}
        </ul>
        <div className='cart-delete'>
          <button onClick={clearCart}>
            <ClearCartIcon />
          </button>
        </div>
        
      </aside>
    </>
  )
}