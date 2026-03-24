import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllRefundOrders from "../../components/Shop/AllRefundOrders";

const ShopAllRefunds = () => {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <DashboardSideBar active={10} />
      <AllRefundOrders />
    </div>
  )
}

export default ShopAllRefunds
