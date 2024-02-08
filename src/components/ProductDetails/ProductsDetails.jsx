/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { TopMenu } from '../TopMenu/TopMenu'
import './ProductsDetails.css'
import { useParams } from "react-router-dom"
import { useEffect } from 'react'
import { Cart } from '../Cart/Cart'

const previousPrice = (percentage, price) => {
  const discount = percentage * price / 100
  const finalPrice = price - discount
  return finalPrice.toFixed(2)
}

export function ProductsDetails ({ products }) {
  const { productTitle } = useParams()
  const cleanedProductTitle = productTitle.substring(1)
  const product = products.find(product => product.title === cleanedProductTitle)
  if(!product) return <h1>Producto no encontrado...</h1>
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <TopMenu />
      <Cart />
      <article className="product-article">
        <div className="product-title">
          <h1>{product.title}</h1>
          <h2>${previousPrice(product.discountPercentage, product.price)} <span>{product.discountPercentage}% OFF</span> <del>${product.price}</del></h2>
          <h3>Rating {product.rating}</h3>
          <p>Stock: {product.stock} units</p>
        </div>
        <div className="image-container">
          <img src={product.thumbnail} alt="" />
        </div>
        <div className='product-description'>
          <p>{product.description}</p>
        </div>
      </article>
    </>
  )
}