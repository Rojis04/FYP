"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event"
import { toast } from "react-toastify"
import { DataGrid } from "@material-ui/data-grid"
import { FiCalendar, FiEye, FiTrash2, FiSearch, FiPlus, FiClock } from "react-icons/fi"
import Loader from "../Layout/Loader"

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events)
  const { seller } = useSelector((state) => state.seller)
  const dispatch = useDispatch()

  const [localEvents, setLocalEvents] = useState([])
  const [q, setQ] = useState("")
  const [dateFilter, setDateFilter] = useState("all") // all | active | upcoming | ended
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null })

  useEffect(() => {
    if (seller?._id) dispatch(getAllEventsShop(seller._id))
  }, [dispatch, seller?._id])

  useEffect(() => {
    setLocalEvents(events || [])
  }, [events])

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEvent(id, seller._id))
      toast.success("Event deleted successfully!")
      setLocalEvents((prev) => prev.filter((item) => item._id !== id))
      setDeleteConfirm({ show: false, id: null })
    } catch (error) {
      toast.error("Failed to delete event!")
      console.error(error)
      setDeleteConfirm({ show: false, id: null })
    }
  }

  // helper (NOT a hook dependency issue because it's not inside useMemo closure as dependency)
  const computeStatus = (event) => {
    const now = new Date()
    const s = event?.start_Date ? new Date(event.start_Date) : null
    const f = event?.Finish_Date ? new Date(event.Finish_Date) : null

    if (!s || !f) return "Unknown"
    if (now < s) return "Upcoming"
    if (now > f) return "Ended"
    return "Active"
  }

  const filteredEvents = useMemo(() => {
    const text = q.trim().toLowerCase()

    return (localEvents || [])
      .filter((e) => {
        if (!text) return true
        return (e?.name || "").toLowerCase().includes(text) || (e?._id || "").toLowerCase().includes(text)
      })
      .filter((e) => {
        if (dateFilter === "all") return true
        return computeStatus(e).toLowerCase() === dateFilter
      })
  }, [localEvents, q, dateFilter]) // no getStatus warning

  const rows = useMemo(() => {
    return filteredEvents.map((item) => ({
      id: item._id,
      name: item.name,
      price: item.discountPrice ?? 0,
      stock: item.stock ?? 0,
      sold: item.sold_out ?? 0,
      startDate: item.start_Date ? new Date(item.start_Date).toLocaleDateString() : "-",
      endDate: item.Finish_Date ? new Date(item.Finish_Date).toLocaleDateString() : "-",
      status: computeStatus(item),
    }))
  }, [filteredEvents]) // no getStatus warning

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 190, flex: 1 },

    {
      field: "name",
      headerName: "Event",
      minWidth: 240,
      flex: 1.4,
      renderCell: (params) => (
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-2xl bg-[#f8fafc] flex items-center justify-center text-[#0f172a]">
            <FiCalendar size={18} />
          </span>
          <div className="leading-tight">
            <div className="font-semibold text-[#0f172a]">{params.value}</div>
            <div className="text-xs text-[#64748b]">Promotion event</div>
          </div>
        </div>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 140,
      flex: 0.7,
      renderCell: (params) => {
        const v = params.value
        const cls =
          v === "Active"
            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
            : v === "Upcoming"
              ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30"
                : v === "Ended"
                ? "bg-[#f8fafc] text-[#64748b] ring-1 ring-[#e2e8f0]"
                : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"

        return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>{v}</span>
      },
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
      field: "stock",
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

    { field: "sold", headerName: "Sold", minWidth: 110, flex: 0.6, type: "number" },

    {
      field: "startDate",
      headerName: "Start",
      minWidth: 140,
      flex: 0.7,
      renderCell: (params) => (
        <div className="flex items-center gap-2 text-[#64748b]">
          <FiClock className="text-[#94a3b8]" />
          <span className="font-medium">{params.value}</span>
        </div>
      ),
    },

    {
      field: "endDate",
      headerName: "End",
      minWidth: 140,
      flex: 0.7,
      renderCell: (params) => (
        <div className="flex items-center gap-2 text-[#64748b]">
          <FiClock className="text-[#94a3b8]" />
          <span className="font-medium">{params.value}</span>
        </div>
      ),
    },

    {
      field: "preview",
      headerName: "",
      minWidth: 90,
      flex: 0.45,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/event/${params.id}`}>
          <button className="h-10 w-10 rounded-xl hover:bg-[#f1f5f9] flex items-center justify-center transition">
            <FiEye size={18} className="text-[#0f172a]" />
          </button>
        </Link>
      ),
    },

    {
      field: "delete",
      headerName: "",
      minWidth: 90,
      flex: 0.45,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={() => setDeleteConfirm({ show: true, id: params.id })}
          className="h-10 w-10 rounded-xl hover:bg-rose-50 flex items-center justify-center transition"
        >
          <FiTrash2 size={18} className="text-rose-600" />
        </button>
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
    "& .MuiDataGrid-footerContainer": { borderTop: "1px solid rgba(148,163,184,0.25)" },
    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": { outline: "none" },
  }

  const total = localEvents?.length || 0
  const active = (localEvents || []).filter((e) => computeStatus(e) === "Active").length
  const upcoming = (localEvents || []).filter((e) => computeStatus(e) === "Upcoming").length
  const ended = (localEvents || []).filter((e) => computeStatus(e) === "Ended").length

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4 md:p-6 text-[#0f172a]">
          {/* Header */}
          <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm mb-6">
            <div className="px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#94a3b8]">Campaign Control</p>
                <h2 className="mt-2 text-[22px] md:text-[26px] font-semibold text-[#0f172a]">All Events</h2>
                <p className="text-sm text-[#64748b] mt-1">Manage promotions and special offers.</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a]">
                    Total: {total}
                  </span>

                  <button
                    onClick={() => setDateFilter("active")}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 transition ${
                      dateFilter === "active"
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                        : "bg-white text-[#64748b] ring-[#e2e8f0] hover:bg-[#f1f5f9]"
                    }`}
                  >
                    Active: {active}
                  </button>

                  <button
                    onClick={() => setDateFilter("upcoming")}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 transition ${
                      dateFilter === "upcoming"
                        ? "bg-blue-50 text-blue-700 ring-blue-200"
                        : "bg-white text-[#64748b] ring-[#e2e8f0] hover:bg-[#f1f5f9]"
                    }`}
                  >
                    Upcoming: {upcoming}
                  </button>

                  <button
                    onClick={() => setDateFilter("ended")}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 transition ${
                      dateFilter === "ended"
                        ? "bg-[#f8fafc] text-[#64748b] ring-[#e2e8f0]"
                        : "bg-white text-[#64748b] ring-[#e2e8f0] hover:bg-[#f1f5f9]"
                    }`}
                  >
                    Ended: {ended}
                  </button>

                  <button
                    onClick={() => setDateFilter("all")}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 transition ${
                      dateFilter === "all"
                        ? "bg-[#0f172a] text-white ring-[#0f172a]"
                        : "bg-white text-[#64748b] ring-[#e2e8f0] hover:bg-[#f1f5f9]"
                    }`}
                  >
                    All
                  </button>
                </div>
              </div>

              <Link
                to="/dashboard-create-event"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0f172a] text-white text-sm font-semibold transition"
              >
                <FiPlus size={16} />
                Create Event
              </Link>
            </div>

            {/* Search */}
            <div className="px-6 pb-6 md:px-8">
              <div className="flex items-center gap-2 rounded-2xl border border-[#e2e8f0] bg-white px-4 h-12">
                <FiSearch className="text-[#94a3b8]" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search events by name or ID"
                  className="w-full outline-none bg-transparent text-sm text-[#0f172a] placeholder:text-[#94a3b8]"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-5 md:px-8 md:py-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#0f172a]">Event List</h3>
                <p className="text-sm text-[#64748b] mt-1">
                  Showing {rows.length} of {total}
                </p>
              </div>
            </div>

            <div className="px-3 md:px-5 pb-5">
              {rows.length === 0 ? (
                <div className="py-14 text-center">
                  <div className="mx-auto h-14 w-14 rounded-2xl bg-[#f8fafc] flex items-center justify-center text-[#0f172a]">
                    <FiCalendar size={26} />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-[#0f172a]">No events found</h4>
                  <p className="mt-2 text-sm text-[#64748b]">
                    {q ? `No events matching "${q}".` : "Create your first event to attract customers with offers."}
                  </p>
                  <Link
                    to="/dashboard-create-event"
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-[#0f172a] text-white hover:bg-[#111827] text-sm font-semibold transition"
                  >
                    <FiPlus size={16} />
                    Create Event
                  </Link>
                </div>
              ) : (
                <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white">
                  <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight sx={gridSx} />
                </div>
              )}
            </div>
          </div>

          {/* Delete Modal */}
          {deleteConfirm.show && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="w-full max-w-md rounded-3xl bg-white border border-[#e2e8f0] shadow-2xl p-6">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-rose-50 flex items-center justify-center">
                  <FiTrash2 size={24} className="text-rose-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#0f172a] text-center">Delete event?</h3>
                <p className="mt-2 text-sm text-[#64748b] text-center">
                  This action cannot be undone. The event will be removed permanently.
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm({ show: false, id: null })}
                    className="flex-1 h-11 rounded-xl border border-[#e2e8f0] bg-white hover:bg-[#f1f5f9] text-sm font-semibold transition text-[#0f172a]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm.id)}
                    className="flex-1 h-11 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default AllEvents

