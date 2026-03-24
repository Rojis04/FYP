import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { FaShoppingBag } from "react-icons/fa"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const Hero = () => {
  const slides = useMemo(
    () => [
      {
        bg: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=2000&q=80",
        kicker: "Clinical clarity",
        title: "Shop beauty + pharmacy with full transparency.",
        accent: "Live stock, clear pricing, and trusted checkout.",
        description:
          "Curaluxe brings verified products, reliable inventory, and safe payments into a single care marketplace.",
        stats: ["4,200+ verified items", "98% stock accuracy", "24/7 care support"],
      },
      {
        bg: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=80",
        kicker: "Rituals made simple",
        title: "Build routines that fit your skin and lifestyle.",
        accent: "Curated kits, ingredient notes, and expert picks.",
        description:
          "Discover makeup, skincare, and wellness essentials that work together with clear usage guidance.",
        stats: ["Ingredient transparency", "Routine bundles", "Smart filtering"],
      },
      {
        bg: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=2000&q=80",
        kicker: "Trusted essentials",
        title: "Verified products for everyday care.",
        accent: "Shop confidently with clear details and sourcing.",
        description:
          "Browse a curated catalog that highlights verified items, ingredients, and usage details.",
        stats: ["Verified sourcing", "Clear ingredients", "Daily essentials"],
      },
      {
        bg: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=80",
        kicker: "For local stores",
        title: "Automate inventory, orders, and client records.",
        accent: "Reduce manual work and improve customer care.",
        description:
          "Store teams manage orders, stock, and client files from one centralized system with fewer errors.",
        stats: ["Inventory automation", "Order monitoring", "Customer history"],
      },
      {
        bg: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=2000&q=80",
        kicker: "Care bundles",
        title: "Bundle routines with built-in savings.",
        accent: "Save time with guided bundles and clear steps.",
        description:
          "Pick pre-built bundles or assemble your own routine with compatible products and clear guidance.",
        stats: ["Smart bundles", "Compatible picks", "Guided steps"],
      },
      {
        bg: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=80",
        kicker: "Instant clarity",
        title: "See what is in stock before checkout.",
        accent: "No surprises with live availability.",
        description:
          "Stay confident with real-time availability, transparent pricing, and accurate delivery windows.",
        stats: ["Live availability", "Clear pricing", "Reliable delivery"],
      },
      {
        bg: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=2000&q=80",
        kicker: "Safer checkout",
        title: "Reliable payment options with added protection.",
        accent: "Secure payments, verified orders.",
        description:
          "Every order is processed with secure methods and built-in verification to protect customers.",
        stats: ["Secure payments", "Verified orders", "Support ready"],
      },
    ],
    []
  )

  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 5200)
    return () => clearInterval(timer)
  }, [slides.length])

  const slide = slides[active]

  const nextSlide = () => setActive((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setActive((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {slides.map((item, idx) => (
        <div
          key={item.title}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-[1400ms] ${
            active === idx ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${item.bg})`,
            transform: active === idx ? "scale(1)" : "scale(1.03)",
            transition: "opacity 1400ms ease, transform 1400ms ease",
            animation: active === idx ? "heroDrift 16s ease-in-out infinite" : "none",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.35),transparent_60%)]" />
      <div className="absolute inset-0 hero-shimmer" />
      <div className="absolute -top-24 -left-16 w-[420px] h-[420px] rounded-full bg-[var(--brand-gold)]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-10 w-[440px] h-[440px] rounded-full bg-[var(--brand-sage)]/30 blur-3xl" />

      <div className="hero-orbit w-[420px] h-[420px] -left-20 top-[10%] border-white/20" />
      <div className="hero-orbit w-[280px] h-[280px] right-[-50px] bottom-[6%] border-white/15" />

      <div className="app-section relative z-10">
        <div className="text-white max-w-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur hero-badge">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-gold)]" />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold">{slide.kicker}</span>
          </div>

          <div key={slide.title} className="hero-copy">
            <h1 className="mt-6 text-4xl md:text-6xl font-semibold leading-tight font-Poppins hero-title">
              {slide.title}
            </h1>
            <p className="mt-4 text-lg text-white/90 hero-accent">{slide.accent}</p>
            <p className="mt-5 text-sm md:text-base text-white/70 max-w-2xl hero-desc">{slide.description}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 hero-ctas">
            <Link to="/products" className="btn-primary inline-flex items-center gap-3 hero-primary">
              <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                <FaShoppingBag size={18} />
              </span>
              Explore the catalog
            </Link>
            <Link to="/events" className="btn-ghost inline-flex items-center gap-2 text-white border-white/40 bg-white/10 hero-secondary">
              View care bundles
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 hero-stats">
            {slide.stats.map((item) => (
              <span key={item} className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs tracking-wide">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3 hero-controls">
            <button
              type="button"
              onClick={prevSlide}
              className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Previous slide"
            >
              <IoIosArrowBack />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`h-2 rounded-full transition-all ${active === idx ? "w-10 bg-white" : "w-3 bg-white/40"}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={nextSlide}
              className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Next slide"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .hero-shimmer {
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.02),
            rgba(0, 0, 0, 0)
          );
          mix-blend-mode: screen;
          animation: heroSheen 9s ease-in-out infinite;
        }

        .hero-badge {
          animation: floatBadge 6s ease-in-out infinite;
        }
        .hero-copy {
          animation: heroRise 0.8s ease both;
        }
        .hero-title {
          animation: heroRise 0.9s ease both;
        }
        .hero-accent {
          animation: heroRise 1s ease both;
        }
        .hero-desc {
          animation: heroRise 1.1s ease both;
        }
        .hero-ctas {
          animation: heroRise 1.2s ease both;
        }
        .hero-primary {
          position: relative;
          overflow: hidden;
          animation: pulseGlow 2.8s ease-in-out infinite;
        }
        .hero-primary::after {
          content: "";
          position: absolute;
          inset: -40%;
          background: radial-gradient(circle, rgba(255,255,255,0.3), transparent 55%);
          opacity: 0;
          animation: sparkSweep 3.2s ease-in-out infinite;
        }
        .hero-secondary {
          animation: heroRise 1.25s ease both;
        }
        .hero-stats {
          animation: heroRise 1.3s ease both;
        }
        .hero-controls {
          animation: heroRise 1.4s ease both;
        }

        @keyframes heroDrift {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
            background-position: 50% 50%;
          }
          50% {
            transform: scale(1.06) translate3d(0, -8px, 0);
            background-position: 55% 45%;
          }
          100% {
            transform: scale(1) translate3d(0, 0, 0);
            background-position: 50% 50%;
          }
        }

        @keyframes heroSheen {
          0% {
            opacity: 0.25;
            transform: translateX(-10%);
          }
          50% {
            opacity: 0.5;
            transform: translateX(10%);
          }
          100% {
            opacity: 0.25;
            transform: translateX(-10%);
          }
        }

        @keyframes heroRise {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatBadge {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.18);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        @keyframes sparkSweep {
          0% {
            opacity: 0;
            transform: translateX(-20%);
          }
          50% {
            opacity: 0.5;
            transform: translateX(0%);
          }
          100% {
            opacity: 0;
            transform: translateX(20%);
          }
        }
      `}</style>
    </section>
  )
}

export default Hero

