import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AllProducts from "../components/Admin/AllProducts";

const AdminDashboardProducts = () => {
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <AdminSideBar active={5} />
      <AllProducts />
    </div>
  )
}

export default AdminDashboardProducts
