/* eslint-disable react/prop-types */
import { TopMenu } from '../TopMenu/TopMenu'
import './ProductsDetails.css'
import { useParams } from "react-router-dom"


export function ProductsDetails ({ products }) {
  const { productTitle } = useParams()
  const cleanedProductTitle = productTitle.substring(1)
  const product = products.find(product => product.title === cleanedProductTitle)
  if(!product) return <h1>Producto no encontrado...</h1>
  return (
    <>
      <TopMenu />
      <article className="product-article">
        <div className="product-title">
          <h1>{product.title}</h1>
          <h2>$ {product.price}</h2>
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