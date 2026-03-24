import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import PageHeader from "../components/Layout/PageHeader";
import Lottie from "react-lottie";
import animationData from "../Assests/animations/107043-success.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <PageHeader
        kicker="Order confirmed"
        title="Success"
        subtitle="Your order is confirmed and being processed."
        align="center"
      />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="app-section pb-12 flex flex-col items-center">
      <div className="rounded-[28px] border border-[var(--brand-mist)] bg-white p-8 shadow-sm w-full max-w-2xl text-center">
        <Lottie options={defaultOptions} width={260} height={260} />
        <h5 className="text-center text-[24px] font-semibold text-[var(--brand-ink)]">
          Your order is successful.
        </h5>
        <p className="mt-2 text-sm text-gray-500">
          You can track delivery status from your profile dashboard.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessPage;


