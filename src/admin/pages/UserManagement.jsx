import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blockUser, getAllUsers, unblockUser } from '../services/adminUserService'
import StatusBar from '../components/StatusBar'
import DataTable from '../components/DataTable'

const UserManagement = () => {
  const users = useSelector(state => state.adminUsers.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const filteredUsers = users.filter(user => user.role !== "admin")
  const columns = [
    {
      header: "ID",
      accessor: "id"
    },
    {
      header: "Name",
      accessor: "name"
    },
    {
      header: "Email",
      accessor: "email"
    },
    {
      header: "Role",
      accessor: "role"
    },
    {
      header: "Status",
      render: (user) => (
        <StatusBar status={user.isBlocked ? "blocked" : "active"} />
      )
    },
    {
      header: "Action",
      render: (user) => (
        <button
          onClick={() => dispatch(user.isBlocked ? unblockUser({ id: user.id }) : blockUser({ id: user.id }))}
          className={`py-1 px-3 rounded text-xs font-medium transition ${user.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
        >
          {user.isBlocked ? "Unblock" : "Block"}
        </button>
      )
    }
  ]

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      <h1 className="mb-5 text-xl sm:text-2xl font-bold text-gray-900">
        User Management
      </h1>


      <div className="block md:hidden space-y-3">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start border-b border-gray-100 pb-2">
              <div>
                <h3 className="font-semibold text-sm text-gray-900">{user.name}</h3>
                <p className="text-xs text-gray-500 break-all">{user.email}</p>
              </div>
              <StatusBar status={user.isBlocked ? "blocked" : "active"} />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>ID: <strong className="text-gray-800">{user.id}</strong></span>
              <span>Role: <strong className="text-gray-800 uppercase">{user.role}</strong></span>
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => dispatch(user.isBlocked ? unblockUser({ id: user.id }) : blockUser({ id: user.id }))}
                className={`py-1.5 px-3 rounded text-xs font-medium transition ${user.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
              >
                {user.isBlocked ? "Unblock User" : "Block User"}
              </button>
            </div>
          </div>
        ))}
      </div>


      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
       <DataTable 
       data={filteredUsers}
       columns={columns}
       />
      </div>
    </div>
  )
}

export default UserManagement