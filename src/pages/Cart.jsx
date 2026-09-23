import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeItem } from '../redux/slices/cartSlice'
import { Link, useNavigate} from 'react-router-dom'

const Cart = () => {
  const cart = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()
const navigate = useNavigate();
  //calculate order total
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  
  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="text-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 max-w-md w-full">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            🛒
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Your Cart is Empty</h2>
          <p className="text-sm text-slate-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/products"
            className="inline-flex w-full justify-center rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
          >
            Explore Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        
        <div className="mb-8 border-b border-slate-200/80 pb-4">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review your selected items and manage quantities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          
          <div className="lg:col-span-8 space-y-4">
            {cart.map((product) => {
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-md"
                >

                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {product.image && (
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="text-base font-bold text-slate-900 line-clamp-1">
                        {product.title}
                      </h2>
                      <p className="text-sm font-extrabold text-slate-900 mt-1">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>

                  
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    
                    
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-1">
                      <button
                        onClick={() => dispatch(decreaseQuantity(product.id))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 active:scale-95 transition"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-slate-800 w-6 text-center">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(product.id))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-100 active:scale-95 transition"
                      >
                        +
                      </button>
                    </div>

                    
                    <button
                      onClick={() => dispatch(removeItem(product.id))}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 px-3 py-2 rounded-xl transition-all active:scale-95"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              )
            })}
          </div>

          
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
            <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Total Items</span>
                <span className="font-semibold text-slate-800">
                  {cart.reduce((sum,item)=>sum+item.quantity,0)}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Total Price</span>
                <span className="text-2xl font-extrabold text-slate-900">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            <button onClick={()=>{
              navigate('/checkout')
            }} className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 active:scale-[0.99] hover:shadow-lg">
            
              Proceed to Checkout
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Cart