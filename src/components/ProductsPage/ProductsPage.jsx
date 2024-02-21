/* eslint-disable react/prop-types */
import searchImg from '../../img/search.svg'
import './ProductsPage.css'
import { TopMenu } from "../TopMenu/TopMenu.jsx"
import { Cart } from '../Cart/Cart.jsx'
import { Link } from 'react-router-dom'
import { AddToCartIcon, RemoveFromCartIcon } from '../Icons/Icons.jsx'
import { useCart } from '../../hooks/useCart.jsx'
import { Header } from '../Header/Header.jsx'
import { Footer } from '../Footer/Footer.jsx'
import { useState } from 'react'

export function ProductsPage ({ products }) {
  const { addToCart, removeFromCart, checkProductInCart, previousPrice } = useCart()
  const [browser, setBrowser] = useState('')

  const handleInputChange = (event) => {
    const value = event.target.value
    setBrowser(value)
  }

  return (
    <>
      <TopMenu />
      <section className="products-section">
        <h1>Products</h1>
        <form className='searchProduct' action="">
          <input id='searchProducts' type="text" placeholder='Enter a product to search...' value={browser} onChange={handleInputChange}/>
          <Link to={`/products/search?q=${browser}`}>
            <img src={searchImg} alt="" />
          </Link>
        </form>
        <Header />
        <div className='products-main'>
          <ul className='products-list'>
            {products.map(product => {
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
        </div>
        
      </section>
      <Cart />
      <Footer />
    </>
  )
}