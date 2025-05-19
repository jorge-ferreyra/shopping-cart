import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home/Home.jsx'
import { ProductsPage } from './components/ProductsPage/ProductsPage.jsx'
import { CartPage } from './components/CartPage/CartPage.jsx'
import { ProductsDetails } from './components/ProductDetails/ProductsDetails.jsx'
import { useFilters } from './hooks/useFilters.jsx'
import { Search } from './components/Search/Search.jsx'

import { useState, useEffect } from 'react'

const API_URL = 'https://dummyjson.com/products'

function App() {
  const [initialProducts, setInitialProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { filterProducts } = useFilters()

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(API_URL)
      .then(response => {
        if(!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`)
        }
        return response.json()
      })
      .then(data => {
        console.log(data)
        if (data && data.products) {
          const fetchedProducts = data.products.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            brand: product.brand,
            category: product.category,
            thumbnail: product.thumbnail,
            images: product.images,
            tags: product.tags,
            sku: product.sku,
            weight: product.weight,
            dimensions: product.dimensions,
            warrantyInformation: product.warrantyInformation,
            shippingInformation: product.shippingInformation,
            availabilityStatus: product.availabilityStatus,
            reviews: product.reviews,
            returnPolicy: product.returnPolicy,
            minimumOrderQuantity: product.minimumOrderQuantity,
            meta: product.meta
          }))
          setInitialProducts(fetchedProducts)
        } else {
          throw new Error("Data format from API is not as expected.")
        }
      })
      .catch(error => {
        console.error("Failed to fetch products:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  let filteredProducts = filterProducts(initialProducts)

  if (loading) {
    return <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '2rem' }}>Loading products...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red', fontSize: '1.5rem', marginTop: '2rem' }}>Error: {error}</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home products={initialProducts} />}/>
        <Route path='/products' element={<ProductsPage products={filteredProducts} />}/>
        <Route path='/cart' element={<CartPage />}/>
        <Route path='/products/:productId' element={<ProductsDetails products={initialProducts}/>}/>
        <Route path='/products/search' element={<Search products={initialProducts}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
