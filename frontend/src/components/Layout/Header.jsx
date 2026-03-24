import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { shoeCategoriesData } from "../../static/data"
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import { BiMenuAltLeft } from "react-icons/bi"
import DropDown from "./DropDown"
import Navbar from "./Navbar"
import { useSelector } from "react-redux"
import Cart from "../cart/Cart"
import Wishlist from "../Wishlist/Wishlist"
import { RxCross1 } from "react-icons/rx"
import { FiLogIn } from "react-icons/fi"
import { FaUserPlus } from "react-icons/fa"

const BRAND = {
  name: "Curaluxe",
  tagline: "Pharmacy and Beauty",
}

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { isSeller } = useSelector((state) => state.seller)
  const { wishlist } = useSelector((state) => state.wishlist)
  const { cart } = useSelector((state) => state.cart)
  const { allProducts } = useSelector((state) => state.products)

  const [searchTerm, setSearchTerm] = useState("")
  const [searchData, setSearchData] = useState([])
  const [dropDown, setDropDown] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [openWishlist, setOpenWishlist] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    const safeProducts = Array.isArray(allProducts) ? allProducts : []
    setSearchData(
      value.trim()
        ? safeProducts.filter((p) => (p?.name || "").toLowerCase().includes(value.toLowerCase()))
        : [],
    )
  }

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 70)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleProductClick = () => {
    setSearchTerm("")
    setSearchData([])
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <div className="hidden 800px:block bg-[var(--brand-deep)] text-white">
        <div className="app-section px-6 py-2 flex items-center justify-between text-[11px] uppercase tracking-[0.28em]">
          <span>Clarity-first pharmacy and beauty shopping</span>
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-amber)]" />
            Verified partners, live stock visibility
          </span>
        </div>
      </div>

      <div className="hidden 800px:block bg-white/90 backdrop-blur border-b border-[rgba(16,26,26,0.08)]">
        <div className="app-section px-6 py-6 grid grid-cols-[auto_1fr_auto] items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-[var(--brand-forest)] text-white flex items-center justify-center font-Poppins text-lg shadow-[0_12px_24px_rgba(15,24,23,0.2)]">
              C
            </span>
            <div className="leading-tight">
              <span className="text-2xl font-semibold tracking-wide text-[var(--brand-ink)] font-Poppins">
                {BRAND.name}
              </span>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-reef)]">
                {BRAND.tagline}
              </p>
            </div>
          </Link>

          <div className="relative z-40">
            <input
              type="text"
              placeholder="Search skincare, pharmacy care, and rituals"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[54px] w-full px-5 pr-12 rounded-full border border-[rgba(16,26,26,0.12)] bg-[var(--brand-cream)] focus:border-[var(--brand-reef)] focus:ring-4 focus:ring-[var(--brand-sage)]/40 transition shadow-sm"
            />
            <AiOutlineSearch className="absolute right-5 top-[16px] text-[var(--brand-reef)] text-xl" />

            {searchData.length > 0 && (
              <div className="absolute top-[115%] left-0 w-full bg-white shadow-2xl rounded-2xl p-2 z-50 border border-[var(--brand-mist)] max-h-[500px] overflow-y-auto">
                {searchData.map((product, index) => (
                  <Link to={`/product/${product._id}`} key={product?._id || index} onClick={handleProductClick}>
                    <div className="flex items-center p-2 hover:bg-[var(--brand-mist)] rounded-xl transition">
                      <img
                        src={product?.images?.[0]?.url || "/placeholder.svg"}
                        alt={product?.name || "Product"}
                        className="w-[44px] h-[44px] mr-3 rounded-xl object-cover border border-[var(--brand-mist)]"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-sm font-semibold text-[var(--brand-ink)]">{product?.name}</h1>
                        <p className="text-xs text-gray-500">Tap to view</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button type="button" className="relative" onClick={() => setOpenWishlist(true)}>
              <AiOutlineHeart size={26} className="text-[var(--brand-forest)]" />
              <span className="absolute -top-2 -right-2 bg-[var(--brand-coral)] rounded-full w-5 h-5 text-white text-xs flex items-center justify-center font-bold">
                {wishlist?.length || 0}
              </span>
            </button>

            <button type="button" className="relative" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={26} className="text-[var(--brand-forest)]" />
              <span className="absolute -top-2 -right-2 bg-[var(--brand-coral)] rounded-full w-5 h-5 text-white text-xs flex items-center justify-center font-bold">
                {cart?.length || 0}
              </span>
            </button>

            {isAuthenticated ? (
              <Link to="/profile">
                <img
                  src={user?.avatar?.url || "/placeholder.svg"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-[var(--brand-reef)]"
                />
              </Link>
            ) : (
              <Link to="/login">
                <CgProfile size={26} className="text-[var(--brand-forest)]" />
              </Link>
            )}

            <Link to={isSeller ? "/dashboard" : "/shop-create"}>
              <button className="btn-primary flex items-center gap-2 text-sm">
                {isSeller ? "Partner Portal" : "Open a Store"}
                <IoIosArrowForward />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`w-full px-4 py-4 transition-all duration-300 border-b border-[rgba(16,26,26,0.08)] bg-white/85 backdrop-blur ${
          isSticky ? "fixed top-0 left-0 shadow-[0_18px_40px_rgba(15,24,23,0.12)] z-50" : "relative"
        } 800px:flex hidden`}
      >
        <div className="app-section flex items-center justify-between gap-6">
          <div className="relative">
            <button
              className="flex items-center w-[230px] h-[46px] bg-[var(--brand-forest)] text-white text-[14px] font-semibold rounded-full px-4 shadow-md"
              onClick={() => setDropDown(!dropDown)}
            >
              <BiMenuAltLeft size={20} className="mr-2" />
              Departments
              <IoIosArrowDown size={18} className="ml-auto" />
            </button>
            {dropDown && <DropDown categoriesData={shoeCategoriesData} setDropDown={setDropDown} />}
          </div>

          <div className="flex-1 flex justify-center">
            <Navbar active={activeHeading} />
          </div>

          <div className="hidden 1100px:flex items-center gap-6 text-sm text-[var(--brand-ink)]/70">
            <Link to="/profile" className="hover:text-[var(--brand-reef)] transition">
              My Orders
            </Link>
            <Link to="/faq" className="hover:text-[var(--brand-reef)] transition">
              Support
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full 800px:hidden fixed bg-white z-50 top-0 left-0 shadow-md border-b border-[var(--brand-mist)]">
        <div className="w-full flex items-center justify-between px-4 py-3">
          <BiMenuAltLeft size={28} onClick={() => setOpen(true)} className="text-[var(--brand-forest)]" />

          <Link to="/" className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-[var(--brand-forest)] text-white flex items-center justify-center font-Poppins text-base">
              C
            </span>
            <span className="font-semibold text-lg text-[var(--brand-ink)] font-Poppins">
              {BRAND.name}
            </span>
          </Link>

          <button type="button" className="relative" onClick={() => setOpenCart(true)}>
            <AiOutlineShoppingCart size={24} className="text-[var(--brand-forest)]" />
            <span className="absolute -top-1.5 -right-1.5 bg-[var(--brand-coral)] rounded-full w-5 h-5 text-white text-[10px] flex items-center justify-center font-bold">
              {cart?.length || 0}
            </span>
          </button>
        </div>

        <div className="px-4 pb-3">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[44px] w-full px-4 pr-10 rounded-full border border-[rgba(16,26,26,0.12)] bg-[var(--brand-cream)]"
          />
        </div>

        {open && (
          <div className="fixed w-full bg-black bg-opacity-40 z-40 h-full top-0 left-0">
            <div className="fixed w-[78%] bg-white h-full top-0 left-0 z-50 overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b border-[var(--brand-mist)]">
                <div className="flex items-center gap-2">
                  <span className="w-10 h-10 rounded-xl bg-[var(--brand-forest)] text-white flex items-center justify-center font-Poppins">
                    C
                  </span>
                  <span className="font-semibold text-base text-[var(--brand-ink)] font-Poppins">
                    {BRAND.name}
                  </span>
                </div>
                <RxCross1 size={24} onClick={() => setOpen(false)} className="text-[var(--brand-forest)]" />
              </div>

              <div className="px-4 mt-4">
                <Navbar active={activeHeading} />
              </div>

              <div className="px-6 mt-6">
                <Link to={isSeller ? "/dashboard" : "/shop-create"} onClick={() => setOpen(false)}>
                  <button className="w-full btn-primary flex items-center justify-center gap-2 text-sm">
                    {isSeller ? "Partner Portal" : "Start Selling"}
                    <IoIosArrowForward className="text-lg" />
                  </button>
                </Link>
              </div>

              <div className="flex w-full justify-center mt-6 pb-10">
                {isAuthenticated ? (
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-[var(--brand-forest)] shadow-lg">
                      <img
                        src={user?.avatar?.url || "/placeholder.svg"}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-3 px-6 w-full">
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <button className="w-full bg-[var(--brand-ink)] text-white px-6 py-3 rounded-full flex items-center justify-center font-semibold">
                        <FiLogIn className="mr-2 text-[18px]" /> Login
                      </button>
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)}>
                      <button className="w-full bg-[var(--brand-reef)] text-white px-6 py-3 rounded-full flex items-center justify-center font-semibold">
                        <FaUserPlus className="mr-2 text-[18px]" /> Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  )
}

export default Header

