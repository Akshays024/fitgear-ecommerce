import React, { useEffect, useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, restoreUser } from './redux/slices/authSlice'
import { restoreCart } from './redux/slices/cartSlice'
import { restoreWishlist } from './redux/slices/wishListSlice'
import { restoreAdmin } from './admin/redux/slices/adminSlice'
import AdminRoutes from './admin/routes/AdminRoutes'
import { API_URL } from './constants/api'
import axios from 'axios'

const App = () => {
  const navigate = useNavigate()
  const [cartInitialized, setCartInitialized] = useState(false)
  const [storageInitialized, setStorageInitialized] = useState(false)
  const user = useSelector(state=>state.auth.user); 
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart.cart)
  const wishlist = useSelector(state => state.wishlist)
  
  useEffect(()=>{
    if (!user || user.role === "admin") return;
    const checkUser = async()=>{
      const response = await axios.get(`${API_URL}/users/${user.id}`)
    if(response.data.isBlocked === true){
      dispatch(logout())
      localStorage.removeItem("user");
      navigate("/login")
    }
  }
  checkUser();
  const interval = setInterval(()=>{
    checkUser();
  },5000)
  return()=>{
    clearInterval(interval)
  }
  },[user])

  useEffect(() => {
    const user = localStorage.getItem('user')
    const parsedUser = user ? JSON.parse(user) : null

    dispatch(restoreUser(parsedUser))

    const admin = localStorage.getItem('admin')
    const parsedAdmin = admin ? JSON.parse(admin) : null

    dispatch(restoreAdmin(parsedAdmin))

    if (parsedUser) {
      const wishlistKey = "wishlist_" + parsedUser.id
      const savedWishlist = localStorage.getItem(wishlistKey)

      if (savedWishlist) {
        dispatch(restoreWishlist(JSON.parse(savedWishlist)))
      }

      const cartKey = "cart_" + parsedUser.id
      const savedCart = localStorage.getItem(cartKey)

      if (savedCart) {
        const cart = JSON.parse(savedCart)
        dispatch(restoreCart(cart))
      }
    }

    setCartInitialized(true)
    setStorageInitialized(true)
  }, [])

  useEffect(() => {
    const user = localStorage.getItem('user')
    const parsedUser = user ? JSON.parse(user) : null

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
      
      <AdminRoutes />
      <AppRoutes />
      
    </>
  )
}

export default App