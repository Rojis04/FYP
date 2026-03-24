"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid } from "@material-ui/data-grid"
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"
import { RxCross1 } from "react-icons/rx"
import axios from "axios"
import { server } from "../../server"
import { toast } from "react-toastify"
import { getAllSellers } from "../../redux/actions/sellers"
import { Link } from "react-router-dom"
import { BiErrorCircle } from "react-icons/bi"

const AllSellers = () => {
  const dispatch = useDispatch()
  const { sellers } = useSelector((state) => state.seller)
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    dispatch(getAllSellers())
  }, [dispatch])

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true })
      toast.success(res?.data?.message || "Seller deleted!")
      dispatch(getAllSellers())
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete seller!")
      console.error(err)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 130, flex: 0.7 },
    { field: "email", headerName: "Email", type: "text", minWidth: 160, flex: 0.9 },
    { field: "address", headerName: "Seller Address", type: "text", minWidth: 180, flex: 0.9 },
    { field: "joinedAt", headerName: "Joined At", type: "text", minWidth: 130, flex: 0.8 },

    {
      field: "preview",
      flex: 0.4,
      minWidth: 120,
      headerName: "Preview",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/shop/preview/${params.id}`}>
            <button
              className="h-10 w-10 rounded-xl hover:bg-[#f1f5f9] flex items-center justify-center transition"
              title="View shop details"
              type="button"
            >
              <AiOutlineEye size={20} className="text-[#0f172a]" />
            </button>
        </Link>
      ),
    },

    {
      field: "delete",
      flex: 0.4,
      minWidth: 120,
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={() => {
            setUserId(params.id)
            setOpen(true)
          }}
          className="h-10 w-10 rounded-xl hover:bg-rose-50 flex items-center justify-center transition"
          title="Delete seller"
          type="button"
        >
          <AiOutlineDelete size={20} className="text-rose-600" />
        </button>
      ),
    },
  ]

  const rows = useMemo(() => {
    return (
      sellers?.map((item) => ({
        id: item._id,
        name: item?.name,
        email: item?.email,
        joinedAt: formatDate(item.createdAt),
        address: item.address,
      })) || []
    )
  }, [sellers])

  const gridSx = {
    border: 0,
    color: "#0f172a",
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: "1px solid rgba(148,163,184,0.25)",
      backgroundColor: "#f8fafc",
      fontWeight: 800,
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
    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
      outline: "none",
    },
  }

  return (
    <div className="w-full p-4 md:p-6 text-[#0f172a]">
      <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm mb-6">
        <div className="px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#94a3b8]">Seller Network</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-[#0f172a]">All Sellers</h2>
            <p className="mt-2 text-sm text-[#64748b]">Review storefronts and performance signals.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#64748b]">
            <span className="px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b]">
              Total: {rows.length}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 md:px-8 md:py-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#0f172a]">Seller Directory</h3>
            <p className="text-sm text-[#64748b] mt-1">Manage seller status and visibility.</p>
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
              rowsPerPageOptions={[10, 20, 50]}
              sx={gridSx}
            />
          </div>
        </div>
      </div>

      {open && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-black/50 flex items-center justify-center h-screen transition-all duration-300 p-4">
          <div className="w-full max-w-lg min-h-[20vh] bg-white rounded-3xl shadow-2xl p-6 border border-[#e2e8f0]">
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-10 w-10 rounded-xl hover:bg-[#f1f5f9] flex items-center justify-center transition"
                title="Close"
              >
                <RxCross1 size={18} className="text-[#0f172a]" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <div className="h-14 w-14 rounded-2xl bg-rose-50 flex items-center justify-center">
                <BiErrorCircle size={26} className="text-rose-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#0f172a]">Delete seller?</h3>
              <p className="mt-2 text-sm text-[#64748b]">This action cannot be undone.</p>
            </div>

            <div className="w-full flex items-center justify-center gap-3 mt-6">
              <button
                className="flex-1 h-11 rounded-xl border border-[#e2e8f0] bg-white hover:bg-[#f1f5f9] text-sm font-semibold transition text-[#0f172a]"
                onClick={() => setOpen(false)}
                type="button"
              >
                Cancel
              </button>

              <button
                className="flex-1 h-11 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold transition"
                onClick={() => {
                  setOpen(false)
                  handleDelete(userId)
                }}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllSellers

