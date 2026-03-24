import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AllUsers from "../components/Admin/AllUsers";

const AdminDashboardUsers = () => {
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <AdminSideBar active={4} />
      <AllUsers />
    </div>
  )
}

export default AdminDashboardUsers
