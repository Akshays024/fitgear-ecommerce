import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { adminLogin } from '../redux/slices/adminSlice'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../constants/api'

const AdminLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState("")


    async function handleSubmit(e) {
        e.preventDefault()

        if (!email.trim() || !pass.trim()) {
            setError("Enter the valid details!!")
            return
        }
        if (pass.length < 8) {
            setError("Password must be at-Least 8 characters!")
            return;
        }
        try {

            const response = await axios.get(`${API_URL}/users`)

            const findAdmin = response.data.find((admin) => {
                return (
                    admin.email === email &&
                    admin.password === pass &&
                    admin.role === "admin"
                )
            })

            if (findAdmin) {
                dispatch(adminLogin(findAdmin))
                localStorage.setItem("admin", JSON.stringify(findAdmin))
                navigate("/admin/dashboard")
            }

        } catch (error) {
            setError("Invalid admin credentials")
        }


    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">

            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">

                <form onSubmit={handleSubmit}>

                    <h1 className="mb-6 text-2xl font-bold text-gray-800">
                        Admin Login
                    </h1>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setError("")
                        }}
                        className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-slate-800"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => {
                            setPass(e.target.value)
                            setError("")
                        }}
                        className="mt-3 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-slate-800"
                    />

                    {error && (
                        <p className="mt-2 text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="mt-4 w-full rounded-lg bg-slate-900 py-2 font-semibold text-white hover:bg-slate-800"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    )
}

export default AdminLogin