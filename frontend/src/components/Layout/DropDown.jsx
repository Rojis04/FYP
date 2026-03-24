import React from "react"
import { useNavigate } from "react-router-dom"

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate()

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`)
    setDropDown(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className="
        absolute
        z-40
        w-[320px]
        mt-3
        rounded-3xl
        border border-[rgba(16,26,26,0.08)]
        bg-white/95
        backdrop-blur
        shadow-[0_24px_50px_-18px_rgba(16,26,26,0.28)]
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--brand-mist)]">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--brand-reef)] font-semibold">
          Shop by department
        </p>
        <h4 className="mt-1 text-base font-semibold text-[var(--brand-ink)]">
          Beauty + pharmacy essentials
        </h4>
      </div>

      {/* Category list */}
      <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {categoriesData &&
          categoriesData.map((i, index) => (
            <button
              key={index}
              onClick={() => submitHandle(i)}
              className="
                group
                w-full
                flex
                items-center
                gap-4
                px-6
                py-4
                text-left
                transition
                hover:bg-[var(--brand-mist)]
              "
            >
              <div className="w-11 h-11 rounded-2xl bg-[var(--brand-sage)]/40 flex items-center justify-center text-[var(--brand-forest)] font-semibold">
                {i.title?.slice(0, 2)}
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--brand-ink)] group-hover:text-[var(--brand-reef)] transition">
                  {i.title}
                </p>
                <span className="text-xs text-gray-500">{i.subTitle || "Everyday essentials"}</span>
              </div>

              {/* Hover indicator */}
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-coral)] opacity-0 group-hover:opacity-100 transition" />
            </button>
          ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[var(--brand-mist)] bg-white/80">
        <p className="text-xs text-gray-500">
          Curated care for makeup, wellness, and pharmacy essentials.
        </p>
      </div>
    </div>
  )
}

export default DropDown

