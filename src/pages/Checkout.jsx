import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from '../services/orderService'
import { clearCart } from '../redux/slices/cartSlice'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart.cart) || []
  const user = useSelector((state) => state.auth?.user)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const subTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (
      !name.trim() ||
      !email.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pincode.trim() ||
      !phone.trim()
    ) {
      return setError('All fields are required!')
    }

    const orderData = {
      userId: user?.id,
      shipping: {
        name,
        email,
        address,
        city,
        pincode,
        phone
      },
      items: cart,
      subtotal: subTotal,
      total: subTotal,
      status: 'placed',
      createdAt: new Date().toISOString()
    }

    try {
      setLoading(true)
      await dispatch(createOrder(orderData)).unwrap()
      dispatch(clearCart())
      navigate('/orders')
    } catch (err) {
      setError(err?.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="mt-1 text-sm text-slate-500">
          Add items to your cart before proceeding to checkout.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Checkout
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Shipping Form */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 lg:col-span-7">
            <h2 className="mb-6 text-lg font-bold text-slate-800">Shipping Information</h2>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 transition focus:border-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 transition focus:border-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Address
                </label>
                <textarea
                  rows="3"
                  placeholder="Street address, apartment, suite..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 transition focus:border-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 transition focus:border-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Pincode
                  </label>
                  <input
                    type="number"
                    placeholder="600001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 transition focus:border-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Phone Number
                </label>
                <input
                  type="number"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 transition focus:border-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/*order summary */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 lg:col-span-5">
            <h2 className="mb-6 text-lg font-bold text-slate-800">Order Summary</h2>

            <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto pr-2">
              {cart.map((product) => (
                <div key={product.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    {product.image && (
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-50 p-1 border border-slate-100">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <p className="line-clamp-1 text-xs font-semibold text-slate-800">
                        {product.title}
                      </p>
                      <p className="text-xs text-slate-400">Qty: {product.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    ₹{product.price * product.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Items ({cart.length})</span>
                <span>₹{subTotal}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Shipping</span>
                <span className="text-emerald-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-extrabold text-slate-900">
                <span>Total Amount</span>
                <span>₹{subTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout