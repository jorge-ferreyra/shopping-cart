import './App.css'
import { products as listProducts } from './mocks/products.json'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home/Home.jsx'
import { ProductsPage } from './components/ProductsPage/ProductsPage.jsx'
import { CartPage } from './components/CartPage/CartPage.jsx'
import { ProductsDetails } from './components/ProductDetails/ProductsDetails.jsx'
import { useFilters } from './hooks/useFilters.jsx'
import { Search } from './components/Search/Search.jsx'

function App() {
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(listProducts)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<ProductsPage products={filteredProducts} />}/>
        <Route path='/cart' element={<CartPage />}/>
        <Route path='/products/:productTitle' element={<ProductsDetails products={listProducts}/>}/>
        <Route path='/products/search' element={<Search products={listProducts}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
