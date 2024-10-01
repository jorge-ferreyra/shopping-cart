/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { TopMenu } from '../TopMenu/TopMenu'
import './ProductsDetails.css'
import { useParams } from "react-router-dom"
import { useEffect } from 'react'
import { Cart } from '../Cart/Cart'
import { CardProduct } from './CardProduct'
import { useCart } from '../../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from '../Icons/Icons'

export function ProductsDetails ({ products }) {
  const { previousPrice, checkProductInCart, removeFromCart, addToCart, removeOneFromCart } = useCart()
  const { productTitle } = useParams()
  const cleanedProductTitle = productTitle.substring(1)
  const productInView = products.find(product => product.title === cleanedProductTitle)
  if(!productInView) return <h1>Product not found...</h1>

  const isProductInCart = checkProductInCart(productInView)
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productTitle])

  return (
    <>
      <TopMenu />
      <Cart />
      <article className="product-article">
        <section className='cells'>
          <div className="product-title">
            
            <h1>{productInView.title}</h1>
            <h2 className="product-brand">{productInView.brand}</h2>
            
            <div className='product-title-row'>
              <h2>${previousPrice(productInView.discountPercentage, productInView.price)} <span>{productInView.discountPercentage}% OFF</span> <del>${productInView.price}</del></h2>
              <button style={{backgroundColor: isProductInCart ? 'red' : '#09f'}} onClick={() => {
                isProductInCart
                  ? removeFromCart(productInView)
                  : addToCart(productInView)
              }}>
                {
                  isProductInCart
                    ? <RemoveFromCartIcon />
                    : <AddToCartIcon />
                }
              </button>
              <small className='product-stock'>
                Stock: {productInView.stock}
                <span>
                  <button onClick={() => removeOneFromCart(productInView)}>-</button>
                  <button onClick={() => addToCart(productInView)}>+</button>
                </span>
              </small>
            </div>
            <h3>Rating {productInView.rating}</h3>
            <p>Stock: {productInView.stock} units</p>
          </div>
          <div className="image-container">
            <img src={productInView.thumbnail} alt="" />
          </div>
          <div className='product-description'>
            <p>{productInView.description}</p>
            
          </div>
          <CardProduct classTitle='similars' title='Similar Products' products={products} productInView={productInView} />
          <CardProduct classTitle='recommendations' title='Recommended Products' products={products} productInView={productInView} />
        </section>
        
      </article>
    </>
  )
}