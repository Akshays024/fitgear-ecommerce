import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../services/adminUserService'
import { getAllProducts } from '../services/adminProductService'
import { getAllOrders } from '../services/adminOrderService'
import { LineChart, XAxis, YAxis, Line, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import StatusCard from '../components/StatusCard'

const Dashboard = () => {
  const products = useSelector(state => state.adminProducts.products)
  const users = useSelector(state => state.adminUsers.users)
  const orders = useSelector(state => state.adminOrders.orders)
  const dispatch = useDispatch()

  const total = orders.reduce((sum, item) => {
    return sum + item.total;
  }, 0)

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllProducts())
    dispatch(getAllOrders())
  }, [dispatch])

  const salesData = orders.reduce((sales, item) => {
    const date = new Date(item.createdAt).toISOString().split("T")[0]
    if (sales[date]) {
      sales[date] = sales[date] + item.total
    }
    else {
      sales[date] = item.total
    }
    return sales
  }, {})

  const registrationData = users.reduce((registrations, user) => {
    if (user.role === "admin") return registrations;
    const userDate = new Date(user.createdAt).toISOString().split("T")[0]
    if (registrations[userDate]) {
      registrations[userDate] = registrations[userDate] + 1
    }
    else {
      registrations[userDate] = 1
    }
    return registrations
  }, {})

  const data = Object.entries(salesData).map(([date, sales]) => {
    return { date, sales }
  })

  const userData = Object.entries(registrationData).map(([date, registrations]) => {
    return { date, registrations }
  })

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-[1200px] mx-auto">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Total Products"
          value={products?.length || 0}
        />

        <StatusCard
          title="Total Users"
          value={users?.length || 0}
        />

        <StatusCard
          title="Total Orders"
          value={orders?.length || 0}
        />

        <StatusCard
          title="Total Sales"
          value={`₹${total}`}
        />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm min-w-0">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Sales Analytics</h2>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm min-w-0">
          <h2 className="text-base font-semibold text-gray-800 mb-4">User Registrations</h2>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="registrations" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard