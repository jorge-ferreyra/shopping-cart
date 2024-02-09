/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { TopMenu } from '../TopMenu/TopMenu'
import './ProductsDetails.css'
import { useParams } from "react-router-dom"
import { useEffect } from 'react'
import { Cart } from '../Cart/Cart'
import { CardProduct } from './CardProduct'



const previousPrice = (percentage, price) => {
  const discount = percentage * price / 100
  const finalPrice = price - discount
  return finalPrice.toFixed(2)
}

export function ProductsDetails ({ products }) {
  const { productTitle } = useParams()
  const cleanedProductTitle = productTitle.substring(1)
  const productInView = products.find(product => product.title === cleanedProductTitle)
  if(!productInView) return <h1>Producto no encontrado...</h1>

  
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <TopMenu />
      <Cart />
      <article className="product-article">
        <section className='cells'>
          <div className="product-title">
            <h1>{productInView.title}</h1>
            <h2>${previousPrice(productInView.discountPercentage, productInView.price)} <span>{productInView.discountPercentage}% OFF</span> <del>${productInView.price}</del></h2>
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