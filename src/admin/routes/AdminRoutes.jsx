import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/AdminLogin'
import AdminProtectedRoute from './AdminProtectedRoute'
import Dashboard from '../pages/Dashboard'
import AdminLayout from '../layouts/AdminLayout'
import ProductsManagement from '../pages/ProductsManagement'
import UserManagement from '../pages/UserManagement'
import OrdersManagement from '../pages/OrdersManagement'

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={
          <AdminProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </AdminProtectedRoute>
        } />
        <Route path='/admin/products' element={
          <AdminProtectedRoute>
            <AdminLayout >
              <ProductsManagement />
            </AdminLayout>
          </AdminProtectedRoute>
        } />
        <Route path='/admin/users' element={
          <AdminProtectedRoute>
            <AdminLayout >
              <UserManagement />
            </AdminLayout>
          </AdminProtectedRoute>
        } />
        <Route path='/admin/orders' element={
          <AdminProtectedRoute>
            <AdminLayout>
              <OrdersManagement />
            </AdminLayout>
          </AdminProtectedRoute>
        } />
      </Routes>
      
    </>
  )
}

export default AdminRoutes