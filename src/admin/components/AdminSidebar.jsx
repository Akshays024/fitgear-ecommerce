import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Orders', path: '/admin/orders' },
  ]

  const handleNavigation = (path) => {
    navigate(path)
    if (setIsOpen) setIsOpen(false) 
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 min-h-screen w-64 bg-slate-900 p-4 text-white
    transition-transform duration-300 ease-in-out
    lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-xl font-bold tracking-wide">
            FitGear Admin
          </h2>
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${isActive
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default AdminSidebar