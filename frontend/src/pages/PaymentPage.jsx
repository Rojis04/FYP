import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import PageHeader from "../components/Layout/PageHeader";
import Payment from "../components/Payment/Payment";

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[var(--brand-cream)]'>
       <Header />
       <PageHeader
         kicker="Secure payment"
         title="Complete your purchase"
         subtitle="Your payment is encrypted and processed by trusted partners."
       />
       <CheckoutSteps active={2} />
       <Payment />
       <Footer />
    </div>
  )
}

export default PaymentPage

