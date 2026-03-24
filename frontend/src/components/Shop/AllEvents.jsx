import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event"
import { toast } from "react-toastify"
import { DataGrid } from "@material-ui/data-grid"
import {
  FiCalendar,
  FiEye,
  FiTrash2,
  FiSearch,
  FiPlus,
  FiClock,

} from "react-icons/fi"
import Loader from "../Layout/Loader"

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events)
  const { seller } = useSelector((state) => state.seller)
  const dispatch = useDispatch()

  const [localEvents, setLocalEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null })

  useEffect(() => {
    if (seller?._id) dispatch(getAllEventsShop(seller._id))
  }, [dispatch, seller?._id])

  useEffect(() => {
    setLocalEvents(events)
  }, [events])

  // DO NOT CHANGE
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEvent(id, seller._id))
      toast.success("Event deleted successfully!")
      setLocalEvents((prev) => prev.filter((item) => item._id !== id))
      setDeleteConfirm({ show: false, id: null })
    } catch (error) {
      toast.error("Failed to delete event!")
      setDeleteConfirm({ show: false, id: null })
    }
  }

  const filteredEvents = localEvents?.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  /* ==================== TABLE COLUMNS ==================== */
  const columns = [
    {
      field: "id",
      headerName: "Event ID",
      minWidth: 200,
      flex: 0.9,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <span className="gc_dot" />
          <span className="font-semibold text-[#0f172a]">{params.value}</span>
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Event Name",
      minWidth: 220,
      flex: 1.3,
      renderCell: (params) => (
        <div>
          <p className="font-semibold text-[#0f172a]">{params.value}</p>
          <span className="text-xs text-[#64748b]">Event listing</span>
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 120,
      flex: 0.6,
      renderCell: (params) => <span className="gc_price">{params.value}</span>,
    },
    {
      field: "Stock",
      headerName: "Stock",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => {
        const low = params.value < 10
        return <span className={`gc_pill ${low ? "gc_low" : "gc_ok"}`}>{params.value}</span>
      },
    },
    {
      field: "sold",
      headerName: "Sold",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => (
        <span className="font-semibold text-[#64748b]">{params.value}</span>
      ),
    },
    {
      field: "startDate",
      headerName: "Start",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => (
        <div className="flex items-center gap-2 text-[#64748b]">
          <FiClock />
          {params.value}
        </div>
      ),
    },
    {
      field: "endDate",
      headerName: "End",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => (
        <div className="flex items-center gap-2 text-[#64748b]">
          <FiClock />
          {params.value}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "",
      minWidth: 120,
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Link to={`/product/${params.id}`}>
            <button className="gc_iconBtn">
              <FiEye />
            </button>
          </Link>
          <button
            onClick={() => setDeleteConfirm({ show: true, id: params.id })}
            className="gc_iconBtnDanger"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ]

  /* ==================== ROWS ==================== */
  const rows = []
  filteredEvents?.forEach((item) => {
    rows.push({
      id: item._id,
      name: item.name,
      price: "Rs." + item.discountPrice,
      Stock: item.stock,
      sold: item.sold_out,
      startDate: new Date(item.start_Date).toLocaleDateString(),
      endDate: new Date(item.Finish_Date).toLocaleDateString(),
    })
  })

  /* ==================== UI ==================== */
  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full px-4 md:px-8 pt-6 mt-6 bg-white text-[#0f172a]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="gc_dot" />
            <span className="text-xs font-bold text-[#94a3b8] uppercase">Events</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0f172a] flex items-center gap-2">
                <FiCalendar /> All Events
              </h2>
              <p className="text-sm text-[#64748b] mt-1">Manage your storefront promotions and offers</p>
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events..."
                  className="pl-10 pr-4 py-2 rounded-xl border border-[#e2e8f0] bg-white text-[#0f172a] focus:ring-2 focus:ring-[#38bdf8]/20 outline-none"
                />
              </div>

              <Link to="/dashboard-create-event">
                <button className="gc_primaryBtn">
                  <FiPlus /> Create Event
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Table */}
            <div className="gc_card overflow-hidden">
              <div className="gc_cardTopLine" />
              {rows.length === 0 ? (
                <div className="py-20 text-center">
                  <FiCalendar size={36} className="mx-auto text-[#0ea5e9] mb-4" />
                  <h3 className="text-xl font-bold text-[#0f172a]">No Events Found</h3>
                  <p className="text-[#64748b] mt-2">
                    {searchTerm ? "No matching events." : "Create your first event."}
                  </p>
            </div>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              autoHeight
              disableSelectionOnClick
              className="gc_grid"
            />
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteConfirm.show && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-[#e2e8f0]">
            <FiTrash2 size={28} className="text-rose-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center text-[#0f172a]">Delete Event?</h3>
            <p className="text-center text-[#64748b] mt-2 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm({ show: false, id: null })}
                className="flex-1 border border-[#e2e8f0] rounded-xl py-2 font-semibold text-[#0f172a] hover:bg-[#f8fafc]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl py-2 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Elaris Styles */}
      <style jsx global>{`
        .gc_dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: linear-gradient(90deg, #22c55e, #38bdf8);
        }
        .gc_card {
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
        }
        .gc_cardTopLine {
          height: 4px;
          background: linear-gradient(90deg, #22c55e, #38bdf8, #0ea5e9);
        }
        .gc_price {
          font-weight: 900;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.18);
          color: #0f172a;
        }
        .gc_pill {
          padding: 6px 10px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 12px;
        }
        .gc_ok {
          background: rgba(34, 197, 94, 0.16);
          color: #15803d;
        }
        .gc_low {
          background: rgba(245, 158, 11, 0.18);
          color: #b45309;
        }
        .gc_iconBtn {
          padding: 8px;
          border-radius: 999px;
          background: #f8fafc;
          color: #0f172a;
          border: 1px solid #e2e8f0;
        }
        .gc_iconBtnDanger {
          padding: 8px;
          border-radius: 999px;
          background: rgba(244, 63, 94, 0.12);
          color: #be123c;
        }
        .gc_primaryBtn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 14px;
          font-weight: 900;
          color: #0f172a;
          background: linear-gradient(90deg, #22c55e, #38bdf8);
        }
      `}</style>
    </div>
  )
}

export default AllEvents

