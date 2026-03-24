import React, { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { server } from "../../server"
import { toast } from "react-toastify"

const ShopLogin = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios
      .post(
        `${server}/shop/login-shop`,
        { email, password },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Login Success!")
        navigate("/dashboard")
        window.location.reload(true)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl border border-[#e2e8f0] flex items-center justify-center text-[#0f172a] font-black">
              C
            </span>
            <span className="text-sm font-bold text-[#0f172a]">Curaluxe</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link to="/" className="px-3 py-1.5 rounded-full border border-[#e2e8f0] text-[#0f172a]">
              Home
            </Link>
            <Link to="/shop-login" className="px-3 py-1.5 rounded-full border border-[#0f172a] bg-[#0f172a] text-white">
              Vendor Login
            </Link>
            <Link to="/shop-create" className="px-3 py-1.5 rounded-full border border-[#e2e8f0] text-[#0f172a]">
              Vendor Sign Up
            </Link>
            <Link to="/login" className="px-3 py-1.5 rounded-full border border-[#e2e8f0] text-[#0f172a]">
              User Login
            </Link>
            <Link to="/sign-up" className="px-3 py-1.5 rounded-full border border-[#e2e8f0] text-[#0f172a]">
              User Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-[#e2e8f0] bg-white shadow-sm p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
            <span className="text-xs text-[#64748b] font-semibold tracking-wide">Seller Access</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold text-[#0f172a]">Vendor Login</h2>
          <p className="mt-2 text-sm text-[#64748b]">
            Manage products, orders & customers from your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1">Email address</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[#0f172a] placeholder-[#94a3b8] outline-none focus:ring-4 focus:ring-[#0ea5e9]/15 focus:border-[#0ea5e9] transition"
              placeholder="shop@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1">Password</label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[#0f172a] placeholder-[#94a3b8] outline-none focus:ring-4 focus:ring-[#0ea5e9]/15 focus:border-[#0ea5e9] transition"
                placeholder="Enter your password"
              />
              {visible ? (
                <AiOutlineEye
                  size={22}
                  className="absolute right-4 top-3.5 cursor-pointer text-[#64748b] hover:text-[#0f172a]"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={22}
                  className="absolute right-4 top-3.5 cursor-pointer text-[#64748b] hover:text-[#0f172a]"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#64748b]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[#e2e8f0] text-[#0ea5e9] focus:ring-[#0ea5e9]"
              />
              Remember me
            </label>

            <Link to="/forgot-password" className="text-[#0ea5e9] hover:underline transition">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl py-3 font-bold text-white bg-[#0f172a] hover:opacity-90 transition"
          >
            Sign In
          </button>

          {/* Footer */}
          <div className="text-center text-sm text-[#64748b]">
            Don't have a shop account?
            <Link to="/shop-create" className="ml-1 text-[#0ea5e9] hover:underline font-semibold">
              Create Shop
            </Link>
          </div>
        </form>

        {/* Small helper panel */}
        <div className="mt-6 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
          <p className="text-xs text-[#64748b]">
            Tip: Keep your store profile updated to build trust and boost sales.
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ShopLogin


