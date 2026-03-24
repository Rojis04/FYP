import React, { useEffect, useMemo } from "react"
import { AiOutlineMoneyCollect } from "react-icons/ai"
import { MdBorderClear } from "react-icons/md"
import { FiPackage } from "react-icons/fi"
import { Link } from "react-router-dom"
import { DataGrid } from "@material-ui/data-grid"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersOfAdmin } from "../../redux/actions/order"
import { getAllSellers } from "../../redux/actions/sellers"
import Loader from "../Layout/Loader"

const AdminDashboardMain = () => {
  const dispatch = useDispatch()

  const { adminOrders, adminOrderLoading } = useSelector((state) => state.order)
  const { sellers } = useSelector((state) => state.seller)

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin())
    dispatch(getAllSellers())
  }, [dispatch])

  const adminEarning = adminOrders?.reduce((acc, item) => acc + (item.totalPrice || 0) * 0.1, 0) || 0
  const adminBalance = adminEarning.toFixed(2)

  const rows = useMemo(() => {
    if (!adminOrders) return []
    return adminOrders.map((item) => ({
      id: item?._id,
      itemsQty: item?.cart?.reduce((acc, i) => acc + (i?.qty || 0), 0) || 0,
      total: item?.totalPrice || 0,
      status: item?.status || "Processing",
      createdAt: item?.createdAt ? item.createdAt.slice(0, 10) : "-",
    }))
  }, [adminOrders])

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 180, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 140,
      flex: 0.7,
      renderCell: (params) => {
        const v = params.value
        const cls =
          v === "Delivered"
            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
            : v === "Processing"
              ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
              : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"

        return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>{v}</span>
      },
    },
    {
      field: "itemsQty",
      headerName: "Items",
      type: "number",
      minWidth: 110,
      flex: 0.5,
    },
    {
      field: "total",
      headerName: "Total (Rs.)",
      type: "number",
      minWidth: 140,
      flex: 0.6,
      valueFormatter: (params) => `Rs. ${params.value}`,
    },
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 130,
      flex: 0.6,
    },
  ]

  const gridSx = {
    border: 0,
    color: "#0f172a",
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#f8fafc",
      borderBottom: "1px solid rgba(148,163,184,0.25)",
      fontWeight: 700,
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid rgba(148,163,184,0.18)",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "rgba(148,163,184,0.08)",
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "1px solid rgba(148,163,184,0.25)",
    },
  }

  return (
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4 md:p-6 text-[#0f172a]">
          <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-5 md:px-8 md:py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#94a3b8]">Admin Overview</p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-[#0f172a]">Operations Dashboard</h2>
                <p className="mt-2 text-sm text-[#64748b]">Monitor revenue, sellers, and order flow in real time.</p>
              </div>

              <div className="flex gap-2">
                <Link
                  to="/admin-orders"
                  className="px-4 py-2 rounded-2xl border border-[#e2e8f0] bg-white hover:bg-[#f1f5f9] text-sm font-semibold transition"
                >
                  Review Orders
                </Link>
                <Link
                  to="/admin-sellers"
                  className="px-4 py-2 rounded-2xl bg-[#0f172a] text-white text-sm font-semibold transition"
                >
                  Seller Control
                </Link>
              </div>
            </div>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#0ea5e9]/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">Earnings</p>
                  <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-[#0f172a]">Rs. {adminBalance}</h3>
                  <p className="mt-2 text-xs text-[#64748b]">Commission stream (10%)</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] text-[#0ea5e9] flex items-center justify-center">
                  <AiOutlineMoneyCollect size={22} />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#64748b]">
                <span>Updated live</span>
                <span className="text-emerald-600">Healthy</span>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">Sellers</p>
                  <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-[#0f172a]">{sellers?.length || 0}</h3>
                  <p className="mt-2 text-xs text-[#64748b]">Registered storefronts</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] text-[#22c55e] flex items-center justify-center">
                  <MdBorderClear size={22} />
                </div>
              </div>
              <Link
                to="/admin-sellers"
                className="mt-4 inline-flex items-center justify-center w-full px-4 py-2 rounded-2xl border border-[#e2e8f0] hover:bg-[#f1f5f9] text-sm font-semibold transition"
              >
                View Sellers
              </Link>
            </div>

            <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">Orders</p>
                  <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-[#0f172a]">{adminOrders?.length || 0}</h3>
                  <p className="mt-2 text-xs text-[#64748b]">Total processed orders</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] text-[#f59e0b] flex items-center justify-center">
                  <FiPackage size={22} />
                </div>
              </div>
              <Link
                to="/admin-orders"
                className="mt-4 inline-flex items-center justify-center w-full px-4 py-2 rounded-2xl bg-[#0f172a] text-white hover:bg-[#111827] text-sm font-semibold transition"
              >
                View Orders
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-5 md:px-8 md:py-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-[#0f172a]">Latest Orders</h3>
                <p className="text-sm text-[#64748b] mt-1">Status and totals from the last 24 hours</p>
              </div>
              <Link to="/admin-orders" className="text-sm font-semibold text-[#0f172a] hover:underline">
                View all
              </Link>
            </div>

            <div className="px-3 md:px-5 pb-5">
              <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white">
                <DataGrid rows={rows} columns={columns} pageSize={6} disableSelectionOnClick autoHeight sx={gridSx} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminDashboardMain

