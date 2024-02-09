/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useCart } from '../../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from '../Icons/Icons'
import { Link } from 'react-router-dom'

export function CardProduct ({ classTitle, title, products, productInView }) {
  const { addToCart, removeFromCart, previousPrice, checkProductInCart, randomProducts, setRandomProducts } = useCart()
  
  useEffect(() => {
    const randomProduct = () => {
      const shuffledProducts = products.sort(() => Math.random() - 0.5)
      setRandomProducts(shuffledProducts)
    }

    randomProduct()
  }, [productInView])

  if (classTitle === 'similars') {
    return (
      <div className={`card-${classTitle}`}>
        <h2>{title}</h2>
        <ul>
          {products.map(product => {
            const isProductInCart = checkProductInCart(product)
            if (product.category === productInView.category && product.id !== productInView.id) {
              return (
                <li key={product.id}>
                  <img src={product.thumbnail} alt="" />
                  <div className='products-details'>
                    <Link to={`/products/:${product.title}`}>{product.title}</Link>
                    <br />
                    $ {previousPrice(product.discountPercentage, product.price)} <span>{product.discountPercentage}</span> <del>${product.price}</del>
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
            }
          })}
        </ul>
      </div>
    )
  } else {
    const newProducts = randomProducts.slice(0, 5)
    return (
      <div className={`card-${classTitle}`}>
        <h2>{title}</h2>
        <ul>
          {newProducts.map(product => {
            const isProductInCart = checkProductInCart(product)
            return (
              <li key={product.id}>
                <img src={product.thumbnail} alt="" />
                <div className='products-details'>
                  <Link to={`/products/:${product.title}`}>{product.title}</Link>
                  <br />
                  $ {previousPrice(product.discountPercentage, product.price)} <span>{product.discountPercentage}</span> <del>${product.price}</del>
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
    )
  }
}