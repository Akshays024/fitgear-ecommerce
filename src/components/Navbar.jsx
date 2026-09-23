import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { clearCart } from '../redux/slices/cartSlice'
import { useRef,useEffect } from 'react'
const Navbar = () => {
  const profileRef = useRef(null);
  const user = useSelector(state => state.auth.user)
  const cart = useSelector(state => state.cart.cart || [])
  const [profileOpen, setProfileOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    const handleClickOutSlide = (event)=>{
      if(profileRef.current && !profileRef.current.contains(event.target)){
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown',handleClickOutSlide)
    return ()=>{
      document.removeEventListener('mousedown',handleClickOutSlide)
    }
  },[])

  // Calculate cart count
  const cartItemCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  )

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(clearCart())
    dispatch(logout())
    setProfileOpen(false)
    navigate('/login')
  }

  const navLinkStyle = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-slate-900 font-semibold after:absolute after:-bottom-[21px] after:left-0 after:right-0 after:h-[2px] after:bg-slate-900'
        : 'text-slate-500 hover:text-slate-900'
    }`

  return (

    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}

        <NavLink
          to="/"
          className="group flex items-center gap-1.5 text-2xl font-extrabold tracking-tight text-slate-900"
        >
          <span>FitGear</span>

          <span className="h-2 w-2 rounded-full bg-slate-900 transition-transform group-hover:scale-125" />
        </NavLink>


        {/* Navigation */}

        <div className="flex items-center gap-8">

          <div className="flex items-center gap-6">

            <NavLink
              to="/"
              end
              className={navLinkStyle}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={navLinkStyle}
            >
              Products
            </NavLink>


            {/* Cart - Logged in users only */}

            {user && (

              <NavLink
                to="/cart"
                className={navLinkStyle}
              >

                <div className="flex items-center gap-1.5">

                  <span>Cart</span>

                  {cartItemCount > 0 && (

                    <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white">
                      {cartItemCount}
                    </span>

                  )}

                </div>

              </NavLink>

            )}

          </div>


          {/* Authentication */}

          {user ? (

            <div className="relative border-l border-slate-200 pl-4" ref={profileRef}>

              {/* Profile Button */}

              <button
                onClick={() => setProfileOpen(prev => !prev)}
                className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition hover:bg-slate-50"
              >

                {/* Avatar */}

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </span>


                {/* Name */}

                <span className="hidden text-sm font-semibold text-slate-700 sm:block">
                  {user.name}
                </span>


                {/* Arrow */}

                <span
                  className={`text-[10px] text-slate-400 transition-transform duration-200 ${
                    profileOpen ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>

              </button>


              {/* Profile Dropdown */}

              {profileOpen && (

                <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/50">

                  {/* User Info */}

                  <div className="mb-1 border-b border-slate-100 px-3 py-2.5">

                    <p className="text-sm font-semibold text-slate-900">
                      {user.name}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-400">
                      {user.email}
                    </p>

                  </div>


                  {/* My Profile */}

                  <button
                    onClick={() => {
                      navigate('/profile')
                      setProfileOpen(false)
                    }}
                    className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    My Profile
                  </button>


                  {/* My Orders */}

                  <button
                    onClick={() => {
                      navigate('/orders')
                      setProfileOpen(false)
                    }}
                    className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    My Orders
                  </button>


                  {/* My Wishlist */}

                  <button
                    onClick={() => {
                      navigate('/wishlist')
                      setProfileOpen(false)
                    }}
                    className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    My Wishlist
                  </button>


                  {/* Divider */}

                  <div className="my-1 border-t border-slate-100" />


                  {/* Logout */}

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          ) : (

            /* Login / Register */

            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">

              <NavLink
                to="/login"
                className={navLinkStyle}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow active:scale-95"
              >
                Register
              </NavLink>

            </div>

          )}

        </div>

      </div>

    </nav>
  )
}

export default Navbar