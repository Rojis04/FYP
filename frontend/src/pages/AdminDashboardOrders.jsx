import React, { useEffect, useMemo, useState } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();
  const [statusMap, setStatusMap] = useState({});

  const { adminOrders } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

  const statusOptions = [
    "Processing",
    "Transferred to delivery partner",
    "Shipping",
    "Received",
    "On the way",
    "Delivered",
    "Processing refund",
    "Refund Success",
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 160, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 140,
      flex: 0.7,
      renderCell: (params) => {
        const v = params.value || "Processing";
        const cls =
          v === "Delivered"
            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
            : v === "Processing"
              ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30"
              : "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30";
        return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>{v}</span>;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items",
      type: "number",
      minWidth: 120,
      flex: 0.6,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 140,
      flex: 0.6,
      valueFormatter: (params) => `Rs. ${params.value}`,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      minWidth: 140,
      flex: 0.6,
    },
    {
      field: "actions",
      headerName: "Update",
      minWidth: 220,
      flex: 0.9,
      sortable: false,
      renderCell: (params) => {
        const current = statusMap[params.row.id] || params.row.status;
        return (
          <div className="flex items-center gap-2">
            <select
              value={current}
              onChange={(e) => setStatusMap((prev) => ({ ...prev, [params.row.id]: e.target.value }))}
              className="h-9 rounded-lg border border-[#e2e8f0] bg-white px-2 text-sm"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="h-9 px-3 rounded-lg bg-[#0f172a] text-white text-xs font-semibold"
              onClick={async () => {
                try {
                  await axios.put(
                    `${server}/order/admin-update-order-status/${params.row.id}`,
                    { status: current },
                    { withCredentials: true }
                  );
                  toast.success("Order status updated.");
                  dispatch(getAllOrdersOfAdmin());
                } catch (error) {
                  toast.error(error.response?.data?.message || "Failed to update order.");
                }
              }}
            >
              Save
            </button>
          </div>
        );
      },
    },
  ];

  const rows = useMemo(() => {
    return (
      adminOrders?.map((item) => ({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, entry) => acc + entry.qty, 0),
        total: item?.totalPrice || 0,
        status: item?.status || "Processing",
        createdAt: item?.createdAt ? item.createdAt.slice(0, 10) : "-",
      })) || []
    );
  }, [adminOrders]);

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
  };
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <AdminSideBar active={2} />

      <div className="w-full pt-6 px-4 md:px-6">
        <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-sm">
          <div className="px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#94a3b8]">Orders Stream</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-[#0f172a]">All Orders</h2>
              <p className="mt-2 text-sm text-[#64748b]">Track fulfillment and payment status.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748b]">
              <span className="px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0]">
                Total: {rows.length}
              </span>
            </div>
          </div>
          <div className="px-3 md:px-5 pb-5">
            <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white">
              <DataGrid rows={rows} columns={columns} pageSize={6} disableSelectionOnClick autoHeight sx={gridSx} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;

