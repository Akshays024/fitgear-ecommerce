import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogout } from '../redux/slices/adminSlice'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const admin = useSelector(state => state.admin.admin)
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Hamburger Toggle Button for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {admin && (
          <p className="text-xs sm:text-sm font-semibold text-slate-700">
            <span className="hidden sm:inline">Name: </span>
            <span className="text-slate-900 font-bold">{admin.name}</span>
            
          </p>
        )}
      </div>

      <button
        onClick={() => {
          dispatch(adminLogout())
          localStorage.removeItem("admin")
          navigate("/admin/login")
          
        }}
        className="rounded-xl bg-red-500 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-red-600 active:scale-95 shadow-sm"
      >
        Logout
      </button>
    </header>
  )
}

export default AdminHeader