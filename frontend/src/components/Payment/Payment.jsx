import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useSelector } from "react-redux"
import axios from "axios"
import { server } from "../../server"
import { toast } from "react-toastify"
import { FiCreditCard, FiTruck, FiSmartphone } from "react-icons/fi"

const Payment = () => {
  const [orderData, setOrderData] = useState([])
  const [open, setOpen] = useState(false)
  const [khaltiLoading, setKhaltiLoading] = useState(false)
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("latestOrder"))
    setOrderData(stored)
    window.scrollTo(0, 0)
  }, [])

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  }

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  }

  const paymentHandler = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(`${server}/payment/process`, paymentData, config)

      const client_secret = data.client_secret

      if (!stripe || !elements) return
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      })

      if (result.error) {
        toast.error(result.error.message)
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          }

          await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
              setOpen(false)
              navigate("/order/success")
              toast.success("Order successful!")
              localStorage.setItem("cartItems", JSON.stringify([]))
              localStorage.setItem("latestOrder", JSON.stringify([]))
              window.location.reload()
            })
            .catch((error) => {
              toast.error("Something went wrong with your order")
              console.error(error)
            })
        }
      }
    } catch (error) {
      toast.error(error.message || "Payment processing failed")
    }
  }

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault()

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    order.paymentInfo = {
      type: "Cash On Delivery",
    }

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false)
        navigate("/order/success")
        toast.success("Order successful!")
        localStorage.setItem("cartItems", JSON.stringify([]))
        localStorage.setItem("latestOrder", JSON.stringify([]))
        window.location.reload()
      })
      .catch((error) => {
        toast.error("Something went wrong with your order")
        console.error(error)
      })
  }

  const khaltiPaymentHandler = async (e) => {
    e.preventDefault()
    setKhaltiLoading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const khaltiOrderData = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: user,
        totalPrice: orderData?.totalPrice,
        customerInfo: {
          name: user?.name,
          email: user?.email,
          phone: user?.phoneNumber,
        },
      }

      const { data } = await axios.post(`${server}/order/create-order-khalti`, khaltiOrderData, config)

      if (data.success) {
        const orderIds = data.orders.map((order) => order._id).join(",")
        localStorage.setItem("khaltiOrderIds", orderIds)
        localStorage.setItem("khaltiPidx", data.khalti.pidx)
        window.location.href = data.khalti.payment_url
      } else {
        toast.error("Failed to initiate Khalti payment")
      }
    } catch (error) {
      console.error("Khalti payment error:", error)
      toast.error(error.response?.data?.message || "Failed to initiate Khalti payment")
    } finally {
      setKhaltiLoading(false)
    }
  }

  return (
    <div className="w-full bg-[var(--brand-cream)] min-h-screen py-10">
      <div className="w-[95%] 1100px:w-[88%] m-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
            khaltiPaymentHandler={khaltiPaymentHandler}
            khaltiLoading={khaltiLoading}
          />
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  )
}

const PaymentInfo = ({
  user,
  open,
  setOpen,
  paymentHandler,
  cashOnDeliveryHandler,
  khaltiPaymentHandler,
  khaltiLoading,
}) => {
  const [select, setSelect] = useState(1)

  return (
    <div className="rounded-[28px] border border-[var(--brand-mist)] bg-white/90 backdrop-blur p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-reef)] font-semibold">Payment</div>
          <h2 className="mt-2 text-2xl font-extrabold text-[var(--brand-ink)]">Choose a method</h2>
          <p className="text-sm text-gray-500 mt-1">All payments are secured and encrypted.</p>
        </div>
        <div className="text-xs px-3 py-2 rounded-full bg-[var(--brand-mist)] text-[var(--brand-ink)] font-semibold">
          Secure checkout
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        <button
          type="button"
          onClick={() => setSelect(1)}
          className={`w-full text-left rounded-2xl border p-4 transition ${
            select === 1 ? "border-[var(--brand-forest)] bg-[var(--brand-forest)] text-white" : "border-[var(--brand-mist)] bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${select === 1 ? "bg-white/20" : "bg-[var(--brand-mist)] text-[var(--brand-reef)]"}`}>
                <FiCreditCard />
              </div>
              <div>
                <div className="text-sm font-semibold">Credit / Debit Card</div>
                <div className={`text-xs ${select === 1 ? "text-white/80" : "text-gray-500"}`}>Visa, MasterCard</div>
              </div>
            </div>
            <div className={`text-xs font-semibold ${select === 1 ? "text-white" : "text-gray-400"}`}>
              Selected
            </div>
          </div>
        </button>

        {select === 1 && (
          <div className="rounded-2xl border border-[var(--brand-mist)] bg-white p-5">
            <form className="w-full space-y-4" onSubmit={paymentHandler}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--brand-ink)]/70 font-medium mb-2">Name On Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-reef)]"
                    value={user && user.name}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-[var(--brand-ink)]/70 font-medium mb-2">Expiration Date</label>
                  <CardExpiryElement
                    className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-reef)]"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          lineHeight: "42px",
                          color: "#141a1a",
                        },
                        empty: {
                          color: "#5f6b66",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#9bb7ae",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--brand-ink)]/70 font-medium mb-2">Card Number</label>
                  <CardNumberElement
                    className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-reef)]"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          lineHeight: "42px",
                          color: "#141a1a",
                        },
                        empty: {
                          color: "#5f6b66",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#9bb7ae",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div>
                  <label className="block text-[var(--brand-ink)]/70 font-medium mb-2">CVV</label>
                  <CardCvcElement
                    className="w-full px-4 py-3 rounded-xl border border-[var(--brand-mist)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-reef)]"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          lineHeight: "42px",
                          color: "#141a1a",
                        },
                        empty: {
                          color: "#5f6b66",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#9bb7ae",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--brand-forest)] hover:brightness-110 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiCreditCard />
                Pay Now
              </button>
            </form>
          </div>
        )}

        <button
          type="button"
          onClick={() => setSelect(2)}
          className={`w-full text-left rounded-2xl border p-4 transition ${
            select === 2 ? "border-[var(--brand-forest)] bg-[var(--brand-forest)] text-white" : "border-[var(--brand-mist)] bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${select === 2 ? "bg-white/20" : "bg-[var(--brand-mist)] text-[var(--brand-reef)]"}`}>
                <FiSmartphone />
              </div>
              <div>
                <div className="text-sm font-semibold">Khalti Wallet</div>
                <div className={`text-xs ${select === 2 ? "text-white/80" : "text-gray-500"}`}>Fast digital payment</div>
              </div>
            </div>
            <div className={`text-xs font-semibold ${select === 2 ? "text-white" : "text-gray-400"}`}>
              Selected
            </div>
          </div>
        </button>

        {select === 2 && (
          <div className="rounded-2xl border border-[var(--brand-mist)] bg-white p-5">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://khalti.s3.ap-south-1.amazonaws.com/website/khalti-logo-white.png"
                alt="Khalti"
                className="h-8 bg-[#5D2C91] px-3 py-1 rounded"
              />
              <div>
                <h4 className="font-semibold text-[var(--brand-ink)]">Pay with Khalti Digital Wallet</h4>
                <p className="text-sm text-[var(--brand-ink)]/70">Fast, secure, and convenient payment</p>
              </div>
            </div>
            <div className="text-sm text-[var(--brand-ink)]/70 space-y-1 mb-4">
              <p>- Pay using Khalti balance, bank account, or cards</p>
              <p>- No extra charges for digital wallet payments</p>
              <p>- Instant payment confirmation</p>
            </div>

            <form onSubmit={khaltiPaymentHandler}>
              <button
                type="submit"
                disabled={khaltiLoading}
                className="w-full bg-[var(--brand-forest)] hover:brightness-110 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {khaltiLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiSmartphone />
                    Pay with Khalti
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        <button
          type="button"
          onClick={() => setSelect(3)}
          className={`w-full text-left rounded-2xl border p-4 transition ${
            select === 3 ? "border-[var(--brand-forest)] bg-[var(--brand-forest)] text-white" : "border-[var(--brand-mist)] bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${select === 3 ? "bg-white/20" : "bg-[var(--brand-mist)] text-[var(--brand-reef)]"}`}>
                <FiTruck />
              </div>
              <div>
                <div className="text-sm font-semibold">Cash on Delivery</div>
                <div className={`text-xs ${select === 3 ? "text-white/80" : "text-gray-500"}`}>Pay when it arrives</div>
              </div>
            </div>
            <div className={`text-xs font-semibold ${select === 3 ? "text-white" : "text-gray-400"}`}>
              Selected
            </div>
          </div>
        </button>

        {select === 3 && (
          <div className="rounded-2xl border border-[var(--brand-mist)] bg-white p-5">
            <div className="bg-[var(--brand-mist)] p-4 rounded-xl mb-4">
              <p className="text-[var(--brand-ink)]/70 text-sm">
                Pay with cash upon delivery. Please have the exact amount ready when your order arrives.
              </p>
            </div>

            <form onSubmit={cashOnDeliveryHandler}>
              <button
                type="submit"
                className="w-full bg-[var(--brand-forest)] hover:brightness-110 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                Confirm Order
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2)

  return (
    <div className="rounded-[28px] border border-[var(--brand-mist)] bg-white/90 backdrop-blur p-6 shadow-sm h-fit">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-reef)] font-semibold">Summary</div>
          <h2 className="mt-2 text-xl font-extrabold text-[var(--brand-ink)]">Order overview</h2>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[var(--brand-mist)] text-[var(--brand-reef)] flex items-center justify-center">
          <FiCreditCard />
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex justify-between items-center">
          <span className="text-[var(--brand-ink)]/70">Subtotal:</span>
          <span className="font-semibold text-[var(--brand-ink)]">Rs.{orderData?.subTotalPrice?.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[var(--brand-ink)]/70">Shipping:</span>
          <span className="font-semibold text-[var(--brand-ink)]">Rs.{shipping}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[var(--brand-ink)]/70">Discount:</span>
          <span className="font-semibold text-[var(--brand-ink)]">
            {orderData?.discountPrice ? `Rs.${orderData.discountPrice}` : "-"}
          </span>
        </div>

        <div className="border-t border-[var(--brand-mist)] pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-[var(--brand-ink)]">Total:</span>
            <span className="text-xl font-bold text-[var(--brand-ink)]">Rs.{orderData?.totalPrice}</span>
          </div>
        </div>

        <div className="bg-[var(--brand-mist)] p-4 rounded-xl mt-2">
          <div className="flex items-center gap-2 mb-2">
            <FiTruck className="text-[var(--brand-reef)]" />
            <span className="font-medium text-[var(--brand-ink)]">Delivery Address</span>
          </div>
          <p className="text-sm text-[var(--brand-ink)]/70">
            {orderData?.shippingAddress?.address1}, {orderData?.shippingAddress?.address2},
            {orderData?.shippingAddress?.city}, Nepal - {orderData?.shippingAddress?.zipCode}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Payment
