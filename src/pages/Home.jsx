import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/productService'

const Home = () => {
  const navigate = useNavigate()

  const { data = [], isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => getProducts(1, 4, '', '')
  })

  const products = Array.isArray(data) ? data : data?.data || []

  const categories = [
    'Fitness Equipment',
    'Yoga',
    'Cardio',
    'Workout Accessories',
    'Recovery'
  ]

  return (
    <div className="bg-slate-50 text-slate-800">

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-64px)] flex items-center px-6 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">

          <div>
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">
              Welcome to FitGear
            </span>

            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
              Train Better.{' '}
              <span className="block text-slate-500">
                Live Stronger.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Quality fitness equipment and accessories built for strength, movement, and everyday training.
            </p>

            <button
              onClick={() => navigate('/products')}
              className="mt-8 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Explore Products
            </button>
          </div>

          <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="absolute right-8 top-8 h-32 w-32 rounded-full bg-slate-100" />

            <img
              src="/products/home.png"
              alt="FitGear fitness equipment"
              className="relative z-10 h-60 w-80 object-contain transition duration-500 hover:scale-105"
            />

            <div className="absolute bottom-6 left-6 rounded-xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-xs font-medium text-slate-400">
                Featured
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800">
                Adjustable Dumbbell
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Built for Every Workout */}
      <section className="border-y border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Built for Every Workout
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              Gear that fits your training.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="border-l-2 border-slate-900 pl-5">
              <h3 className="text-lg font-bold text-slate-900">
                Strength
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Dumbbells, kettlebells, and equipment for building power.
              </p>
            </div>

            <div className="border-l-2 border-slate-300 pl-5">
              <h3 className="text-lg font-bold text-slate-900">
                Movement
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Yoga and workout accessories for everyday movement.
              </p>
            </div>

            <div className="border-l-2 border-slate-300 pl-5">
              <h3 className="text-lg font-bold text-slate-900">
                Recovery
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Simple tools designed to support post-workout recovery.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Explore
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                Shop by Category
              </h2>
            </div>

            <button
              onClick={() => navigate('/products')}
              className="text-sm font-semibold text-slate-600 transition hover:text-slate-900 hover:underline"
            >
              View all products →
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map(category => (
              <button
                key={category}
                onClick={() =>
                  navigate(`/products?category=${encodeURIComponent(category)}`)
                }
                className="rounded-2xl border border-slate-200 bg-white p-5 text-left text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-slate-900 hover:text-slate-900 hover:shadow-md"
              >
                {category}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Selected Gear
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                Trending Gear
              </h2>
            </div>

            <button
              onClick={() => navigate('/products')}
              className="hidden text-sm font-semibold text-slate-600 transition hover:text-slate-900 hover:underline sm:block"
            >
              Browse all →
            </button>
          </div>

          {isLoading ? (
            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {[1, 2, 3, 4].map(item => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {products.map(product => (
                <div
                  key={product.id || product._id}
                  onClick={() => navigate(`/products/${product.id || product._id}`)}
                  className="group cursor-pointer rounded-2xl p-2 transition hover:shadow-md"
                >
                  <div className="flex h-52 items-center justify-center rounded-2xl bg-slate-50 p-6 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title || product.name}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-3 px-1">
                    <p className="text-sm font-semibold text-slate-800 line-clamp-1">
                      {product.title || product.name}
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      ₹{Number(product.price || 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-6 py-14 text-center sm:px-10 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            FitGear
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            Ready to upgrade your workout?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Find the equipment that fits your training and start building your next workout.
          </p>

          <button
            onClick={() => navigate('/products')}
            className="mt-7 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 active:scale-[0.98]"
          >
            Shop FitGear
          </button>
        </div>
      </section>

    </div>
  )
}

export default Home