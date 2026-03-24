import React from 'react'
import Header from '../components/Layout/Header'
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Checkout from "../components/Checkout/Checkout";
import Footer from '../components/Layout/Footer';
import PageHeader from "../components/Layout/PageHeader";

const CheckoutPage = () => {
  return (
    <div>
        <Header />
        <PageHeader
          kicker="Checkout"
          title="Delivery details"
          subtitle="Add your shipping information to confirm availability and delivery timeline."
        />
        <CheckoutSteps active={1} />
        <Checkout />
        <Footer />
    </div>
  )
}

export default CheckoutPage

