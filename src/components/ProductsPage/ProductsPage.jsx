/* eslint-disable react/prop-types */
import './ProductsPage.css'
import { TopMenu } from "../TopMenu/TopMenu.jsx"
import { Cart } from '../Cart/Cart.jsx'

import { AddToCartIcon, RemoveFromCartIcon } from '../Icons/Icons.jsx'
import { useCart } from '../../hooks/useCart.jsx'

export function ProductsPage ({ products }) {
  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }
  return (
    <>
      <TopMenu />
      <section className="products-section">
        <h1>Products</h1>
        <form className='searchProduct' action="">
          <label id='searchProducts' htmlFor="searchProducts">Search:</label>
          <input id='searchProducts' type="text" placeholder='Enter a product to search...' />
        </form>
        <div className='products-main'>
          <ul className='products-list'>
            {products.map(product => {
              const isProductInCart = checkProductInCart(product)
              return (
                <li key={product.id}>
                  <img src={product.thumbnail} alt={product.title} />
                  <div>
                    <a>{product.title}</a> - ${product.price}
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
        </div>
        
      </section>
      <Cart />
    </>
  )
}