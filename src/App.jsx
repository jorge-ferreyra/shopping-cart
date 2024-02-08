import './App.css'
import { products as listProducts } from './mocks/products.json'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home/Home.jsx'
import { ProductsPage } from './components/ProductsPage/ProductsPage.jsx'
import { CartPage } from './components/CartPage/CartPage.jsx'
import { CartProvider } from './context/cart.jsx'
import { ProductsDetails } from './components/ProductDetails/ProductsDetails.jsx'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<ProductsPage products={listProducts} />}/>
          <Route path='/cart' element={<CartPage />}/>
          <Route path='/products/:productTitle' element={<ProductsDetails products={listProducts}/>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
