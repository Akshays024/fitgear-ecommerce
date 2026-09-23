import React, { useState } from 'react'
import { login } from '../redux/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { restoreCart } from '../redux/slices/cartSlice'
import { API_URL } from '../constants/api'
const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (email.trim() === "") {
      setError("email is required")
      return
    }

    if (password.trim() === "") {
      setError("password is required")
      return
    }
    
    


    const userResponse = await axios.get(`${API_URL}/users`)

    const existingUser = userResponse.data.find(
      user => user.email === email && user.password === password
    )

    if (existingUser) {
      dispatch(login(existingUser))
      localStorage.setItem("user", JSON.stringify(existingUser))

    
    
    
    const cartKey = "cart_" + existingUser.id ;
    const savedCart = localStorage.getItem(cartKey);
    if(savedCart){
      const parsedCart = JSON.parse(savedCart);
      dispatch(restoreCart(parsedCart))
    }
    else{
      dispatch(restoreCart([]))
    }
    navigate('/')
  }
  else {
      setError("invalid email or password")
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Login to your FitGear account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 p-3.5 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <p className="text-xs font-medium text-red-600 capitalize">
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 active:scale-[0.99] hover:shadow-lg"
            >
              Login
            </button>

            {/* Register Navigation Link */}
            <p className="pt-2 text-center text-sm text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-slate-900 hover:underline transition"
              >
                Register
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login