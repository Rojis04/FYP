import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { Link, NavLink, useLocation } from "react-router-dom"
import { FiHome, FiGrid, FiUsers, FiPackage, FiShoppingCart, FiSearch, FiBell, FiSettings } from "react-icons/fi"

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user)
  const location = useLocation()

  const pageTitle = useMemo(() => {
    const p = location.pathname
    if (p.startsWith("/admin/dashboard")) return "Dashboard"
    if (p.startsWith("/admin/users")) return "Users"
    if (p.startsWith("/admin/orders")) return "Orders"
    if (p.startsWith("/admin/products")) return "Products"
    if (p.startsWith("/admin/sellers")) return "Sellers"
    if (p.startsWith("/admin/settings")) return "Settings"
    return "Admin"
  }, [location.pathname])

  const navItems = [
    { to: "/admin/dashboard", label: "Overview", icon: FiHome },
    { to: "/admin-orders", label: "Orders", icon: FiShoppingCart },
    { to: "/admin-products", label: "Products", icon: FiPackage },
    { to: "/admin-users", label: "Users", icon: FiUsers },
    { to: "/admin-sellers", label: "Sellers", icon: FiGrid },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#f8fafc] border-b border-[#e2e8f0]">
      <div className="h-[3px] bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] to-[#f59e0b]" />
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="py-3 flex flex-col gap-3 lg:gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white border border-[#e2e8f0] flex items-center justify-center shadow-sm">
                  <span className="text-sm font-black text-[#0f172a]">EA</span>
                </div>
                <div className="leading-tight">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#64748b]">Admin Panel</p>
                  <p className="text-sm font-bold text-[#0f172a]">Elaris Control</p>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-3 rounded-2xl border border-[#e2e8f0] bg-white px-4 py-2">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-xs font-semibold text-[#0f172a]">{pageTitle}</p>
                  <p className="text-[11px] text-[#64748b]">Operations and reporting</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative w-10 h-10 rounded-xl border border-[#e2e8f0] bg-white text-[#0f172a] hover:bg-[#f1f5f9] transition"
                title="Notifications"
              >
                <FiBell />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500" />
              </button>

              <Link
                to="/admin/settings"
                className="w-10 h-10 rounded-xl border border-[#e2e8f0] bg-white text-[#0f172a] hover:bg-[#f1f5f9] transition flex items-center justify-center"
                title="Settings"
              >
                <FiSettings />
              </Link>

              <Link
                to="/admin/settings"
                className="hidden md:flex items-center gap-3 rounded-2xl border border-[#e2e8f0] bg-white px-3 py-2 hover:bg-[#f1f5f9] transition"
              >
                <img
                  src={user?.avatar?.url || "/placeholder.svg?height=40&width=40&query=avatar"}
                  alt={user?.name || "Admin"}
                  className="h-9 w-9 rounded-xl object-cover border border-[#e2e8f0]"
                />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-[#0f172a]">{user?.name || "Admin"}</p>
                  <p className="text-[11px] text-[#64748b]">Admin Settings</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  className="w-full h-11 rounded-2xl border border-[#e2e8f0] bg-white pl-11 pr-4 text-sm font-semibold text-[#0f172a] outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20"
                  placeholder="Search orders, products, users..."
                />
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold border transition ${
                        isActive
                          ? "bg-[#0f172a] text-white border-[#0f172a]"
                          : "bg-white text-[#0f172a] border-[#e2e8f0] hover:bg-[#f1f5f9]"
                      }`
                    }
                  >
                    <Icon size={14} />
                    {item.label}
                  </NavLink>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader

