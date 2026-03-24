import React, { useEffect, useState } from "react"
import styles from "../../../styles/styles"
import ProductCard from "../ProductCard/ProductCard"
import axios from "axios"
import { server } from "../../../server"

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${server}/product/get-all-products`)
        const featured = response.data.products.slice(0, 10)
        setProducts(featured)
      } catch (error) {
        console.error("Error fetching featured products:", error)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <section className="w-full py-16 relative z-0">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(820px_520px_at_8%_12%,rgba(31,122,111,0.15),transparent_60%),radial-gradient(700px_420px_at_90%_20%,rgba(245,162,74,0.2),transparent_60%)]" />

      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--brand-mist)] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-reef)]" />
              <span className="text-xs md:text-sm font-semibold text-[var(--brand-ink)] tracking-[0.3em] uppercase">
                Studio edit
              </span>
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-[var(--brand-ink)] leading-tight font-Poppins">
              Featured shelf, refreshed weekly
            </h1>

            <p className="mt-2 text-sm md:text-base text-gray-600 max-w-[620px]">
              A clean spotlight on the most requested items, pulled directly from verified inventory.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[22px] border border-[var(--brand-mist)] bg-white/85 backdrop-blur p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-reef)] font-semibold">Selection</p>
              <div className="mt-3 text-2xl font-extrabold text-[var(--brand-ink)]">
                {products?.length ? `${products.length}` : "..."}
              </div>
              <p className="text-xs text-gray-500 mt-1">Items live now</p>
            </div>
            <div className="rounded-[22px] border border-[var(--brand-mist)] bg-white/85 backdrop-blur p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-reef)] font-semibold">Availability</p>
              <div className="mt-3 text-2xl font-extrabold text-[var(--brand-ink)]">Daily</div>
              <p className="text-xs text-gray-500 mt-1">Stock synced hourly</p>
            </div>
          </div>
        </div>

        <div className="relative z-0">
          <div className="absolute inset-0 rounded-[36px] bg-white/70 backdrop-blur-md border border-[var(--brand-mist)]" />
          <div className="relative rounded-[36px] p-4 sm:p-6">
            <div className="rounded-3xl bg-white/95 border border-white/60 shadow-sm p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products && products.length > 0 ? (
                  products.map((product) => <ProductCard key={product._id} data={product} />)
                ) : (
                  <div className="col-span-full py-14 flex items-center justify-center">
                    <div className="w-full max-w-[520px] rounded-2xl border border-[var(--brand-mist)] bg-white p-6 text-center shadow-sm">
                      <div className="mx-auto w-14 h-14 rounded-2xl bg-[var(--brand-forest)]/10 border border-[var(--brand-mist)] flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-[var(--brand-forest)]/50 animate-pulse" />
                      </div>
                      <p className="mt-4 font-semibold text-[var(--brand-ink)]">
                        No featured products right now
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Check back soon. New items are added frequently.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--brand-mist)] bg-white/90 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <p className="text-sm text-gray-700">
                Explore more categories to build a complete routine.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">Weekly refresh</span>
                <span className="w-2 h-2 rounded-full bg-[var(--brand-amber)] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts

