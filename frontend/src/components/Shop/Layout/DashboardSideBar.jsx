import React, { useMemo, useState } from "react"
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai"
import { FiPackage, FiShoppingBag } from "react-icons/fi"
import { MdOutlineLocalOffer } from "react-icons/md"
import { RxDashboard } from "react-icons/rx"
import { VscNewFile } from "react-icons/vsc"
import { CiMoneyBill, CiSettings } from "react-icons/ci"
import { Link } from "react-router-dom"
import { BiMessageSquareDetail } from "react-icons/bi"
import { HiOutlineReceiptRefund } from "react-icons/hi"

const DashboardSideBar = ({ active }) => {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = useMemo(
    () => [
      { id: 1, title: "Dashboard", icon: <RxDashboard size={20} />, link: "/dashboard" },
      { id: 2, title: "All Orders", icon: <FiShoppingBag size={20} />, link: "/dashboard-orders" },
      { id: 3, title: "All Products", icon: <FiPackage size={20} />, link: "/dashboard-products" },
      { id: 4, title: "Create Product", icon: <AiOutlineFolderAdd size={20} />, link: "/dashboard-create-product" },
      { id: 5, title: "All Events", icon: <MdOutlineLocalOffer size={20} />, link: "/dashboard-events" },
      { id: 6, title: "Create Event", icon: <VscNewFile size={20} />, link: "/dashboard-create-event" },
      { id: 7, title: "Withdraw Money", icon: <CiMoneyBill size={20} />, link: "/dashboard-withdraw-money" },
      { id: 8, title: "Shop Inbox", icon: <BiMessageSquareDetail size={20} />, link: "/dashboard-messages" },
      { id: 9, title: "Discount Codes", icon: <AiOutlineGift size={20} />, link: "/dashboard-coupouns" },
      { id: 10, title: "Refunds", icon: <HiOutlineReceiptRefund size={20} />, link: "/dashboard-refunds" },
      { id: 11, title: "Settings", icon: <CiSettings size={20} />, link: "/settings" },
    ],
    []
  )

  return (
    <div className="w-full bg-white border-b border-[#e2e8f0]">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#64748b] uppercase">Vendor</p>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border border-[#e2e8f0] text-[#0f172a] hover:bg-[#f8fafc] transition"
            aria-label="Toggle navigation"
          >
            {collapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        <div className={`mt-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 ${collapsed ? "hidden" : "flex"} lg:flex`}>
          <nav className="flex flex-wrap items-center gap-2">
            {menuItems.map((item) => {
              const isActive = active === item.id
              return (
                <Link
                  key={item.id}
                  to={item.link}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition ${
                    isActive
                      ? "bg-[#0f172a] text-white border-[#0f172a]"
                      : "bg-white text-[#0f172a] border-[#e2e8f0] hover:bg-[#f8fafc]"
                  }`}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.title}</span>
                </Link>
              )
            })}
          </nav>

        </div>
      </div>
    </div>
  )
}

export default DashboardSideBar

