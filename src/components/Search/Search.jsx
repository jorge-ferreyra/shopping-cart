/* eslint-disable react/prop-types */
import { useLocation } from 'react-router-dom'
import { TopMenu } from '../TopMenu/TopMenu'
import { Cart } from '../Cart/Cart'
import './Search.css'
import { useCart } from '../../hooks/useCart'

export function Search ({ products }) {
  const { previousPrice } = useCart()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q');

  const matchingProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (matchingProducts.length === 0) {
    return <h1>Products not found......</h1>
  }

  return (
    <section className='search-section'>
      <TopMenu />
      <Cart />
      <header className='search-header'>
        <h1>Search Results for product <span>{`${searchTerm}`}</span></h1>
      </header>
      
      <ul className='search-results'>
        {matchingProducts.map(product => (
          <li key={product.id}>
            <div className='results-head'>
              <h1>{product.title}</h1>
              <div className='results-head-price'>
                <h2>${previousPrice(product.discountPercentage, product.price)}</h2>
                <span>{product.discountPercentage}% OFF <del>${product.price}</del></span>
              </div>
            </div>
            <picture>
              <img src={product.thumbnail} alt={product.title} />
            </picture>
          </li>
        ))}
      </ul>
    </section>
  );
}