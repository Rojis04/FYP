import React from "react"
import AdminHeader from "../components/Layout/AdminHeader"
import AdminSideBar from "../components/Admin/Layout/AdminSideBar"
import AdminSettings from "../components/Admin/AdminSettings"

const AdminSettingsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <AdminSideBar active={8} />
      <AdminSettings />
    </div>
  )
}

export default AdminSettingsPage
