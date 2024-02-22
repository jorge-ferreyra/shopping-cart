/* eslint-disable react/prop-types */
import { useLocation } from 'react-router-dom'
import { TopMenu } from '../TopMenu/TopMenu'
import { Cart } from '../Cart/Cart'
import './Search.css'

export function Search ({ products }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q');

  const productInView = products.find(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  if (!productInView) return <h1>Product not found...</h1>;

  return (
    <section className='search-section'>
      <TopMenu />
      <Cart />
      <h1>{`Search Results for product ${productInView.title}`}</h1>
    </section>
  );
}