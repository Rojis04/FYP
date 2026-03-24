import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllProducts from "../../components/Shop/AllProducts";

const ShopAllProducts = () => {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <DashboardSideBar active={3} />
      <AllProducts />
    </div>
  )
}

export default ShopAllProducts
