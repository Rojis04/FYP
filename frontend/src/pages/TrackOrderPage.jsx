import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import TrackOrder from "../components/Profile/TrackOrder";
import PageHeader from "../components/Layout/PageHeader";

const TrackOrderPage = () => {
  return (
    <div>
        <Header />
        <PageHeader
          kicker="Delivery status"
          title="Track your shipment"
          subtitle="Stay updated on the latest delivery timeline and milestones."
        />
        <TrackOrder />
        <Footer />
    </div>
  )
}

export default TrackOrderPage

