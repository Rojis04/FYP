import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import UserOrderDetails from "../components/UserOrderDetails";
import PageHeader from "../components/Layout/PageHeader";

const OrderDetailsPage = () => {
  return (
    <div>
        <Header />
        <PageHeader
          kicker="Order details"
          title="Track your order"
          subtitle="Review order items, payment status, and delivery updates in one place."
        />
        <UserOrderDetails />
        <Footer />
    </div>
  )
}

export default OrderDetailsPage

