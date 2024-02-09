import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/cart.jsx'
import { FiltersProvider } from './context/filters.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <FiltersProvider>
      <App />
    </FiltersProvider>
  </CartProvider>
  
)
