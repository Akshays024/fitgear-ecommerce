import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../constants/api'

const Register = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      pass.trim() === "" ||
      confirmPass.trim() === ""
    ) {
      setError("All fields are required")
      return
    }

    if (pass !== confirmPass) {
      setError("Passwords don't match")
      return
    }

    setLoading(true)

    try {
      const newUser = {
        id: Date.now(),
        name,
        email,
        password: pass,
        role: "user"
      }

      const userResponse = await axios.get(
        `${API_URL}/users`
      )

      const existingUser = userResponse.data.find(
        user => user.email === email
      )

      if (existingUser) {
        setError("Email already exists")
        return
      }

      const registerResponse = await axios.post(
        `${API_URL}/users`,
        newUser
      )

      console.log(registerResponse)

      setEmail("")
      setConfirmPass("")
      setName("")
      setPass("")

      navigate('/login')

    } catch (error) {
      setError("Registration failed")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Register Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Join FitGear and start your fitness journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              />
            </div>

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
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
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

            {/* Loading Indicator */}
            {loading && (
              <p className="text-center text-xs font-semibold text-slate-500 animate-pulse">
                Creating your account...
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 active:scale-[0.99] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            {/* Login Navigation Link */}
            <p className="pt-2 text-center text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-slate-900 hover:underline transition"
              >
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register