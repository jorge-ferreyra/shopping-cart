import './App.css'
import { products as listProducts } from './mocks/products.json'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home/Home.jsx'
import { ProductsPage } from './components/ProductsPage/ProductsPage.jsx'
import { CartPage } from './components/CartPage/CartPage.jsx'
import { CartProvider } from './context/cart.jsx'


function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<ProductsPage products={listProducts} />}/>
          <Route path='/cart' element={<CartPage />}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
