import React from "react"
import { FiTruck, FiCreditCard, FiCheckCircle } from "react-icons/fi"

const steps = [
  {
    id: 1,
    title: "Shipping",
    desc: "Add delivery details for your order.",
    icon: FiTruck,
  },
  {
    id: 2,
    title: "Payment",
    desc: "Choose a secure payment method.",
    icon: FiCreditCard,
  },
  {
    id: 3,
    title: "Success",
    desc: "Order confirmed and being processed.",
    icon: FiCheckCircle,
  },
]

const CheckoutSteps = ({ active = 1 }) => {
  return (
    <div className="w-full py-8">
      <div className="w-[95%] 900px:w-[85%] lg:w-[70%] mx-auto">
        <div className="rounded-[28px] border border-[var(--brand-mist)] bg-white/90 backdrop-blur p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-reef)] font-semibold">
                Checkout flow
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-[var(--brand-ink)]">Complete your order</h2>
              <p className="text-sm text-gray-500 mt-1">Three short steps to confirm and pay.</p>
            </div>
            <div className="text-xs px-3 py-2 rounded-full bg-[var(--brand-mist)] text-[var(--brand-ink)] font-semibold">
              Step {active} of 3
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((s) => {
              const isDone = active > s.id
              const isActive = active === s.id
              const Icon = s.icon

              return (
                <div
                  key={s.id}
                  className={`rounded-2xl border p-4 transition ${
                    isActive
                      ? "border-[var(--brand-forest)] bg-[var(--brand-forest)] text-white shadow-md"
                      : isDone
                      ? "border-[var(--brand-mist)] bg-white text-[var(--brand-ink)]"
                      : "border-[var(--brand-mist)] bg-white/70 text-[var(--brand-ink)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isActive ? "bg-white/20" : "bg-[var(--brand-mist)] text-[var(--brand-reef)]"
                        }`}
                      >
                        {isDone ? <FiCheckCircle /> : <Icon />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{s.title}</div>
                        <div className={`text-xs ${isActive ? "text-white/80" : "text-gray-500"}`}>{s.desc}</div>
                      </div>
                    </div>
                    <div className={`text-xs font-semibold ${isActive ? "text-white" : "text-gray-400"}`}>
                      0{s.id}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-5 text-center text-xs text-gray-500">
          Need help? Contact support anytime, we are here for you.
        </div>
      </div>
    </div>
  )
}

export default CheckoutSteps
