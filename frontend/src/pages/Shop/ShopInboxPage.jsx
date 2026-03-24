import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import DashboardMessages from "../../components/Shop/DashboardMessages";

const ShopInboxPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <DashboardSideBar active={8} />
      <DashboardMessages />
    </div>
  )
}

export default ShopInboxPage
