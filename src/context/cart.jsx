/* eslint-disable react/prop-types */
import { createContext, useReducer, useState } from "react";

export const CartContext = createContext()

const initialState = JSON.parse(window.localStorage.getItem('cart')) || []

const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
  case 'ADD_TO_CART': {
    const { id } = actionPayload
    const productInCartIndex = state.findIndex(item => item.id === id)

    if (productInCartIndex >= 0) {
      const newState = structuredClone(state)
      newState[productInCartIndex].quantity += 1
      updateLocalStorage(newState)
      return newState
    }

    const newState = [
      ...state,
      {
        ...actionPayload,
        quantity: 1
      }
    ]

    updateLocalStorage(newState)
    return newState
  }
  case 'REMOVE_FROM_CART': {
    const { id } = actionPayload
    const newState = state.filter(item => item.id !== id)
    updateLocalStorage(newState)
    return newState
  }
  case 'CLEAR_CART': {
    updateLocalStorage([])
    return []
  }
  }

  return state
}

const useCartReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = product => dispatch({
    type: 'CLEAR_CART',
    payload: product
  })

  return { cart: state, addToCart, removeFromCart, clearCart }
}

export function CartProvider ({ children }) {
  const { cart, addToCart, removeFromCart, clearCart} = useCartReducer()

  const [cartIcon, setCartIcon] = useState('off')

  const handleClickCartIcon = () => {
    const newCartIcon = cartIcon === 'off' ? 'on' : 'off'
    setCartIcon(newCartIcon)
    if(newCartIcon === 'on') {
      document.querySelector('.cart-button').classList.add('clicked')
    } else {
      document.querySelector('.cart-button.clicked').classList.remove('clicked')
    }
  }
  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, clearCart, handleClickCartIcon
    }}>
      {children}
    </CartContext.Provider>
  )
}