/* eslint-disable react/prop-types */
import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from '../Icons/Icons.jsx'
import { useCart } from '../../hooks/useCart.jsx'
import { Link } from 'react-router-dom'

export function Products ({ products }) {
  const { addToCart, removeFromCart, checkProductInCart, previousPrice } = useCart()

  return (
    <main className='products'>
      {products.length === 0 && <h1>Products not found...</h1>}
      <ul>
        {products.slice(0, 12).map(product => {
          const isProductInCart = checkProductInCart(product)
          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <Link to={`/products/:${product.title}`}>{product.title}</Link>
                <br />
                ${previousPrice(product.discountPercentage, product.price)} <span>{product.discountPercentage}% OFF</span> <del>${product.price}</del>
              </div>
              <div>
                <button style={{backgroundColor: isProductInCart ? 'red' : '#09f'}} onClick={() => {
                  isProductInCart
                    ? removeFromCart(product)
                    : addToCart(product)
                }}>
                  {
                    isProductInCart
                      ? <RemoveFromCartIcon />
                      : <AddToCartIcon />
                  }
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}