/* eslint-disable react/prop-types */
import { useCart } from '../../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from '../Icons/Icons'
import { Link } from 'react-router-dom'

const randomProducts = (products, count) => {
  const shuffledProducts = products.sort(() => Math.random() - 0.5)
  return shuffledProducts.slice(0, count)
}

export function CardProduct ({ classTitle, title, products, productInView }) {
  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }
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
                  <div>
                    <Link to={`/products/:${product.title}`}>{product.title}</Link>
                  </div>
                  <div>
                    <p>$ {product.price}</p>
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
    const newProducts = randomProducts(products, 6)
    return (
      <div className={`card-${classTitle}`}>
        <h2>{title}</h2>
        <ul>
          {newProducts.map(product => {
            const isProductInCart = checkProductInCart(product)
            return (
              <li key={product.id}>
                <img src={product.thumbnail} alt="" />
                <div>
                  <Link to={`/products/:${product.title}`}>{product.title}</Link>
                </div>
                <div>
                  <p>$ {product.price}</p>
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