import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home/Home.jsx'
import { ProductsPage } from './components/ProductsPage/ProductsPage.jsx'
import { CartPage } from './components/CartPage/CartPage.jsx'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<ProductsPage />}/>
        <Route path='/cart' element={<CartPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
