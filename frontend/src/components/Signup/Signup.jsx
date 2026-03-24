import React, { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from "react-router-dom"
import { RxAvatar } from "react-icons/rx"
import axios from "axios"
import { server } from "../../server"
import { toast } from "react-toastify"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)
  const [avatar, setAvatar] = useState(null)

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) setAvatar(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    axios
      .post(`${server}/user/create-user`, { name, email, password, avatar })
      .then((res) => {
        toast.success(res.data.message)
        setName("")
        setEmail("")
        setPassword("")
        setAvatar(null)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!")
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
            <Link to="/login" className="px-3 py-1.5 rounded-full border border-[#e2e8f0] text-[#0f172a]">
              Login
            </Link>
            <Link to="/sign-up" className="px-3 py-1.5 rounded-full border border-[#0f172a] bg-[#0f172a] text-white">
              Sign Up
            </Link>
            <Link to="/shop-login" className="px-3 py-1.5 rounded-full border border-[#e2e8f0] text-[#0f172a]">
              Vendor Login
            </Link>
            <Link to="/shop-create" className="px-3 py-1.5 rounded-full border border-[#e2e8f0] text-[#0f172a]">
              Vendor Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-[#e2e8f0] bg-white shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0]">
            <span className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
            <span className="text-xs text-[#64748b] font-semibold tracking-wide">Create your account</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold text-[#0f172a]">Create account</h2>
          <p className="mt-2 text-sm text-[#64748b]">Skincare, pharmacy, and beauty in one place</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center">
                {avatar ? (
                  <img src={avatar || "/placeholder.svg"} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <RxAvatar className="text-[#64748b]" size={34} />
                )}
              </div>

              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#0ea5e9] border border-white/60" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-[#0f172a]">Profile photo</p>
              <p className="text-xs text-[#64748b]">JPG, JPEG, PNG only</p>

              <label className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-[#0f172a] bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] transition">
                Upload Image
                <input
                  type="file"
                  name="avatar"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1">Full Name</label>
            <input
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[#0f172a] placeholder-[#94a3b8] outline-none focus:ring-4 focus:ring-[#0ea5e9]/15 focus:border-[#0ea5e9] transition"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1">Email address</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[#0f172a] placeholder-[#94a3b8] outline-none focus:ring-4 focus:ring-[#0ea5e9]/15 focus:border-[#0ea5e9] transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1">Password</label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[#0f172a] placeholder-[#94a3b8] outline-none focus:ring-4 focus:ring-[#0ea5e9]/15 focus:border-[#0ea5e9] transition"
                placeholder="Create a strong password"
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

          <button
            type="submit"
            className="w-full rounded-xl py-3 font-bold text-white bg-[#0f172a] hover:opacity-90 transition"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-[#64748b]">
            Already have an account?
            <Link to="/login" className="ml-1 text-[#0ea5e9] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Signup

