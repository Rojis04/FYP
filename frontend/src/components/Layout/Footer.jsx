import React from "react"
import { Link } from "react-router-dom"
import { AiFillFacebook, AiOutlineTwitter, AiFillInstagram, AiFillYoutube } from "react-icons/ai"

const SOCIALS = [
  { name: "Facebook", href: "https://facebook.com", icon: <AiFillFacebook size={20} /> },
  { name: "Twitter", href: "https://twitter.com", icon: <AiOutlineTwitter size={20} /> },
  { name: "Instagram", href: "https://instagram.com", icon: <AiFillInstagram size={20} /> },
  { name: "YouTube", href: "https://youtube.com", icon: <AiFillYoutube size={20} /> },
]

const Footer = () => {
  return (
    <footer className="relative text-white">
      <div className="absolute inset-0 -z-10 bg-[#0a1211]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(820px_460px_at_8%_10%,rgba(31,122,111,0.24),transparent_60%),radial-gradient(760px_420px_at_92%_18%,rgba(245,162,74,0.18),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-stretch">
          <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_24px_70px_-30px_rgba(0,0,0,0.7)] p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-gold)]" />
              <span className="text-xs font-semibold text-white/90 tracking-wide">Insider list</span>
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight">
              Fresh drops + verified essentials, delivered weekly
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/70">
              Simple updates, real pricing, and curated routines for your everyday care.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10">Verified sellers</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10">Weekly deals</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10">No spam</span>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_24px_70px_-30px_rgba(0,0,0,0.7)] p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold">Get updates</div>
            <div className="mt-4">
              <label className="text-sm text-white/80">Email address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/55 outline-none focus:ring-4 focus:ring-[var(--brand-gold)]/20 focus:border-[var(--brand-gold)]/40 transition"
              />
            </div>
            <button className="mt-4 w-full rounded-xl px-6 py-3 font-bold bg-[var(--brand-gold)] text-[#1b1b1f] hover:brightness-110 transition shadow-[0_12px_30px_-18px_rgba(241,199,119,0.9)]">
              Subscribe
            </button>
            <p className="mt-3 text-xs text-white/55">We only send helpful updates. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                <span className="font-extrabold text-white">S</span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold">Curaluxe</h3>
                <p className="text-xs text-white/60 -mt-0.5">Pharmacy and Beauty</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">
              Shop verified essentials and curated routines from trusted partners across the region.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center"
                  aria-label={s.name}
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-bold tracking-wide text-white/90">Company</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li><Link to="#" className="hover:text-white transition">About Curaluxe</Link></li>
                <li><Link to="#" className="hover:text-white transition">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition">Journal</Link></li>
                <li><Link to="#" className="hover:text-white transition">Partner Program</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold tracking-wide text-white/90">Shop</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li><Link to="#" className="hover:text-white transition">Skincare</Link></li>
                <li><Link to="#" className="hover:text-white transition">Pharmacy</Link></li>
                <li><Link to="#" className="hover:text-white transition">Personal Care</Link></li>
                <li><Link to="#" className="hover:text-white transition">Supplements</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold tracking-wide text-white/90">Support</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li><Link to="#" className="hover:text-white transition">Help Center</Link></li>
                <li><Link to="#" className="hover:text-white transition">Orders and Returns</Link></li>
                <li><Link to="#" className="hover:text-white transition">Shipping Info</Link></li>
                <li><Link to="#" className="hover:text-white transition">Track Order</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold tracking-wide text-white/90">Legal</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li><Link to="#" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-white transition">Refund Policy</Link></li>
                <li><Link to="#" className="hover:text-white transition">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
            <p>Copyright {new Date().getFullYear()} Curaluxe. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--brand-gold)] animate-pulse" />
                Secure checkout
              </span>
              <span className="hidden sm:inline">|</span>
              <span>Designed for everyday care</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

