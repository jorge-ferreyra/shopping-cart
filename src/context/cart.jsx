/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer, useState } from "react";

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
  case 'REMOVE_ONE_FROM_CART': {
    const { id } = actionPayload
    const productInCartIndex = state.findIndex(item => item.id === id)

    if (productInCartIndex >= 0) {
      const newState = structuredClone(state)
      newState[productInCartIndex].quantity -= 1
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

  const removeOneFromCart = product => dispatch({
    type: 'REMOVE_ONE_FROM_CART',
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

  return { cart: state, addToCart, removeOneFromCart, removeFromCart, clearCart }
}

export function CartProvider ({ children }) {
  const [totalToPay, setTotalToPay] = useState(0)
  const [animationButton, setAnimationButton] = useState('')
  const [randomProducts, setRandomProducts] = useState([])

  const { cart, addToCart, removeOneFromCart, removeFromCart, clearCart } = useCartReducer()

  const previousPrice = (percentage, price) => {
    const discount = percentage * price / 100
    const finalPrice = price - discount
    return finalPrice.toFixed(2)
  }

  useEffect(() => {
    const calculateTotalToPay = () => {
      let total = 0
      cart.forEach(item => {
        let netPrice = item.price - (item.discountPercentage * item.price / 100)
        total += netPrice.toFixed(2) * item.quantity
      })
      setTotalToPay(total.toFixed(2))
    }
    calculateTotalToPay()
  }, [cart])

  const totalPriceProduct = (price, quantity) => {
    return (price * quantity).toFixed(2)
  }

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id && item.quantity > 0)
  }

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeOneFromCart, removeFromCart, clearCart, checkProductInCart,
      animationButton, setAnimationButton, randomProducts, setRandomProducts,
      previousPrice, totalPriceProduct, totalToPay
    }}>
      {children}
    </CartContext.Provider>
  )
}