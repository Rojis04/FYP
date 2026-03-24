import React from "react"
import styles from "../../styles/styles"

const brands = [
  { name: "Sephora", slug: "sephora", domain: "sephora.com" },
  { name: "MAC Cosmetics", slug: "maccosmetics", domain: "maccosmetics.com" },
  { name: "Maybelline", slug: "maybelline", domain: "maybelline.com" },
  { name: "L'Oreal", slug: "loreal", domain: "lorealparis.com" },
  { name: "CeraVe", slug: "cerave", domain: "cerave.com" },
  { name: "The Ordinary", slug: "theordinary", domain: "theordinary.com" },
  { name: "La Roche-Posay", slug: "larocheposay", domain: "laroche-posay.com" },
]

const iconUrl = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/${slug}.svg`
const clearbitUrl = (domain) => `https://logo.clearbit.com/${domain}`

const Sponsored = () => {
  return (
    <section className="relative py-16 hidden sm:block">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(860px_480px_at_10%_8%,rgba(31,122,111,0.14),transparent_60%),radial-gradient(700px_420px_at_92%_18%,rgba(245,162,74,0.18),transparent_60%)]" />

      <div className={`${styles.section}`}>
        <div className="rounded-[36px] border border-[var(--brand-mist)] bg-white/90 backdrop-blur p-8 shadow-[0_22px_60px_rgba(15,24,23,0.12)]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-cream)] border border-[var(--brand-mist)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-amber)]" />
                <span className="text-xs font-semibold text-[var(--brand-ink)] tracking-[0.3em] uppercase">
                  Brand partners
                </span>
              </div>

              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[var(--brand-ink)] font-Poppins">
                Trusted by leading care labels
              </h2>

              <p className="mt-3 text-sm md:text-base text-gray-600 max-w-md">
                Curaluxe partners with verified beauty and pharmacy labels for authenticity and safety.
              </p>
            </div>

            <div className="text-xs font-semibold text-[var(--brand-ink)] bg-[var(--brand-mist)] px-4 py-2 rounded-full">
              Logos are sourced from public providers
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5">
              {brands.map((b, idx) => (
                <div
                  key={idx}
                  className="
                    group
                    rounded-2xl
                    bg-white
                    border border-[var(--brand-mist)]
                    shadow-sm
                    flex items-center justify-center
                    h-[88px]
                    transition-all duration-300
                    hover:shadow-md
                    hover:-translate-y-1
                  "
                  title={b.name}
                >
                  <img
                    src={iconUrl(b.slug)}
                    alt={b.name}
                    loading="lazy"
                    className="
                      max-h-[42px]
                      max-w-[120px]
                      object-contain
                      opacity-80
                      transition-all duration-300
                      group-hover:opacity-100
                      group-hover:scale-105
                    "
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = clearbitUrl(b.domain)
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sponsored

