/* eslint-disable react/prop-types */
import './Footer.css'

export function Footer ({ filters }) {
  return (
    <footer className='footer'>
      {
        JSON.stringify(filters, null, 2)
      }
      {/*
        
        <h4>Prueba técnica de React</h4>
        <span>Jorge Ferreyra</span>
        <h5>Shopping Cart con useContext & useReducer</h5>
        
      */}
    </footer>
  )
}