"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { server } from "../../server"
import Loader from "../Layout/Loader"
import { useDispatch, useSelector } from "react-redux"
import { getAllProductsShop } from "../../redux/actions/product"
import {
  FiEdit,
  FiLogOut,
  FiMapPin,
  FiPhone,
  FiShoppingBag,
  FiStar,
  FiCalendar,
  FiTrendingUp,
  FiCheck,
  FiHome,
  FiGrid,
  FiUser,
  FiSettings,
  FiSearch,
} from "react-icons/fi"

/* Navbar INSIDE same file (no import, no resolve error) */
const ElarisNavbar = () => {
  return (
    <header className="gc_navWrap">
      <div className="gc_navTop" />

      <div className="gc_navInner">
        {/* Brand */}
        <Link to="/" className="gc_brand">
          <span className="gc_brandDot" />
          <span className="gc_brandText">Lumea</span>
        </Link>

        {/* Search */}
        <div className="gc_search">
          <FiSearch className="gc_searchIcon" />
          <input className="gc_searchInput" placeholder="Search products..." />
        </div>

        {/* Links */}
        <nav className="gc_links">
          <Link to="/" className="gc_link">
            <FiHome />
            <span>Home</span>
          </Link>
          <Link to="/pro" className="gc_link">
            <FiGrid />
            <span>Shops</span>
          </Link>
          <Link to="/settings" className="gc_link">
            <FiUser />
            <span>Profile</span>
          </Link>
          <Link to="/dashboard" className="gc_btn">
            <FiSettings />
            <span>Dashboard</span>
          </Link>
        </nav>
      </div>

      {/* Navbar styles */}
      <style jsx global>{`
        .gc_navWrap {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(11, 17, 32, 0.94);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(31, 41, 55, 0.9);
        }
        .gc_navTop {
          height: 6px;
          background: linear-gradient(90deg, #22c55e, #38bdf8, #0ea5e9);
        }
        .gc_navInner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }
        .gc_brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .gc_brandDot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: linear-gradient(90deg, #22c55e, #38bdf8);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
        }
        .gc_brandText {
          font-size: 18px;
          font-weight: 900;
          color: #e2e8f0;
          letter-spacing: 0.2px;
        }

        .gc_search {
          flex: 1;
          max-width: 420px;
          position: relative;
          display: none;
        }
        .gc_searchIcon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(226, 232, 240, 0.6);
        }
        .gc_searchInput {
          width: 100%;
          padding: 10px 12px 10px 38px;
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          background: #0b1120;
          font-weight: 600;
          color: #e2e8f0;
          outline: none;
        }
        .gc_searchInput:focus {
          border-color: rgba(56, 189, 248, 0.6);
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
        }

        .gc_links {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .gc_link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 800;
          color: #e2e8f0;
          border: 1px solid rgba(148, 163, 184, 0.2);
          background: rgba(15, 23, 42, 0.8);
          transition: 160ms ease;
          white-space: nowrap;
        }
        .gc_link:hover {
          background: rgba(148, 163, 184, 0.12);
          transform: translateY(-1px);
        }
        .gc_btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 900;
          color: #fff;
          background: linear-gradient(90deg, #22c55e, #38bdf8, #0ea5e9);
          border: 1px solid rgba(148, 163, 184, 0.25);
          box-shadow: 0 14px 26px rgba(2, 6, 23, 0.6);
          transition: 160ms ease;
          white-space: nowrap;
        }
        .gc_btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 32px rgba(2, 6, 23, 0.7);
        }

        @media (min-width: 900px) {
          .gc_search {
            display: block;
          }
        }
        @media (max-width: 640px) {
          .gc_link span,
          .gc_btn span {
            display: none;
          }
        }
      `}</style>
    </header>
  )
}

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({})
  const { products } = useSelector((state) => state.products)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return

    dispatch(getAllProductsShop(id))
    setIsLoading(true)

    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }, [dispatch, id])

  const logoutHandler = async () => {
    await axios.get(`${server}/shop/logout`, { withCredentials: true })
    window.location.reload()
  }

  const totalReviewsLength = products?.reduce((acc, p) => acc + (p?.reviews?.length || 0), 0) || 0
  const totalRatings =
    products?.reduce((acc, p) => acc + (p?.reviews?.reduce((sum, r) => sum + (r?.rating || 0), 0) || 0), 0) || 0

  const averageRating = totalReviewsLength ? totalRatings / totalReviewsLength : 0
  const totalSales = products?.reduce((acc, p) => acc + (p?.sold_out || 0), 0) || 0

  // (same logic as your earlier code)
  const isVerified = data?.isVerified || true

  return (
    <>
      <ElarisNavbar />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 text-slate-100">
          <div className="bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden transition-all border border-[#1f2937]">
            {/* Cover */}
            <div className="relative h-48 bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0b1120] overflow-hidden">
              {data?.coverImage && (
                <img
                  src={data.coverImage.url || "/placeholder.svg"}
                  alt="Shop Cover"
                  className="w-full h-full object-cover opacity-30"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] to-transparent"></div>
            </div>

            {/* Profile */}
            <div className="relative px-6 pt-0 pb-6 -mt-16">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-[120px] h-[120px] rounded-full border-4 border-[#0b1120] shadow-xl overflow-hidden mb-4 bg-[#111827]">
                    <img
                      src={data?.avatar?.url || "/placeholder.svg?height=120&width=120&query=shop"}
                      alt={data?.name || "Shop"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {isVerified && (
                    <div className="absolute bottom-4 right-0 bg-emerald-500 rounded-full p-1 border-2 border-[#0b1120]">
                      <FiCheck className="text-white text-sm" />
                    </div>
                  )}
                </div>

                <h1 className="text-2xl font-bold mb-2 text-white">{data?.name}</h1>

                <div className="flex items-center gap-2 bg-[#111827] px-3 py-1 rounded-full mb-4 border border-[#1f2937]">
                  <FiStar className="text-amber-400" />
                  <span className="font-medium text-white">{averageRating.toFixed(1)}/5</span>
                  <span className="text-sm text-slate-300">({totalReviewsLength} reviews)</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 px-6 mb-6">
              <div className="bg-gradient-to-r from-[#22c55e] to-[#0ea5e9] rounded-lg p-3 text-white flex items-center">
                <div className="p-2 bg-white/15 rounded-full mr-3">
                  <FiShoppingBag />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/80">Products</p>
                  <p className="text-xl font-bold">{products?.length || 0}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] rounded-lg p-3 text-white flex items-center">
                <div className="p-2 bg-white/15 rounded-full mr-3">
                  <FiTrendingUp />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/80">Sales</p>
                  <p className="text-xl font-bold">{totalSales || 0}</p>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="px-6 py-4 border-t border-[#1f2937]">
              <h2 className="text-lg font-semibold text-white mb-2">About the Shop</h2>
              <p className="text-slate-300 leading-relaxed">
                {data?.description || "This shop has not added a description yet."}
              </p>
            </div>

            {/* Details */}
            <div className="px-6 py-4 bg-[#0b1120]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#0f172a] rounded-full border border-[#1f2937]">
                    <FiMapPin className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Address</h3>
                    <p className="text-slate-300">{data?.address || "No address provided"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#0f172a] rounded-full border border-[#1f2937]">
                    <FiPhone className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phone Number</h3>
                    <p className="text-slate-300">{data?.phoneNumber || "No phone provided"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#0f172a] rounded-full border border-[#1f2937]">
                    <FiShoppingBag className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Total Products</h3>
                    <p className="text-slate-300">{products?.length || 0}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#0f172a] rounded-full border border-[#1f2937]">
                    <FiCalendar className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Joined On</h3>
                    <p className="text-slate-300">
                      {data?.createdAt
                        ? new Date(data.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner actions */}
            {isOwner && (
              <div className="px-6 py-4 bg-[#0b1120] border-t border-[#1f2937]">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/settings" className="flex-1">
                    <button className="w-full bg-gradient-to-r from-[#22c55e] to-[#0ea5e9] text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      <FiEdit className="text-lg" />
                      <span>Edit Shop</span>
                    </button>
                  </Link>

                  <button
                    className="flex-1 border-2 border-[#38bdf8] text-[#38bdf8] hover:bg-[#0f172a] font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
                    onClick={logoutHandler}
                  >
                    <FiLogOut className="text-lg" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ShopInfo


