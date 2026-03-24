import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <AdminSideBar active={1} />
      <AdminDashboardMain />
    </div>
  );
};

export default AdminDashboardPage;

