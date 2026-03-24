import React from "react"
import { useSelector } from "react-redux"
import styles from "../../styles/styles"
import EventCard from "./EventCard"

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events)

  if (isLoading) {
    return (
      <div className="min-h-[50vh] bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-[3px] border-[var(--brand-mist)] border-t-[var(--brand-forest)] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_460px_at_12%_12%,rgba(245,162,74,0.18),transparent_60%),radial-gradient(780px_420px_at_88%_18%,rgba(31,122,111,0.16),transparent_60%)]" />

      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
          <div className="rounded-[30px] border border-[var(--brand-mist)] bg-white/90 backdrop-blur p-8 shadow-[0_22px_60px_rgba(15,24,23,0.12)]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--brand-mist)] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-reef)]" />
              <span className="text-xs md:text-sm font-semibold text-[var(--brand-ink)] tracking-[0.3em] uppercase">
                Care bundles
              </span>
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-[var(--brand-ink)] leading-tight font-Poppins">
              Limited-time bundles, curated for routines
            </h1>

            <p className="mt-3 text-sm md:text-base text-gray-600 max-w-[520px]">
              Shop seasonal picks and bundles from verified partners with clear timelines and savings.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-[var(--brand-ink)]">
              <div className="rounded-2xl border border-[var(--brand-mist)] bg-white px-4 py-3">
                <div className="font-semibold">Event status</div>
                <div className="text-gray-500">{allEvents?.length ? `${allEvents.length} live` : "No live events"}</div>
              </div>
              <div className="rounded-2xl border border-[var(--brand-mist)] bg-white px-4 py-3">
                <div className="font-semibold">Tips</div>
                <div className="text-gray-500">Open a bundle to view timing</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[32px] bg-white/70 backdrop-blur-md border border-[var(--brand-mist)]" />
            <div className="relative rounded-[32px] p-4 sm:p-6">
              {allEvents && allEvents.length > 0 ? (
                <div className="rounded-3xl bg-white border border-[var(--brand-mist)] shadow-sm overflow-hidden">
                  <div className="h-[5px] w-full bg-[var(--brand-forest)]" />
                  <div className="p-4 sm:p-6">
                    <EventCard data={allEvents[0]} />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-white border border-[var(--brand-mist)] shadow-sm p-10 text-center">
                  <div className="w-16 h-16 bg-[var(--brand-mist)] border border-white rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[var(--brand-forest)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl md:text-2xl font-extrabold text-[var(--brand-ink)] mb-2">
                    No Events Available
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    We are preparing new drops and exclusive offers. Check back soon.
                  </p>

                  <button className="mt-6 px-6 py-3 rounded-full font-semibold text-white bg-[var(--brand-forest)] hover:brightness-110 transition-colors">
                    Notify Me About Events
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events

