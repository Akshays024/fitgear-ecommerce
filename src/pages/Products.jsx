import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/productService'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import {setError, setLoading, setProducts} from '../redux/slices/productSlice'

const Products = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [sort, setSort] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [page, setPage] = useState(1)
  const productPerPage = 8
  const user = useSelector(state=>state.auth.user)
  // Reset page to 1 when filters or search change
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, category])

  // debounse search 
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 700)
    return () => clearTimeout(timer)
  }, [search])

  const { data = {}, isLoading, isError } = useQuery({
    queryKey: ['products', page, debouncedSearch, category],
    queryFn: () => getProducts(page, productPerPage, debouncedSearch, category)
  })

  const products = data?.data || []
  const totalPages = data?.last || 1

  useEffect(()=>{
    dispatch(setProducts(products))
    dispatch(setError(isError ? "Failed to load Products": null))
    dispatch(setLoading(isLoading))
  },[products,isError,isLoading,dispatch])

  // client side sorting on fetched products
  const sortedProduct = [...products].sort((a, b) => {
    if (sort === "low-high") return a.price - b.price
    if (sort === "high-low") return b.price - a.price
    return 0
  })

  /* Loading State - Skeleton Grid */
  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 animate-pulse space-y-4">
                <div className="h-48 bg-slate-200 rounded-xl w-full" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
                <div className="h-5 bg-slate-200 rounded w-1/3 pt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  /* Error State */
  if (isError) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 max-w-md">
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Failed to load products</h2>
          <p className="text-sm text-slate-500">Please check your internet connection or try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
              All Products
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Explore our premium range of gear
            </p>
          </div>
          <span className="self-start sm:self-auto text-xs font-semibold text-slate-600 bg-slate-200/70 px-3 py-1.5 rounded-full border border-slate-200">
            {sortedProduct.length} Items
          </span>
        </div>

        {/* Filter & Search Bar Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition duration-150 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Category & Sort Dropdowns */}
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-700 transition focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
            >
              <option value="">All categories</option>
              <option value="Fitness Equipment">Fitness Equipment</option>
              <option value="Yoga">Yoga</option>
              <option value="Workout Accessories">Workout Accessories</option>
              <option value="Recovery">Recovery</option>
              <option value="Cardio">Cardio</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-700 transition focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
            >
              <option value="">Sort By</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedProduct.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-500 text-base font-medium">No Products Found</p>
              <p className="text-slate-400 text-xs mt-1">Try searching for something else or clearing filters.</p>
            </div>
          ) : (
            sortedProduct.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
              >
                <div>
                  <div className="relative mb-4 h-52 w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain p-4 object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.category && (
                      <span className="absolute top-2.5 left-2.5 rounded-lg bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm border border-slate-100">
                        {product.category}
                      </span>
                    )}
                  </div>

                  {product.brand && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      {product.brand}
                    </p>
                  )}

                  <h2 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-slate-900">
                    {product.title}
                  </h2>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    {product.rating !== undefined && (
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <span>★</span>
                        <span className="text-slate-700">{product.rating}</span>
                      </div>
                    )}

                    {product.stock !== undefined && (
                      <span className={`text-[11px] font-semibold ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between mb-3">
                    <h4 className="text-lg font-extrabold text-slate-900">
                      ₹{product.price}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:border-slate-300 active:scale-[0.98]"
                    >
                      View Product
                    </button>

                    <button
                      onClick={() => {
                        if(!user){
                          alert ("Please login to add products to cart")
                          return;
                        }
                        if(product.stock === 0){
                          alert("Product is out of stock")
                          return;
                        }
                        dispatch(addToCart(product))
                      }}
                      disabled={product.stock === 0}
                      className="rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                
              </div>
            ))
          )}
        </div>

        {/* Pagination Section */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition"
          >
            Previous
          </button>
          <span className="text-sm font-semibold text-slate-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  )
}

export default Products