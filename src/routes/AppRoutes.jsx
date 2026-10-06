import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Products from '../pages/Products'
import ProtectedRoute from '../components/ProtectedRoute'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import WishList from '../pages/WishList'
import Checkout from '../pages/Checkout'
import Orders from '../pages/Orders'
import Profile from '../pages/Profile'
import UserLayout from '../layouts/UserLayout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route
          path='/cart'
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path='/checkout'
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path='/orders'
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/wishlist'
          element={
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          }
        />
        <Route
          path='/products/:id'
          element={<ProductDetails />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes