import React from "react"
import { useState } from "react"
import Footer from "../components/Layout/Footer"
import Header from "../components/Layout/Header"
import styles from "../styles/styles"
import PageHeader from "../components/Layout/PageHeader"

const FAQPage = () => {
  return (
    <div className="bg-[var(--brand-cream)] min-h-screen">
      <Header activeHeading={5} />
      <PageHeader
        kicker="Support"
        title="Frequently asked questions"
        subtitle="Quick answers for orders, payments, shipping, and account details."
        align="center"
      />
      <Faq />
      <Footer />
    </div>
  )
}

const Faq = () => {
  const [activeTab, setActiveTab] = useState(null)

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab)
  }

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at ",
      highlight: "support@elaris.com",
      suffix: " with your order number and a brief explanation of why you're returning the item.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on our website and viewing the order details.",
    },
    {
      question: "How do I contact customer support?",
      answer: "You can contact our customer support team by emailing us at ",
      highlight: "help@elaris.com",
      suffix: ", or by calling us at ",
      highlight2: "+977 9869672736",
      suffix2: " — available 24/7, Sunday through Saturday.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only offer shipping within ",
      highlight: "Nepal.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept payments via ",
      highlight: "Khalti",
      suffix: " and ",
      highlight2: "eSewa",
      suffix2: ". We also provide a convenient ",
      highlight3: "Cash on Delivery (COD)",
      suffix3: " option.",
    },
  ]

  return (
    <div className={`${styles.section} py-8 sm:py-12 px-4 sm:px-6`}>
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--brand-ink)] font-Poppins">
          Frequently asked questions
        </h2>
        <p className="mt-3 sm:mt-4 text-[var(--brand-ink)]/70 text-base sm:text-lg">Have questions? We are here to help.</p>
      </div>

      <div className="mx-auto space-y-5 sm:space-y-6 max-w-xl sm:max-w-3xl">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-[var(--brand-mist)]"
          >
            <button onClick={() => toggleTab(index)} className="flex justify-between items-center w-full">
              <span className="text-base sm:text-lg font-semibold text-[var(--brand-ink)] text-left">{faq.question}</span>
              <span className="ml-4 transform transition-transform duration-200">
                {activeTab === index ? (
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--brand-ink)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--brand-reef)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </span>
            </button>

            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeTab === index ? "max-h-screen mt-3 sm:mt-4" : "max-h-0"
              }`}
            >
              {activeTab === index && (
                <div className="text-[var(--brand-ink)]/70 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                  {faq.highlight && <span className="text-[var(--brand-reef)] font-medium">{faq.highlight}</span>}
                  {faq.suffix && <span>{faq.suffix}</span>}
                  {faq.highlight2 && <span className="text-[var(--brand-reef)] font-medium"> {faq.highlight2}</span>}
                  {faq.suffix2 && <span>{faq.suffix2}</span>}
                  {faq.highlight3 && <span className="text-[var(--brand-reef)] font-semibold"> {faq.highlight3}</span>}
                  {faq.suffix3 && <span>{faq.suffix3}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQPage




