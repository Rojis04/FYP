"use client"

// ShopProfileData.jsx
import React, { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { server } from "../../server"
import { DataGrid } from "@material-ui/data-grid"
import { BsPencil } from "react-icons/bs"
import { RxCross1 } from "react-icons/rx"
import { FiAlertTriangle, FiSearch, FiCreditCard } from "react-icons/fi"
import { toast } from "react-toastify"

const AllWithdraw = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [withdrawData, setWithdrawData] = useState(null)
  const [withdrawStatus, setWithdrawStatus] = useState("Processing")
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState("")

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${server}/withdraw/get-all-withdraw-request`, { withCredentials: true })
      .then((res) => {
        setData(res.data.withdraws || [])
        setLoading(false)
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to load withdraw requests")
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const summary = useMemo(() => {
    const total = data?.length || 0
    const processing = (data || []).filter((x) => x?.status === "Processing").length
    const succeed = (data || []).filter((x) => x?.status === "Succeed").length
    return { total, processing, succeed }
  }, [data])

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase()
    if (!text) return data || []

    return (data || []).filter((item) => {
      const id = (item?._id || "").toLowerCase()
      const status = (item?.status || "").toLowerCase()
      const sellerName = (item?.seller?.name || "").toLowerCase()
      const sellerId = (item?.seller?._id || "").toLowerCase()
      const amount = String(item?.amount ?? "").toLowerCase()
      return (
        id.includes(text) ||
        status.includes(text) ||
        sellerName.includes(text) ||
        sellerId.includes(text) ||
        amount.includes(text)
      )
    })
  }, [data, q])

  const rows = useMemo(() => {
    return (filtered || []).map((item) => ({
      id: item._id,
      shopId: item?.seller?._id,
      name: item?.seller?.name,
      amount: item?.amount, // keep numeric for formatting
      status: item?.status,
      createdAt: item?.createdAt,
    }))
  }, [filtered])

  const columns = [
    { field: "id", headerName: "Withdraw ID", minWidth: 200, flex: 1 },

    { field: "name", headerName: "Shop Name", minWidth: 200, flex: 1 },

    { field: "shopId", headerName: "Shop ID", minWidth: 200, flex: 1 },

    {
      field: "amount",
      headerName: "Amount",
      minWidth: 140,
      flex: 0.7,
      renderCell: (params) => <span className="font-semibold text-[#0f172a]">Rs. {params.value}</span>,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 140,
      flex: 0.7,
      renderCell: (params) => {
        const v = params.value
        const cls =
          v === "Succeed"
            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
            : "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30"
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center ${cls}`}>
            {v}
          </span>
        )
      },
    },

    {
      field: "createdAt",
      headerName: "Request Date",
      minWidth: 170,
      flex: 0.8,
      renderCell: (params) => <span className="font-medium text-[#64748b]">{formatDate(params.value)}</span>,
    },

    {
      field: "update",
      headerName: "",
      minWidth: 120,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => {
        const disabled = params.row.status !== "Processing"
        return (
          <button
            type="button"
            title={disabled ? "Only Processing can be updated" : "Update Status"}
            disabled={disabled}
            className={`h-10 w-10 rounded-xl flex items-center justify-center transition ${
              disabled ? "text-[#cbd5f5] cursor-not-allowed" : "hover:bg-[#f1f5f9] text-[#0f172a]"
            }`}
            onClick={() => {
              if (disabled) return
              setWithdrawData(params.row)
              setWithdrawStatus(params.row.status || "Processing")
              setOpen(true)
            }}
          >
            <BsPencil size={18} />
          </button>
        )
      },
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
    "& .MuiDataGrid-footerContainer": { borderTop: "1px solid rgba(148,163,184,0.25)" },
    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": { outline: "none" },
  }

  const handleSubmit = async () => {
    if (!withdrawData?.id) return

    try {
      const res = await axios.put(
        `${server}/withdraw/update-withdraw-request/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
          status: withdrawStatus, // IMPORTANT: send selected status
        },
        { withCredentials: true }
      )

      toast.success("Withdraw request updated successfully!")
      setData(res.data.withdraws || [])
      setOpen(false)
      setWithdrawData(null)
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
      console.error(error)
    }
  }

  return (
    <div className="w-full p-4 md:p-6 text-[#0f172a]">
      <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm mb-6">
        <div className="px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#94a3b8]">Payout Review</p>
            <h2 className="mt-2 text-[22px] md:text-[26px] font-semibold text-[#0f172a]">Withdraw Requests</h2>
            <p className="text-sm text-[#64748b] mt-1">Review and approve seller withdrawals.</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a]">
                Total: {summary.total}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30">
                Processing: {summary.processing}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30">
                Succeed: {summary.succeed}
              </span>
            </div>
          </div>

          <div className="w-full md:w-[420px]">
            <div className="flex items-center gap-2 rounded-2xl border border-[#e2e8f0] bg-white px-4 h-12">
              <FiSearch className="text-[#94a3b8]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by shop, id, status, amount"
                className="w-full outline-none bg-transparent text-sm text-[#0f172a] placeholder:text-[#94a3b8]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 md:px-8 md:py-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#0f172a]">Request List</h3>
            <p className="text-sm text-[#64748b] mt-1">Showing {rows.length} request(s)</p>
          </div>
        </div>

        <div className="px-3 md:px-5 pb-5">
          {rows.length === 0 && !loading ? (
            <div className="py-14 text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-[#f8fafc] flex items-center justify-center text-[#0f172a]">
                <FiCreditCard size={24} />
              </div>
              <h4 className="mt-4 text-lg font-semibold text-[#0f172a]">No withdraw requests</h4>
              <p className="mt-2 text-sm text-[#64748b]">
                {q ? `No requests matching "${q}".` : "No withdrawal requests have been made yet."}
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                autoHeight
                loading={loading}
                sx={gridSx}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-[#e2e8f0] shadow-2xl p-6">
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setWithdrawData(null)
                }}
                className="h-10 w-10 rounded-xl hover:bg-[#f1f5f9] flex items-center justify-center transition"
                title="Close"
              >
                <RxCross1 size={18} className="text-[#0f172a]" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center">
                <FiAlertTriangle size={24} className="text-amber-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#0f172a]">Update withdrawal</h3>
              <p className="mt-2 text-sm text-[#64748b]">Confirm the status update for this request.</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-[#e2e8f0] p-4 bg-[#f8fafc]">
                <div className="text-xs font-semibold text-[#64748b]">Withdrawal Amount</div>
                <div className="text-lg font-bold text-[#0f172a] mt-1">Rs. {withdrawData?.amount}</div>
                <div className="text-xs text-[#64748b] mt-1">Withdraw ID: {withdrawData?.id}</div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#64748b] mb-2">Status</label>
                <select
                  value={withdrawStatus}
                  onChange={(e) => setWithdrawStatus(e.target.value)}
                  className="w-full h-11 px-3 border border-[#e2e8f0] rounded-xl bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/30"
                >
                  <option value="Processing">Processing</option>
                  <option value="Succeed">Succeed</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setWithdrawData(null)
                }}
                className="flex-1 h-11 rounded-xl border border-[#e2e8f0] bg-white hover:bg-[#f1f5f9] text-sm font-semibold transition text-[#0f172a]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 h-11 rounded-xl bg-[#0f172a] text-white hover:bg-[#111827] text-sm font-semibold transition"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllWithdraw

