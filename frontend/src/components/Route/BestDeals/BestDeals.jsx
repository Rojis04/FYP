import React, { useEffect, useState } from "react"
import styles from "../../../styles/styles"
import ProductCard from "../ProductCard/ProductCard"
import axios from "axios"
import { server } from "../../../server"

const BestDeals = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchTopDeals = async () => {
      try {
        const response = await axios.get(`${server}/product/get-all-products`)
        const sorted = response.data.products.sort((a, b) => b.sold_out - a.sold_out)
        const topFive = sorted.slice(0, 5)
        setData(topFive)
      } catch (error) {
        console.error("Error fetching best deals:", error)
      }
    }

    fetchTopDeals()
  }, [])

  return (
    <section className="w-full py-16 relative z-0">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(800px_420px_at_15%_15%,rgba(245,162,74,0.2),transparent_60%),radial-gradient(700px_360px_at_85%_30%,rgba(31,122,111,0.16),transparent_60%)]" />

      <div className={`${styles.section} relative z-0 space-y-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="rounded-[32px] border border-[var(--brand-mist)] bg-white/90 backdrop-blur p-8 shadow-[0_22px_60px_rgba(15,24,23,0.12)]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-cream)] border border-[var(--brand-mist)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-amber)]" />
              <span className="text-xs font-semibold text-[var(--brand-ink)] tracking-[0.3em] uppercase">
                Best sellers
              </span>
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-[var(--brand-ink)] leading-tight font-Poppins">
              Top picks, ranked by real demand
            </h1>
            <p className="mt-3 text-sm md:text-base text-gray-600 max-w-[520px]">
              A live snapshot of the most ordered products across the store, updated throughout the day.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-[var(--brand-ink)]">
              <div className="rounded-2xl border border-[var(--brand-mist)] bg-white px-4 py-3">
                <div className="font-semibold">Live ranking</div>
                <div className="text-gray-500">Based on orders</div>
              </div>
              <div className="rounded-2xl border border-[var(--brand-mist)] bg-white px-4 py-3">
                <div className="font-semibold">Fast filters</div>
                <div className="text-gray-500">Sort by category</div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-[var(--brand-mist)] bg-gradient-to-br from-white to-[var(--brand-sand)]/70 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--brand-ink)]">Today picks</p>
              <span className="text-xs font-semibold text-gray-500">
                {data.length ? `${data.length} items` : "..."}
              </span>
            </div>

            <div className="mt-4 h-[4px] w-full rounded-full bg-[var(--brand-mist)] overflow-hidden">
              <div className="h-full w-[72%] rounded-full bg-[var(--brand-forest)]" />
            </div>

            <div className="mt-4 space-y-2 text-xs text-gray-500">
              <p>Updated in real time as orders land.</p>
              <p>Save favorites to your wishlist for later.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[34px] border border-[var(--brand-mist)] bg-white/90 backdrop-blur p-4 sm:p-6 shadow-[0_20px_50px_rgba(15,24,23,0.1)]">
          {data.length > 0 ? (
            <div className="flex gap-5 overflow-x-auto pb-2">
              {data.map((product) => (
                <div key={product._id} className="min-w-[260px] sm:min-w-[280px]">
                  <ProductCard data={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-14 flex items-center justify-center">
              <div className="w-full max-w-[520px] rounded-2xl border border-[var(--brand-mist)] bg-white p-6 text-center shadow-sm">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-[var(--brand-forest)]/10 border border-[var(--brand-mist)] flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[var(--brand-forest)]/50 animate-pulse" />
                </div>
                <p className="mt-4 font-semibold text-[var(--brand-ink)]">Loading best deals</p>
                <p className="mt-1 text-sm text-gray-600">Fetching top-selling products from the store.</p>
              </div>
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-[var(--brand-mist)] bg-white/95 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <p className="text-sm text-gray-700">
              Want more options? Browse all products and filter by category.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Updated live</span>
              <span className="w-2 h-2 rounded-full bg-[var(--brand-amber)] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BestDeals

