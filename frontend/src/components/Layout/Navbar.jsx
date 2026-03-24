import React from "react"
import { Link } from "react-router-dom"
import { navItems } from "../../static/data"

const Navbar = ({ active }) => {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-2">
      {navItems.map((item, index) => {
        const isActive = active === index + 1
        return (
          <Link
            key={item.title}
            to={item.url}
            className={`relative px-4 py-2 rounded-full text-[14px] font-semibold tracking-wide transition ${
              isActive
                ? "bg-[var(--brand-reef)] text-white shadow-sm"
                : "text-[var(--brand-ink)]/70 hover:text-[var(--brand-reef)] hover:bg-[var(--brand-mist)]"
            }`}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}

export default Navbar

