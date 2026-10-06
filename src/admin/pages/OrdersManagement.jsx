import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, updateOrderStatus } from '../services/adminOrderService'
import DataTable from '../components/DataTable'
import Pagination from '../components/Pagination'


const OrdersManagement = () => {
  const orders = useSelector(state => state.adminOrders.orders)
  const loading = useSelector(state => state.adminOrders.loading)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5
  const [sort, setSort] = useState("all")

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  const viewOrderById = (orderId) => {
    setSelectedOrder(orders.find(order => order.id === orderId))
  }

  const filteredOrder = orders.filter((order) => {
    return statusFilter === "all" || order.status === statusFilter
  })

  const sortedOrders = [...filteredOrder].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  const totalOrders = sortedOrders.length
  const totalPages = Math.ceil(totalOrders / ordersPerPage) || 1

  const startIndex = (currentPage - 1) * ordersPerPage

  const priceSort = [...orders].sort((a, b) => {
    if (sort === "low-high") {
      return a.total - b.total
    }
    if (sort === "high-low") {
      return b.total - a.total
    }
  })

  const currentOrders = priceSort.slice(
    startIndex,
    startIndex + ordersPerPage
  )


  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilter])

  const columns = [
    {
      header: "Order ID",
      accessor: "id"
    },
    {
      header: "Customer",
      render: (order) => {
        return (
          order.shipping?.name || "N/A"
        )
      }
    },
    {
      header: "Total Amount",
      accessor: "total"
    },
    {
      header: "Status",
      render: (order) => (
        <select
          value={order.status}
          onChange={(e) => {
            dispatch(updateOrderStatus({
              id: order.id,
              status: e.target.value
            }))
          }}
          className="py-1 px-2 rounded-md border border-gray-300 bg-white text-xs cursor-pointer focus:outline-none"
        >
          <option value="placed">Placed</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>

        </select>
      )
    },
    {
      header: "Date",
      render: (order) => (
        new Date(order.createdAt).toLocaleDateString()
      )
    },
    {
      header: "Action",
      render: (order) => {
        return (
          <button
            onClick={() => viewOrderById(order.id)}
            className="py-1 px-3 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition"
          >
            View
          </button>
        )
      }
    }
  ]

  return (
    <div className="w-full max-w-[1100px] my-4 sm:my-7 mx-auto px-4 sm:px-5 font-sans text-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h1 className="text-xl sm:text-2xl font-semibold">Order Management</h1>

        <div className='flex'>
          <select value={sort} onChange={(e) => {
          setSort(e.target.value)
        }}>
          <option value="high-low">Price:Hight to Low</option>
          <option value="low-high">Price:Low to High</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto py-1.5 px-3 rounded-md border border-gray-300 bg-white text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-800"
        >
          <option value="all">All Statuses</option>
          <option value="placed">Placed</option>
          <option value="shipped">Shipped</option>
          <option value="processing">Processing</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="confirmed">Confirmed</option>
        </select>
        </div>


      </div>



      {loading && <p className="text-gray-500 text-sm mb-4">Loading....</p>}


      <div className="block md:hidden space-y-4">
        {currentOrders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start border-b border-gray-100 pb-2">
              <div>
                <span className="text-xs text-gray-500 block">Order ID</span>
                <span className="font-medium text-sm">{order.id}</span>
              </div>
              <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-xs text-gray-500 block">Customer</span>
                <span>{order.shipping?.name || 'N/A'}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Total</span>
                <span className="font-semibold">₹{order.total}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 gap-2">
              <select
                value={order.status}
                onChange={(e) => {
                  dispatch(updateOrderStatus({
                    id: order.id,
                    status: e.target.value
                  }))
                }}
                className="py-1 px-2 rounded-md border border-gray-300 bg-white text-xs focus:outline-none"
              >
                <option value="placed">placed</option>
                <option value="confirmed">confirmed</option>
                <option value="processing">processing</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
              </select>

              <button
                onClick={() => viewOrderById(order.id)}
                className="py-1 px-3 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>


      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <DataTable
          data={currentOrders}
          columns={columns}
        />
      </div>

      {selectedOrder && (
        <div className="mt-6 p-4 sm:p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mt-0 mb-4">
            Selected Order Details
          </h3>

          {/* Order Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5 text-sm">
            <p className="m-0">
              <strong>ID:</strong> {selectedOrder.id}
            </p>

            <p className="m-0">
              <strong>Customer:</strong> {selectedOrder.shipping?.name}
            </p>

            <p className="m-0">
              <strong>Status:</strong> {selectedOrder.status}
            </p>

            <p className="m-0">
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Products */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold mb-3">Products</h4>

            <div className="space-y-3">
              {selectedOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {item.title}
                    </p>

                    <p className="text-xs text-gray-500">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-sm">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center border-t border-gray-200 mt-4 pt-4">
            <span className="font-semibold">
              Total
            </span>

            <span className="text-lg font-bold">
              ₹{selectedOrder.total}
            </span>
          </div>

          <button
            onClick={() => setSelectedOrder(null)}
            className="mt-4 py-1.5 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded text-xs hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>

  )
}

export default OrdersManagement