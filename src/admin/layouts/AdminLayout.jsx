import React, { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex flex-1 flex-col min-w-0">
        <AdminHeader isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout