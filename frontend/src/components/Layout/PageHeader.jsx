import React from "react"

const PageHeader = ({ kicker, title, subtitle, align = "left" }) => {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start"

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="absolute inset-0 -z-10 bg-[var(--brand-cream)]" />
      <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-[var(--brand-amber)]/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-24 h-64 w-64 rounded-full bg-[var(--brand-reef)]/20 blur-3xl" />

      <div className={`app-section flex flex-col ${alignClass} gap-3`}>
        {kicker ? (
          <span className="px-4 py-2 rounded-full bg-white/80 border border-[var(--brand-mist)] text-xs uppercase tracking-[0.3em] text-[var(--brand-reef)] font-semibold">
            {kicker}
          </span>
        ) : null}
        <h1 className="section-title text-3xl md:text-4xl">{title}</h1>
        {subtitle ? <p className="section-subtitle max-w-2xl">{subtitle}</p> : null}
      </div>
    </section>
  )
}

export default PageHeader

