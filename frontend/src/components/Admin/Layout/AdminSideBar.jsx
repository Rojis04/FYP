import React from "react"
import { Link } from "react-router-dom"
import { FiShoppingBag } from "react-icons/fi"
import { GrWorkshop } from "react-icons/gr"
import { RxDashboard } from "react-icons/rx"
import { CiMoneyBill } from "react-icons/ci"
import { HiOutlineUserGroup } from "react-icons/hi"
import { BsHandbag } from "react-icons/bs"
import { MdOutlineLocalOffer } from "react-icons/md"
import { AiOutlineSetting } from "react-icons/ai"

const AdminSideBar = ({ active }) => {
  const items = [
    { id: 1, label: "Dashboard", to: "/admin/dashboard", icon: RxDashboard },
    { id: 2, label: "All Orders", to: "/admin-orders", icon: FiShoppingBag },
    { id: 3, label: "All Sellers", to: "/admin-sellers", icon: GrWorkshop },
    { id: 4, label: "All Users", to: "/admin-users", icon: HiOutlineUserGroup },
    { id: 5, label: "All Products", to: "/admin-products", icon: BsHandbag },
    { id: 6, label: "All Events", to: "/admin-events", icon: MdOutlineLocalOffer },
    { id: 7, label: "Withdraw Request", to: "/admin-withdraw-request", icon: CiMoneyBill },
    { id: 8, label: "Settings", to: "/admin/settings", icon: AiOutlineSetting },
  ]

  return (
    <div className="w-full bg-white border-b border-[#e2e8f0]">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <nav className="flex flex-wrap items-center gap-2">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition ${
                    isActive
                      ? "bg-[#0f172a] text-white border-[#0f172a]"
                      : "bg-white text-[#0f172a] border-[#e2e8f0] hover:bg-[#f8fafc]"
                  }`}
                >
                  <Icon size={16} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              )
            })}
          </nav>

        </div>
      </div>
    </div>
  )
}

export default AdminSideBar


