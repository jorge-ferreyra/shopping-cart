import './App.css'
import { products as listProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'
import { useFilters } from './hooks/useFilters.jsx'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'

///import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import { TopMenu } from './components/TopMenu.jsx'

function App() {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(listProducts)

  return (
    <CartProvider>
      <section className='main-section'>
        <TopMenu />
        <Header />
        <Cart />
        <Products products={filteredProducts} />
        { IS_DEVELOPMENT && <Footer />}
      </section>
    </CartProvider>
  )
}

export default App
