import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AllWithdraw from "../components/Admin/AllWithdraw";

const AdminDashboardWithdraw = () => {
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <AdminSideBar active={7} />
      <AllWithdraw />
    </div>
  )
}

export default AdminDashboardWithdraw
