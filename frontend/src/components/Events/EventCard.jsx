import React, { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import CountDown from "./CountDown"
import { addTocart } from "../../redux/actions/cart"
import { FiShoppingBag, FiArrowUpRight, FiZap } from "react-icons/fi"

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [timeUp, setTimeUp] = useState(false)

  const imageUrl = useMemo(() => data?.images?.[0]?.url || "/placeholder.svg", [data])
  const offPercent = useMemo(() => {
    if (!data?.originalPrice || !data?.discountPrice) return 0
    const p = ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
    return Number.isFinite(p) ? Math.max(0, Math.round(p)) : 0
  }, [data])

  const addToCartHandler = (product) => {
    const isItemExists = cart && cart.find((i) => i._id === product._id)
    if (isItemExists) return toast.error("Item already in cart!")
    if (product.stock < 1) return toast.error("Product stock limited!")

    dispatch(addTocart({ ...product, qty: 1 }))
    toast.success("Item added to cart successfully!")
  }

  if (!data) return null

  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white border border-[var(--brand-mist)] text-[var(--brand-forest)] shadow-sm">
            Care Bundle
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[var(--brand-mist)] text-[var(--brand-ink)] shadow-sm">
            Limited Window
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[var(--brand-mist)] text-[var(--brand-forest)] shadow-sm">
            {data?.sold_out || 0} sold
          </span>
          {offPercent > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[var(--brand-forest)] text-white shadow-sm">
              {offPercent}% OFF
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6">
          <div className="relative rounded-[28px] overflow-hidden border border-white/60 shadow-[0_24px_70px_rgba(15,61,55,0.14)]">
            <img src={imageUrl} alt={data.name} className="w-full h-[360px] lg:h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs uppercase tracking-[0.3em] text-white/80">Featured bundle</div>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold leading-tight">{data.name}</h2>
              <div className="mt-4 inline-flex items-center gap-3 bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-4 py-3">
                <div className="flex flex-col">
                  <span className="text-xs text-white/70">Event Price</span>
                  <span className="text-xl font-extrabold">Rs.{data.discountPrice}</span>
                </div>

                {data.originalPrice ? (
                  <div className="pl-3 border-l border-white/20">
                    <div className="text-xs text-white/70">MRP</div>
                    <div className="text-white/80 line-through font-semibold">Rs.{data.originalPrice}</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--brand-mist)] bg-white/90 backdrop-blur p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-reef)] font-semibold">Offer details</div>
                <h3 className="mt-2 text-2xl font-extrabold text-[var(--brand-ink)]">Bundle highlights</h3>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--brand-mist)] text-[var(--brand-forest)]">
                Event Live
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-4">
              {data.description}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[var(--brand-mist)]/60 border border-white p-4">
                <div className="text-xs text-[var(--brand-reef)] uppercase tracking-[0.25em]">Stock</div>
                <div className="text-lg font-extrabold text-[var(--brand-ink)] mt-2">{data.stock}</div>
              </div>
              <div className="rounded-2xl bg-[var(--brand-mist)]/60 border border-white p-4">
                <div className="text-xs text-[var(--brand-reef)] uppercase tracking-[0.25em]">You save</div>
                <div className="text-lg font-extrabold text-[var(--brand-ink)] mt-2">
                  Rs.{Math.max(0, (data.originalPrice || 0) - (data.discountPrice || 0))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--brand-mist)] bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs text-[var(--brand-reef)] font-semibold">Ends in</div>
                  <div className="text-base font-extrabold text-[var(--brand-ink)]">Countdown</div>
                </div>
                <FiZap className="text-[var(--brand-coral)]" />
              </div>
              <CountDown data={data} onTimeUpChange={setTimeUp} />
            </div>

            {!timeUp && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to={`/product/${data._id}?isEvent=true`} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--brand-forest)] text-white font-bold flex items-center justify-center gap-2 hover:opacity-95 transition">
                    Explore Offer <FiArrowUpRight />
                  </button>
                </Link>

                <button
                  onClick={() => addToCartHandler(data)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--brand-amber)] text-[var(--brand-ink)] font-bold flex items-center justify-center gap-2 hover:brightness-110 transition"
                >
                  Add to Bag <FiShoppingBag />
                </button>
              </div>
            )}

            {timeUp && (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--brand-mist)]">
                <FiZap />
                <span className="font-semibold text-[var(--brand-ink)]">This event has ended.</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-5">
          Limited-time promotional price. Subject to availability.
        </div>
      </div>
    </section>
  )
}

export default EventCard

