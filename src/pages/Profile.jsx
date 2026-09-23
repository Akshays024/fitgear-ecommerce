import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">My Profile</h1>

      <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl mb-6 text-sm text-slate-700">
        <p><span className="font-semibold text-slate-900">Name:</span> {user?.name}</p>
        <p><span className="font-semibold text-slate-900">Email:</span> {user?.email}</p>
        <p><span className="font-semibold text-slate-900">Role:</span> {user?.role}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate('/orders')}
          className="flex-1 py-2 px-4 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
        >
          My Orders
        </button>

        <button
          onClick={() => navigate('/wishlist')}
          className="flex-1 py-2 px-4 text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-xl hover:bg-slate-200 transition-colors"
        >
          My Wishlist
        </button>
      </div>
    </div>
  )
}

export default Profile