import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/productService'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import { addToWishList, removeFromWishList } from '../redux/slices/wishListSlice'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const wishlist = useSelector((state) => state.wishlist)
  const user = useSelector(state => state.auth.user)
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id)
  })

  const isWishlisted = product
    ? wishlist.some((item) => item.id === product.id)
    : false

  // loading state skelton
  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="h-96 bg-slate-200 rounded-2xl w-full" />
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/4" />
              <div className="h-8 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-20 bg-slate-200 rounded w-full" />
              <div className="h-8 bg-slate-200 rounded w-1/2 pt-4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // error state 
  if (isError || !product) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 max-w-md">
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">
            The product you are looking for does not exist or failed to load.
          </p>
          <Link
            to="/products"
            className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
          >
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            ← Back to Products
          </Link>
        </div>

        {/* Product Details Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left: Product Image */}
            <div className="relative h-80 sm:h-96 w-full rounded-2xl bg-slate-50 border border-slate-100 p-6 flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
              />
              {product.category && (
                <span className="absolute top-4 left-4 rounded-lg bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm border border-slate-100">
                  {product.category}
                </span>
              )}
            </div>

            {/* Right: Info */}
            <div className="flex flex-col justify-between h-full">
              <div>
                {/* Brand */}
                {product.brand && (
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                    {product.brand}
                  </p>
                )}

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                  {product.title}
                </h1>

                {/* Rating & Stock Badges */}
                <div className="flex items-center gap-4 mb-6">
                  {product.rating !== undefined && (
                    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full text-xs font-bold text-amber-700">
                      <span>★</span>
                      <span>{product.rating}</span>
                    </div>
                  )}

                  {product.stock !== undefined && (
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${product.stock > 0
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-red-50 border-red-200 text-red-700'
                        }`}
                    >
                      {product.stock > 0 ? `${product.stock} Units Available` : 'Out of Stock'}
                    </span>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div className="mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Description
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Price & Actions */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Price
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-slate-900">
                    ₹{product.price}
                  </span>

                  {/* Quantity Stepper */}
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity((prev) => prev - 1)
                        }
                      }}
                      disabled={quantity <= 1}
                      className="h-8 w-8 rounded-lg bg-white text-slate-600 font-bold shadow-sm transition hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-slate-800">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (product.stock === undefined || quantity < product.stock) {
                          setQuantity((prev) => prev + 1)
                        }
                      }}
                      disabled={product.stock !== undefined && quantity >= product.stock}
                      className="h-8 w-8 rounded-lg bg-white text-slate-600 font-bold shadow-sm transition hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Main Action Group */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!user) {
                        alert("Please login to add products to cart");
                        return;
                      }
                      if(product.stock === 0){
                        alert("Product is out of stock")
                        return;
                      }

                      dispatch(
                        addToCart({
                          ...product,
                          quantity: quantity
                        })
                      )
                    }
                    }
                    className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98]"
                 disabled={product.stock === 0}
                 >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart "}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if(!user){
                        alert("Please login to use wishlist");
                        return;
                      }
                      isWishlisted
                        ? dispatch(removeFromWishList(product))
                        : dispatch(addToWishList(product))
                    }}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition active:scale-[0.98] ${isWishlisted
                        ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100'
                        : 'border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                      }`}
                  >
                    <span className="text-lg">{isWishlisted ? '❤️' : '🤍'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails