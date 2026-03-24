import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import CreateProduct from "../../components/Shop/CreateProduct";

const ShopCreateProduct = () => {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <DashboardSideBar active={4} />
      <CreateProduct />
    </div>
  )
}

export default ShopCreateProduct
