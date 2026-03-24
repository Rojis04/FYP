import React from "react"
import { FiHome } from "react-icons/fi"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e2e8f0]">
      <div className="h-[3px] bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] to-[#f59e0b]" />
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="py-4 flex items-center justify-between gap-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-white border border-[#e2e8f0] flex items-center justify-center shadow-sm">
              <span className="text-sm font-black text-[#0f172a]">VP</span>
            </div>
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#94a3b8]">Vendor Portal</p>
              <p className="text-sm font-bold text-[#0f172a]">Storefront Studio</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to={`/shop/${seller?._id}`}
              className="hidden 900px:flex items-center gap-3 rounded-2xl border border-[#e2e8f0] bg-white px-3 py-2 hover:bg-[#f8fafc] transition"
            >
              <img
                src={seller?.avatar?.url || "/placeholder.svg"}
                alt={seller?.name || "Shop"}
                className="w-10 h-10 rounded-2xl object-cover border border-[#e2e8f0]"
              />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-[#0f172a] max-w-[160px] truncate">{seller?.name || "Your Shop"}</p>
                <p className="text-xs text-[#64748b]">View storefront</p>
              </div>
            </Link>

            <Link
              to="/dashboard"
              className="900px:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#e2e8f0] bg-white text-[#0f172a] hover:bg-[#f8fafc] transition"
              aria-label="Dashboard"
            >
              <FiHome size={18} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
