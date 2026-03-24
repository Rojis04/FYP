import React, { useEffect, useMemo } from "react"
import { Button } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Loader from "../Layout/Loader"
import { getAllOrdersOfShop } from "../../redux/actions/order"
import { AiOutlineArrowRight } from "react-icons/ai"

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order)
  const { seller } = useSelector((state) => state.seller)

  const dispatch = useDispatch()

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllOrdersOfShop(seller._id))
    }
  }, [dispatch, seller])

  // same functionality, better UI
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Order ID",
        minWidth: 210,
        flex: 0.9,
        renderCell: (params) => (
          <div className="flex items-center gap-2">
            <span className="gc_orderDot" />
            <span className="font-semibold text-[#0f172a]">{params.value}</span>
          </div>
        ),
      },
      {
        field: "products",
        headerName: "Products",
        minWidth: 260,
        flex: 1.3,
        renderCell: (params) => (
          <div className="flex flex-col">
            <span className="font-semibold text-[#0f172a] truncate">{params.value.mainProduct}</span>
            {params.value.otherCount > 0 && (
              <span className="text-xs text-[#64748b]">+{params.value.otherCount} more items</span>
            )}
          </div>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.6,
        sortable: true,
        renderCell: (params) => {
          const s = params.value || "Unknown"
          const delivered = s === "Delivered"
          return (
            <span className={`gc_statusPill ${delivered ? "gc_statusDelivered" : "gc_statusOther"}`}>{s}</span>
          )
        },
      },
      {
        field: "itemsQty",
        headerName: "Items",
        type: "number",
        minWidth: 110,
        flex: 0.4,
        align: "left",
        headerAlign: "left",
        renderCell: (params) => <span className="font-semibold text-[#0f172a]">{params.value}</span>,
      },
      {
        field: "total",
        headerName: "Total",
        minWidth: 140,
        flex: 0.5,
        renderCell: (params) => <span className="font-extrabold text-[#0f172a]">{params.value}</span>,
      },
      {
        field: "action",
        headerName: "",
        minWidth: 90,
        flex: 0.35,
        sortable: false,
        renderCell: (params) => (
          <Link to={`/order/${params.row.id}`}>
            <Button className="gc_viewBtn" aria-label="View order">
              <AiOutlineArrowRight size={18} />
            </Button>
          </Link>
        ),
      },
    ],
    []
  )

  const rows = useMemo(() => {
    const r = []
    orders &&
      orders.forEach((item) => {
        const productInfo = {
          mainProduct: item.cart?.[0]?.name || "Unknown Product",
          otherCount: item.cart?.length > 1 ? item.cart.length - 1 : 0,
        }

        r.push({
          id: item._id,
          products: productInfo,
          itemsQty: item.cart?.length || 0,
          total: "Rs." + item.totalPrice,
          status: item.status,
        })
      })
    return r
  }, [orders])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-4 md:px-8 pt-6 mt-6 bg-white text-[#0f172a]">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-2">
            <div className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#22c55e] to-[#38bdf8]" />
              <p className="text-xs font-semibold tracking-[0.3em] text-[#94a3b8] uppercase">Orders</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f172a]">All Orders</h2>
            <p className="text-sm text-[#64748b]">View and manage every order from your store.</p>
          </div>

          {/* Table Container */}
          <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden">
            <div className="h-[4px] w-full bg-gradient-to-r from-[#22c55e] via-[#38bdf8] to-[#0ea5e9]" />
            <div className="p-2 md:p-4">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
                className="gc_grid"
              />
            </div>
          </div>

          {/* DataGrid styles (Elaris theme, clean, not cartoon) */}
        <style jsx global>{`
            .gc_orderDot {
              width: 10px;
              height: 10px;
              border-radius: 999px;
              background: linear-gradient(90deg, #22c55e, #38bdf8);
              box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
              display: inline-block;
            }

            .gc_statusPill {
              font-size: 12px;
              font-weight: 700;
              padding: 6px 10px;
              border-radius: 999px;
              line-height: 1;
              display: inline-flex;
              align-items: center;
              border: 1px solid rgba(148, 163, 184, 0.25);
              background: #f8fafc;
              color: #0f172a;
              white-space: nowrap;
            }
            .gc_statusDelivered {
              border-color: rgba(34, 197, 94, 0.35);
              background: rgba(34, 197, 94, 0.12);
              color: #15803d;
            }
            .gc_statusOther {
              border-color: rgba(245, 158, 11, 0.4);
              background: rgba(245, 158, 11, 0.12);
              color: #b45309;
            }

            .gc_viewBtn {
              min-width: auto !important;
              padding: 7px 10px !important;
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
              font-weight: 800 !important;
              border-bottom: 1px solid rgba(148, 163, 184, 0.25) !important;
            }
            .MuiDataGrid-columnHeaderTitle {
              font-weight: 800 !important;
            }
            .MuiDataGrid-cell {
              border-bottom: 1px solid rgba(148, 163, 184, 0.18) !important;
              color: #0f172a !important;
            }
            .MuiDataGrid-cell:focus,
            .MuiDataGrid-cell:focus-within {
              outline: none !important;
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
      )}
    </>
  )
}

export default AllOrders

