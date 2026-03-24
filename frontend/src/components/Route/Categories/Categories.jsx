import React, { cloneElement } from "react"
import styles from "../../../styles/styles"
import { brandingData, shoeCategoriesData } from "../../../static/data"
import { useNavigate } from "react-router-dom"

const Categories = () => {
  const navigate = useNavigate()

  const handleSubmit = (item) => {
    navigate(`/products?category=${encodeURIComponent(item.title)}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="relative py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_420px_at_10%_10%,rgba(245,162,74,0.18),transparent_60%),radial-gradient(800px_360px_at_90%_20%,rgba(31,122,111,0.16),transparent_60%)]" />

      <div className={`${styles.section} space-y-12`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.6fr] gap-8 items-stretch">
          <div className="rounded-[30px] border border-[var(--brand-mist)] bg-white/85 backdrop-blur p-8 shadow-[0_20px_50px_rgba(16,32,40,0.1)]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-cream)] border border-[var(--brand-mist)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-reef)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-ink)]">Catalog lens</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[var(--brand-ink)] font-Poppins">
              Shop by need, not by noise
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-600">
              A fast way to browse essentials across beauty, wellness, and pharmacy staples with clear pricing.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Fast dispatch", "Verified sellers", "Clean pricing", "Secure checkout"].map((label) => (
                <span
                  key={label}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[var(--brand-mist)] text-[var(--brand-ink)]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {brandingData &&
              brandingData.map((item, index) => (
                <div
                  key={index}
                  className="rounded-[24px] border border-[var(--brand-mist)] bg-white/80 backdrop-blur p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[var(--brand-sage)]/50 border border-[var(--brand-mist)] flex items-center justify-center">
                    <span className="text-[var(--brand-forest)]">
                      {cloneElement(item.icon, {
                        strokeWidth: 2,
                        strokeLinecap: "round",
                      })}
                    </span>
                  </div>
                  <h3 className="mt-4 font-bold text-[16px] text-[var(--brand-ink)]">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.Description}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-[var(--brand-mist)] bg-white/85 backdrop-blur p-6 md:p-8 shadow-[0_24px_60px_rgba(15,24,23,0.12)]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-reef)] font-semibold">
                Departments
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-[var(--brand-ink)] font-Poppins">
                Browse by category
              </h3>
              <p className="mt-2 text-sm text-gray-600 max-w-xl">
                Jump into your favorite category and discover staples that fit your routine.
              </p>
            </div>
            <div className="text-xs font-semibold text-[var(--brand-ink)] bg-[var(--brand-mist)] px-3 py-2 rounded-full">
              Tap a tile to explore
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {shoeCategoriesData &&
              shoeCategoriesData.slice(0, 8).map((i) => (
                <button
                  key={i.id}
                  type="button"
                  onClick={() => handleSubmit(i)}
                  className="group text-left rounded-[22px] border border-[var(--brand-mist)] bg-[var(--brand-cream)]/70 overflow-hidden shadow-sm hover:shadow-lg transition"
                  aria-label={`Go to ${i.title}`}
                >
                  <div className="relative h-[150px]">
                    <img
                      src={i.image_Url || "/placeholder.svg"}
                      alt={i.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-base font-bold">{i.title}</p>
                      <p className="text-white/80 text-xs">{i.subTitle || "Essentials"}</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.25em] text-[var(--brand-ink)]">
                      Explore
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white border border-[var(--brand-mist)] text-[var(--brand-forest)] flex items-center justify-center">
                      +
                    </span>
                  </div>
                </button>
              ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {shoeCategoriesData &&
              shoeCategoriesData.slice(8, 10).map((i) => (
                <button
                  key={i.id}
                  type="button"
                  onClick={() => handleSubmit(i)}
                  className="group rounded-[26px] border border-[var(--brand-mist)] bg-gradient-to-br from-white to-[var(--brand-sand)]/60 p-5 flex items-center justify-between shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-reef)] font-semibold">
                      Featured
                    </p>
                    <h4 className="text-lg font-semibold text-[var(--brand-ink)] mt-1">{i.title}</h4>
                    <p className="text-sm text-gray-500">{i.subTitle}</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[var(--brand-forest)] text-white flex items-center justify-center text-sm font-semibold">
                    {i.title?.slice(0, 2)}
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Categories

