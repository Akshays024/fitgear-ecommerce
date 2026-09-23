
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../services/orderService'

const Orders = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)
    const orders = useSelector(state => state.orders.orders)
    const loading = useSelector(state => state.orders.loading)
    const error = useSelector(state => state.orders.error)

    useEffect(() => {
        if (user) {
            dispatch(fetchOrders(user.id))
        }
    }, [dispatch, user])

    if (!user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-slate-500">Please login to view your orders.</p>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-slate-500">Loading orders...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="rounded-lg bg-red-50 px-4 py-3 text-red-600">
                    {error}
                </p>
            </div>
        )
    }

    const userOrders = orders.filter(order => order.userId === user.id)

    if (userOrders.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
                <h2 className="text-xl font-semibold text-slate-800">
                    No orders found
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                    You haven't placed any orders yet.
                </p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    My Orders
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    View your recent orders and order details.
                </p>
            </div>

            <div className="space-y-6">
                {userOrders.map(order => (
                    <div
                        key={order.id}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4">
                            <div>
                                <p className="text-xs font-medium uppercase text-slate-400">
                                    Order ID
                                </p>

                                <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
                                    #{order.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase text-slate-400">
                                    Date
                                </p>

                                <p className="mt-1 text-sm text-slate-700">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase text-slate-400">
                                    Status
                                </p>

                                <span className="mt-1 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                    {order.status}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase text-slate-400">
                                    Total
                                </p>

                                <p className="mt-1 text-lg font-bold text-slate-900">
                                    ₹{order.total}
                                </p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-5">
                            <h3 className="mb-4 text-sm font-semibold text-slate-800">
                                Order Items
                            </h3>

                            <div className="space-y-4">
                                {order.items.map(item => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-16 w-16 rounded-lg bg-slate-50 object-contain p-2"
                                            />

                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    {item.title}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-sm font-semibold text-slate-800">
                                            ₹{item.price}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders
