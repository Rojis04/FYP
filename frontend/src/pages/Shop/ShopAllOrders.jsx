import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllOrders from "../../components/Shop/AllOrders";

const ShopAllOrders = () => {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <DashboardSideBar active={2} />
      <AllOrders />
    </div>
  )
}

export default ShopAllOrders
