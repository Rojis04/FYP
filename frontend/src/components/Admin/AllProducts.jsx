// ShopProfileData.jsx (AllProducts)
import React, { useEffect, useMemo, useState } from "react"
import { Button } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"
import { FiSearch, FiPlus, FiPackage } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { deleteProduct } from "../../redux/actions/product"
import Loader from "../Layout/Loader"
import { toast } from "react-toastify"
import axios from "axios"
import { server } from "../../server"

const AllProducts = () => {
  const dispatch = useDispatch()

  const [localProducts, setLocalProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [q, setQ] = useState("")
  const [stockFilter, setStockFilter] = useState("all") // all | low | out | in

  useEffect(() => {
    const loadAdminProducts = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`${server}/product/admin-all-products`, { withCredentials: true })
        setLocalProducts(data.products || [])
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load products.")
      } finally {
        setIsLoading(false)
      }
    }
    loadAdminProducts()
  }, [])

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?")
    if (!confirmDelete) return

    try {
      await dispatch(deleteProduct(id))
      toast.success("Product deleted successfully!")
      setLocalProducts((prev) => prev.filter((item) => item._id !== id))
    } catch (error) {
      toast.error("Failed to delete product!")
      console.error(error)
    }
  }

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase()
    return (localProducts || [])
      .filter((p) => {
        if (!text) return true
        return (
          (p?.name || "").toLowerCase().includes(text) ||
          (p?._id || "").toLowerCase().includes(text)
        )
      })
      .filter((p) => {
        const st = Number(p?.stock || 0)
        if (stockFilter === "low") return st > 0 && st < 10
        if (stockFilter === "out") return st === 0
        if (stockFilter === "in") return st >= 10
        return true
      })
  }, [localProducts, q, stockFilter])

  const rows = useMemo(() => {
    return filtered.map((item) => ({
      id: item._id,
      name: item.name,
      image: item?.images?.[0]?.url || "",
      category: item.category || "-",
      shopName: item?.shop?.name || "-",
      price: item.discountPrice ?? item.originalPrice ?? 0,
      Stock: item.stock ?? 0,
      sold: item.sold_out ?? 0,
    }))
  }, [filtered])

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 180, flex: 0.9 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 260,
      flex: 1.5,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          {params.row.image ? (
            <img
              src={params.row.image}
              alt={params.value || "Product"}
              className="h-10 w-10 rounded-xl object-cover border border-[#e2e8f0]"
            />
          ) : (
            <span className="h-10 w-10 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#0f172a]">
              <FiPackage size={18} />
            </span>
          )}
          <div className="leading-tight">
            <div className="font-semibold text-[#0f172a]">{params.value}</div>
            <div className="text-xs text-[#64748b]">{params.row.category}</div>
          </div>
        </div>
      ),
    },
    {
      field: "shopName",
      headerName: "Shop",
      minWidth: 160,
      flex: 0.8,
      renderCell: (params) => <span className="text-sm text-[#0f172a]">{params.value}</span>,
    },

    {
      field: "price",
      headerName: "Price",
      minWidth: 140,
      flex: 0.7,
      type: "number",
      valueFormatter: (p) => `Rs. ${p.value}`,
      renderCell: (params) => <span className="font-semibold text-[#0f172a]">Rs. {params.value}</span>,
    },

    {
      field: "Stock",
      headerName: "Stock",
      minWidth: 120,
      flex: 0.6,
      type: "number",
      renderCell: (params) => {
        const v = Number(params.value || 0)
        const cls =
          v === 0
            ? "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30"
            : v < 10
              ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30"
              : "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
        const label = v === 0 ? "Out" : v < 10 ? "Low" : "In stock"

        return (
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>{label}</span>
            <span className="text-sm font-semibold text-[#0f172a]">{v}</span>
          </div>
        )
      },
    },

    {
      field: "sold",
      headerName: "Sold",
      minWidth: 110,
      flex: 0.6,
      type: "number",
      renderCell: (params) => <span className="font-medium text-[#64748b]">{params.value}</span>,
    },

    {
      field: "Preview",
      flex: 0.45,
      minWidth: 90,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.id}`}>
          <Button className="!min-w-[40px] !h-[40px] !rounded-xl !p-0 hover:!bg-[#f1f5f9]">
            <AiOutlineEye size={20} className="text-[#0f172a]" />
          </Button>
        </Link>
      ),
    },

    {
      field: "Delete",
      flex: 0.45,
      minWidth: 90,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.id)}
          className="!min-w-[40px] !h-[40px] !rounded-xl !p-0 hover:!bg-rose-50"
        >
          <AiOutlineDelete size={20} className="text-rose-600" />
        </Button>
      ),
    },
  ]

  const gridSx = {
    border: 0,
    color: "#0f172a",
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: "1px solid rgba(148,163,184,0.25)",
      backgroundColor: "#f8fafc",
      fontWeight: 800,
    },
    "& .MuiDataGrid-cell": { borderBottom: "1px solid rgba(148,163,184,0.18)" },
    "& .MuiDataGrid-row:hover": { backgroundColor: "rgba(148,163,184,0.08)" },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "1px solid rgba(148,163,184,0.25)",
    },
    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
      outline: "none",
    },
  }

  const totalCount = localProducts?.length || 0
  const lowCount = (localProducts || []).filter((p) => (p?.stock || 0) > 0 && (p?.stock || 0) < 10).length
  const outCount = (localProducts || []).filter((p) => (p?.stock || 0) === 0).length

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4 md:p-6 text-[#0f172a]">
          {/* Elaris Header */}
          <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm mb-6">
            <div className="px-5 py-4 md:px-6 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#94a3b8]">Inventory Control</p>
                <h2 className="mt-2 text-[22px] md:text-[26px] font-semibold text-[#0f172a]">All Products</h2>
                <p className="text-sm text-[#64748b] mt-1">Manage listings, stock, and pricing.</p>

                {/* Stats chips */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a]">
                    Total: {totalCount}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30">
                    Low stock: {lowCount}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30">
                    Out: {outCount}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to="/dashboard-create-product"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0f172a] text-white text-sm font-semibold transition"
                >
                  <FiPlus size={16} />
                  Add Product
                </Link>
              </div>
            </div>

            {/* Toolbar: Search + Filter */}
            <div className="px-6 pb-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 rounded-2xl border border-[#e2e8f0] bg-white px-4 h-12">
                    <FiSearch className="text-[#94a3b8]" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search by product name or ID"
                      className="w-full outline-none bg-transparent text-sm text-[#0f172a] placeholder:text-[#94a3b8]"
                    />
                  </div>
                </div>

                <div>
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="w-full h-12 rounded-2xl border border-[#e2e8f0] bg-white px-4 text-sm text-[#0f172a] outline-none"
                  >
                    <option value="all">All stock</option>
                    <option value="in">In stock (10+)</option>
                    <option value="low">Low stock (1-9)</option>
                    <option value="out">Out of stock (0)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-5 md:px-8 md:py-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#0f172a]">Product List</h3>
                <p className="text-sm text-[#64748b] mt-1">
                  Showing {rows.length} of {totalCount}
                </p>
              </div>
            </div>

            <div className="px-3 md:px-5 pb-5">
              <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  autoHeight
                  sx={gridSx}
                />
              </div>

              {rows.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-[#64748b]">
                  No products found. Try another search or add a new product.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AllProducts

