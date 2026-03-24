"use client"

import React, { useEffect, useMemo, useState } from "react"
import { State } from "country-state-city"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import { toast } from "react-toastify"

import { server } from "../../server"
import { FiCreditCard, FiTag, FiTruck, FiMapPin, FiCheckCircle, FiChevronDown } from "react-icons/fi"

const NEPAL_ISO_CODE = "NP"

const Checkout = () => {
  const { user } = useSelector((state) => state.user)
  const { cart } = useSelector((state) => state.cart)
  const navigate = useNavigate()

  const [city, setCity] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [zipCode, setZipCode] = useState("")

  const [showSaved, setShowSaved] = useState(false)
  const [selectedSavedIndex, setSelectedSavedIndex] = useState(null)

  const [couponCode, setCouponCode] = useState("")
  const [couponCodeData, setCouponCodeData] = useState(null)
  const [discountPrice, setDiscountPrice] = useState(0)
  const [couponLoading, setCouponLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const nepalCities = useMemo(() => State.getStatesOfCountry(NEPAL_ISO_CODE) || [], [])

  const subTotalPrice = useMemo(() => {
    return (cart || []).reduce((acc, item) => acc + Number(item?.qty || 0) * Number(item?.discountPrice || 0), 0)
  }, [cart])

  const shipping = 100

  const totalPrice = useMemo(() => {
    const discount = couponCodeData ? Number(discountPrice || 0) : 0
    const raw = subTotalPrice + shipping - discount
    return Math.max(0, raw).toFixed(2)
  }, [subTotalPrice, shipping, couponCodeData, discountPrice])

  const paymentSubmit = () => {
    if (!address1 || !zipCode || !city) {
      return toast.error("Please complete your delivery address!")
    }

    const shippingAddress = {
      address1,
      address2,
      zipCode,
      country: NEPAL_ISO_CODE,
      city,
    }

    const orderData = {
      cart,
      totalPrice: Number(totalPrice),
      subTotalPrice,
      shipping,
      discountPrice: couponCodeData ? Number(discountPrice || 0) : 0,
      shippingAddress,
      user,
    }

    localStorage.setItem("latestOrder", JSON.stringify(orderData))
    navigate("/payment")
  }

  const handleCouponSubmit = async (e) => {
    e.preventDefault()
    const code = couponCode.trim()
    if (!code) return toast.error("Enter a coupon code")

    try {
      setCouponLoading(true)

      const res = await axios.get(`${server}/coupon/get-coupon-value/${code}`, { withCredentials: true })
      const coupon = res?.data?.couponCode

      if (!coupon) {
        setCouponCode("")
        setCouponCodeData(null)
        setDiscountPrice(0)
        return toast.error("Coupon code doesn't exist!")
      }

      const shopId = coupon?.shopId
      const couponValue = Number(coupon?.value || 0)

      const eligibleItems = (cart || []).filter((item) => item?.shopId === shopId)

      if (!eligibleItems.length) {
        setCouponCode("")
        setCouponCodeData(null)
        setDiscountPrice(0)
        return toast.error("Coupon is not valid for items in your cart")
      }

      const eligiblePrice = eligibleItems.reduce(
        (acc, item) => acc + Number(item?.qty || 0) * Number(item?.discountPrice || 0),
        0
      )

      const discount = (eligiblePrice * couponValue) / 100

      setCouponCodeData(coupon)
      setDiscountPrice(discount)
      setCouponCode("")
      toast.success("Coupon applied")
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Error applying coupon")
    } finally {
      setCouponLoading(false)
    }
  }

  const filledShipping = Boolean(address1 && zipCode && city)

  return (
    <div className="min-h-screen bg-[var(--brand-cream)]">
      <div className="w-[95%] 1200px:w-[88%] mx-auto py-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-reef)] font-semibold">Checkout</div>
            <h1 className="mt-2 text-3xl font-extrabold text-[var(--brand-ink)] tracking-tight">
              Delivery and confirmation
            </h1>
            <p className="text-sm text-gray-500 mt-1">Add your shipping details to continue.</p>
          </div>
          <div className="text-xs font-semibold text-[var(--brand-ink)] bg-[var(--brand-mist)] px-3 py-2 rounded-full">
            {(cart || []).length} items in your cart
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-[var(--brand-mist)] bg-white/90 backdrop-blur p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[var(--brand-forest)] text-white flex items-center justify-center">
                    <FiMapPin />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--brand-ink)]">Shipping details</h2>
                    <p className="text-sm text-gray-500">Where should your order arrive?</p>
                  </div>
                </div>

                {filledShipping && (
                  <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl">
                    <FiCheckCircle />
                    <span>Ready</span>
                  </div>
                )}
              </div>

              {user?.addresses?.length > 0 && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowSaved((s) => !s)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[var(--brand-mist)] bg-white hover:bg-white transition"
                  >
                    <span className="text-sm font-semibold text-[var(--brand-ink)]">
                      {showSaved ? "Hide saved addresses" : "Use a saved address"}
                    </span>
                    <FiChevronDown className={`transition-transform ${showSaved ? "rotate-180" : ""}`} />
                  </button>

                  {showSaved && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.addresses.map((a, idx) => {
                        const active = selectedSavedIndex === idx
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => {
                              setSelectedSavedIndex(idx)
                              setAddress1(a.address1 || "")
                              setAddress2(a.address2 || "")
                              setZipCode(a.zipCode || "")
                              setCity(a.city || "")
                            }}
                            className={`text-left p-4 rounded-2xl border transition shadow-sm ${
                              active
                                ? "border-[var(--brand-forest)] bg-[var(--brand-forest)] text-white"
                                : "border-[var(--brand-mist)] bg-white hover:bg-white"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-bold">{a.addressType || "Saved Address"}</div>
                              <div className={`w-3 h-3 rounded-full ${active ? "bg-white" : "bg-[var(--brand-mist)]"}`} />
                            </div>
                            <div className={`text-sm mt-2 ${active ? "text-white/85" : "text-gray-500"}`}>
                              {a.address1}
                              {a.address2 ? `, ${a.address2}` : ""}
                              <br />
                              {a.city ? `${a.city}, ` : ""}Nepal {a.zipCode ? `- ${a.zipCode}` : ""}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Full Name">
                  <input
                    value={user?.name || ""}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] bg-white outline-none"
                  />
                </Field>

                <Field label="Email Address">
                  <input
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] bg-white outline-none"
                  />
                </Field>

                <Field label="Phone Number">
                  <input
                    value={user?.phoneNumber || ""}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] bg-white outline-none"
                  />
                </Field>

                <Field label="Zip Code">
                  <input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Postal code"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] outline-none focus:ring-2 focus:ring-[var(--brand-reef)]"
                  />
                </Field>

                <Field label="Country">
                  <input
                    value="Nepal"
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] bg-white outline-none"
                  />
                </Field>

                <Field label="City / Province">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] outline-none focus:ring-2 focus:ring-[var(--brand-reef)]"
                  >
                    <option value="">Select</option>
                    {nepalCities.map((c) => (
                      <option key={c.isoCode} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="md:col-span-2">
                  <Field label="Address Line 1">
                    <input
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      placeholder="Street, area, landmark"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] outline-none focus:ring-2 focus:ring-[var(--brand-reef)]"
                    />
                  </Field>
                </div>

                <div className="md:col-span-2">
                  <Field label="Address Line 2 (Optional)">
                    <input
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      placeholder="Apartment, floor, etc."
                      className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] outline-none focus:ring-2 focus:ring-[var(--brand-reef)]"
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--brand-mist)] bg-[var(--brand-cream)] p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[var(--brand-reef)] flex items-center justify-center border border-[var(--brand-mist)]">
                    <FiTruck />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--brand-ink)]">Delivery in Nepal</div>
                    <div className="text-sm text-gray-500">Flat shipping Rs.100, estimated 3-5 business days.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--brand-mist)] bg-white/90 backdrop-blur p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[var(--brand-mist)] text-[var(--brand-amber)] flex items-center justify-center">
                  <FiTag />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[var(--brand-ink)]">Promo code</h2>
                  <p className="text-sm text-gray-500">Apply discounts that match items from the same shop.</p>
                </div>
              </div>

              <div className="mt-5">
                <form onSubmit={handleCouponSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-[var(--brand-mist)] outline-none focus:ring-2 focus:ring-[var(--brand-amber)]"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading}
                    className="px-5 py-3 rounded-xl font-semibold text-white bg-[var(--brand-forest)] hover:opacity-95 transition disabled:opacity-60"
                  >
                    {couponLoading ? "Applying..." : "Apply"}
                  </button>
                </form>

                {couponCodeData && Number(discountPrice) > 0 && (
                  <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-800">
                    <div className="font-semibold">Coupon applied</div>
                    <div className="text-sm mt-1">
                      Discount: <b>Rs.{Number(discountPrice).toLocaleString()}</b>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-[var(--brand-mist)] bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[var(--brand-mist)]">
                <h2 className="text-lg font-bold text-[var(--brand-ink)]">Order summary</h2>
                <p className="text-sm text-gray-500 mt-1">{(cart || []).length} items in your order</p>
              </div>

              <div className="p-6 space-y-4">
                <Line label="Subtotal" value={`Rs.${Number(subTotalPrice).toLocaleString()}`} />
                <Line label="Shipping" value={`Rs.${shipping.toFixed(2)}`} pill="Flat" />
                {couponCodeData && Number(discountPrice) > 0 && (
                  <Line label="Discount" value={`- Rs.${Number(discountPrice).toLocaleString()}`} green />
                )}

                <div className="pt-4 border-t border-[var(--brand-mist)] flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-2xl font-extrabold text-[var(--brand-ink)]">Rs.{totalPrice}</div>
                  </div>

                  <div className="text-xs text-gray-500 bg-white border border-[var(--brand-mist)] px-3 py-2 rounded-xl text-right">
                    ETA <b>3-5 days</b>
                    <br />
                    Nepal Delivery
                  </div>
                </div>

                <button
                  onClick={paymentSubmit}
                  className="w-full mt-2 py-3 rounded-xl font-semibold text-white bg-[var(--brand-forest)] hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <FiCreditCard />
                  Proceed to Payment
                </button>

                {!filledShipping && (
                  <div className="text-xs text-[var(--brand-coral)] bg-[var(--brand-mist)] border border-[var(--brand-mist)] px-3 py-2 rounded-xl">
                    Fill Shipping Address to continue.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--brand-mist)] bg-white/90 backdrop-blur p-5 shadow-sm">
              <div className="text-sm font-bold text-[var(--brand-ink)] mb-3">Cart preview</div>
              <div className="space-y-3 max-h-[260px] overflow-auto pr-1">
                {(cart || []).slice(0, 6).map((it) => (
                  <div key={it?._id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-xl bg-[var(--brand-mist)] border border-[var(--brand-mist)] overflow-hidden flex items-center justify-center">
                      <img
                        src={it?.images?.[0]?.url || "/placeholder.svg"}
                        alt={it?.name || "item"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[var(--brand-ink)] line-clamp-1">{it?.name}</div>
                      <div className="text-xs text-gray-500">
                        Qty {it?.qty} | Rs.{Number(it?.discountPrice || 0).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-[var(--brand-ink)]">
                      Rs.{Number((it?.discountPrice || 0) * (it?.qty || 0)).toLocaleString()}
                    </div>
                  </div>
                ))}

                {(cart || []).length > 6 && (
                  <div className="text-xs text-gray-500 pt-2">+ {(cart || []).length - 6} more items</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Field = ({ label, children }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--brand-ink)]/70 mb-2">{label}</label>
      {children}
    </div>
  )
}

const Line = ({ label, value, pill, green }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">{label}</span>
        {pill && (
          <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--brand-mist)] text-[var(--brand-reef)]">
            {pill}
          </span>
        )}
      </div>
      <span className={`text-sm font-bold ${green ? "text-emerald-700" : "text-[var(--brand-ink)]"}`}>{value}</span>
    </div>
  )
}

export default Checkout
