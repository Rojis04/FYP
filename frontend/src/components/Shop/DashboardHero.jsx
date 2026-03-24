import React, { useEffect, useMemo } from "react"
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai"
import { Link } from "react-router-dom"
import { MdBorderClear } from "react-icons/md"
import { FiPackage } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersOfShop } from "../../redux/actions/order"
import { getAllProductsShop } from "../../redux/actions/product"
import { Button } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"

const DashboardHero = () => {
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.order)
  const { seller } = useSelector((state) => state.seller)
  const { products } = useSelector((state) => state.products)

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllOrdersOfShop(seller._id))
      dispatch(getAllProductsShop(seller._id))
    }
  }, [dispatch, seller])

  const availableBalance = seller?.availableBalance ? seller.availableBalance.toFixed(2) : "0.00"

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Order ID", minWidth: 170, flex: 0.9 },
      {
        field: "status",
        headerName: "Status",
        minWidth: 140,
        flex: 0.6,
        cellClassName: (params) => {
          return params.getValue(params.id, "status") === "Delivered" ? "gc_statusDelivered" : "gc_statusOther"
        },
      },
      {
        field: "itemsQty",
        headerName: "Items",
        type: "number",
        minWidth: 110,
        flex: 0.4,
      },
      {
        field: "total",
        headerName: "Total",
        minWidth: 140,
        flex: 0.5,
      },
      {
        field: " ",
        flex: 0.4,
        minWidth: 90,
        headerName: "",
        sortable: false,
        renderCell: (params) => {
          return (
            <Link to={`/dashboard/order/${params.id}`}>
              <Button className="gc_viewBtn" aria-label="View order">
                <AiOutlineArrowRight size={18} />
              </Button>
            </Link>
          )
        },
      },
    ],
    []
  )

  const row = useMemo(() => {
    const r = []
    orders &&
      orders.forEach((item) => {
        r.push({
          id: item._id,
          itemsQty: item.cart.reduce((acc, it) => acc + it.qty, 0),
          total: "Rs." + item.totalPrice,
          status: item.status,
        })
      })
    return r
  }, [orders])

  return (
    <div className="w-full p-4 md:p-8 bg-white text-[#0f172a]">
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#22c55e] to-[#38bdf8]" />
          <p className="text-xs font-semibold tracking-[0.3em] text-[#94a3b8] uppercase">Seller Studio</p>
        </div>
        <h3 className="text-[22px] md:text-[26px] font-extrabold text-[#0f172a]">Overview</h3>
        <p className="text-sm text-[#64748b] max-w-2xl">
          Track revenue, orders, and products at a glance and jump into the latest orders instantly.
        </p>
      </div>

      {/* Stats cards (new layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Balance */}
        <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-[#22c55e] to-[#38bdf8] flex items-center justify-center text-white shadow-sm">
                <AiOutlineMoneyCollect size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0f172a]">Balance</p>
                <p className="text-xs text-[#64748b]">Includes 10% service charge</p>
              </div>
            </div>

            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#f8fafc] text-[#475569] border border-[#e2e8f0]">
              Available
            </span>
          </div>

          <div className="mt-4">
            <p className="text-3xl font-extrabold text-[#0f172a]">Rs.{availableBalance}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link
              to="/dashboard-withdraw-money"
              className="text-sm font-semibold text-[#0f172a] underline decoration-[#cbd5f5] hover:decoration-[#94a3b8] underline-offset-4 transition"
            >
              Withdraw
            </Link>

            <div className="h-[3px] w-28 rounded-full bg-[#e2e8f0] overflow-hidden">
              <div className="h-full w-[58%] bg-gradient-to-r from-[#22c55e] to-[#38bdf8]" />
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#f8fafc] flex items-center justify-center text-[#0f172a] shadow-sm border border-[#e2e8f0]">
                <MdBorderClear size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0f172a]">Orders</p>
                <p className="text-xs text-[#64748b]">Total received</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#f8fafc] text-[#475569] border border-[#e2e8f0]">
              All time
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <p className="text-3xl font-extrabold text-[#0f172a]">{orders?.length || 0}</p>
            <Link
              to="/dashboard-orders"
              className="text-sm font-semibold text-[#0f172a] underline decoration-[#cbd5f5] hover:decoration-[#94a3b8] underline-offset-4 transition"
            >
              View
            </Link>
          </div>

          <div className="mt-4 h-[3px] w-full rounded-full bg-[#e2e8f0] overflow-hidden">
            <div className="h-full w-[72%] bg-[#38bdf8]" />
          </div>
        </div>

        {/* Products */}
        <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-[#a855f7] to-[#38bdf8] flex items-center justify-center text-white shadow-sm">
                <FiPackage size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0f172a]">Products</p>
                <p className="text-xs text-[#64748b]">In your catalog</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#f8fafc] text-[#475569] border border-[#e2e8f0]">
              Live
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <p className="text-3xl font-extrabold text-[#0f172a]">{products?.length || 0}</p>
            <Link
              to="/dashboard-products"
              className="text-sm font-semibold text-[#0f172a] underline decoration-[#cbd5f5] hover:decoration-[#94a3b8] underline-offset-4 transition"
            >
              Manage
            </Link>
          </div>

          <div className="mt-4 h-[3px] w-full rounded-full bg-[#e2e8f0] overflow-hidden">
            <div className="h-full w-[45%] bg-gradient-to-r from-[#a855f7] to-[#38bdf8]" />
          </div>
        </div>
      </div>

      {/* Latest Orders */}
      <div className="mt-10 mb-3 flex items-end justify-between">
        <div>
          <h3 className="text-[22px] md:text-[24px] font-extrabold text-[#0f172a]">Latest Orders</h3>
          <p className="text-sm text-[#64748b]">Quick view of your most recent transactions.</p>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs text-[#64748b] font-semibold">Updated live</span>
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#22c55e] to-[#38bdf8] animate-pulse" />
        </div>
      </div>

      <div className="w-full bg-white rounded-3xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight className="gc_grid" />
      </div>

      {/* Styles for DataGrid (updated, cleaner + Elaris accent) */}
      <style jsx global>{`
        .gc_statusDelivered {
          color: #16a34a !important;
          font-weight: 600 !important;
        }
        .gc_statusOther {
          color: #f59e0b !important;
          font-weight: 600 !important;
        }

        .gc_viewBtn {
          min-width: auto !important;
          padding: 6px 10px !important;
          border-radius: 999px !important;
          background: #f8fafc !important;
          color: #0f172a !important;
          border: 1px solid #e2e8f0 !important;
          transition: 160ms ease !important;
        }
        .gc_viewBtn:hover {
          background: #f1f5f9 !important;
        }

        .MuiDataGrid-root {
          border: none !important;
          font-family: inherit !important;
          color: #0f172a !important;
        }
        .MuiDataGrid-columnHeaders {
          background: #f8fafc !important;
          color: #0f172a !important;
          font-weight: 700 !important;
          border-bottom: 1px solid rgba(148, 163, 184, 0.25) !important;
        }
        .MuiDataGrid-columnHeaderTitle {
          font-weight: 700 !important;
        }
        .MuiDataGrid-cell {
          border-bottom: 1px solid rgba(148, 163, 184, 0.18) !important;
          color: #0f172a !important;
        }
        .MuiDataGrid-row:hover {
          background: rgba(148, 163, 184, 0.08) !important;
        }
        .MuiDataGrid-footerContainer {
          background: #ffffff !important;
          border-top: 1px solid rgba(148, 163, 184, 0.25) !important;
        }
      `}</style>
    </div>
  )
}

export default DashboardHero

