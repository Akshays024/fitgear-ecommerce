import React, { useEffect, useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { restoreUser } from './redux/slices/authSlice'
import { restoreCart } from './redux/slices/cartSlice'
import { restoreWishlist } from './redux/slices/wishListSlice'
const App = () => {
  const [cartInitialized, setCartInitialized] = useState(false)
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart)
  const wishlist = useSelector(state => state.wishlist);
    const [storageInitialized, setStorageInitialized] = useState(false)

  
  useEffect(() => {
    const user = localStorage.getItem('user')
    const parsedUser = (user ? JSON.parse(user) : null)
    dispatch(restoreUser(user ? JSON.parse(user) : null))

    if (parsedUser) {
      const wishlistKey = "wishlist_" + parsedUser.id;
      const savedWishlist = localStorage.getItem(wishlistKey);
      if (savedWishlist) {
        dispatch(restoreWishlist(JSON.parse(savedWishlist)))
      }
      


      const cartKey = "cart_" + parsedUser.id
      const savedCart = localStorage.getItem(cartKey)
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        dispatch(restoreCart(cart))
      }
    }
    setCartInitialized(true)
    setStorageInitialized(true)
  }, [])


  useEffect(() => {
    const user = localStorage.getItem('user')
    const parsedUser = (user ? JSON.parse(user) : null)
    if (parsedUser && cartInitialized) {
      const cartKey = "cart_" + parsedUser.id
      localStorage.setItem(cartKey, JSON.stringify(cart))
    }

  }, [cart, cartInitialized])


  useEffect(() => {
    const user = localStorage.getItem('user')
    const parsedUser = user ? JSON.parse(user) : null

    if (parsedUser && storageInitialized) {
      const wishlistKey = "wishlist_" + parsedUser.id

      localStorage.setItem(
        wishlistKey,
        JSON.stringify(wishlist)
      )
    }
  }, [wishlist, storageInitialized])


  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  )
}

export default App