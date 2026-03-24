import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
    .put(
      `${server}/order/order-refund-success/${id}`,
      {
        status,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Order updated!");
      dispatch(getAllOrdersOfShop(seller._id));
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  console.log(data?.status);


  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 px-4 md:px-8 py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#111827] border border-[#1f2937] flex items-center justify-center">
              <BsFillBagFill size={22} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Order</p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">Order Details</h1>
            </div>
          </div>

          <Link
            to="/dashboard-orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0f172a] border border-[#1f2937] text-slate-200 font-bold hover:bg-[#111827] transition"
          >
            Order List
          </Link>
        </div>

        <div className="rounded-2xl border border-[#1f2937] bg-[#0f172a] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-slate-300">
            Order ID: <span className="text-white font-semibold">#{data?._id?.slice(0, 8)}</span>
          </p>
          <p className="text-sm text-slate-300">
            Placed on: <span className="text-white font-semibold">{data?.createdAt?.slice(0, 10)}</span>
          </p>
        </div>

        <div className="rounded-2xl border border-[#1f2937] bg-[#0f172a] p-5">
          <h2 className="text-lg font-extrabold text-white mb-4">Items</h2>
          <div className="space-y-4">
            {data?.cart.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <img
                  src={`${item.images[0]?.url}`}
                  alt={item.name}
                  className="w-[74px] h-[74px] rounded-xl object-cover border border-[#1f2937]"
                />
                <div className="flex-1">
                  <h5 className="text-base md:text-lg font-bold text-white">{item.name}</h5>
                  <p className="text-sm text-slate-300 mt-1">
                    Rs.{item.discountPrice} x {item.qty}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#1f2937] text-right">
            <p className="text-sm text-slate-300">
              Total Price: <span className="text-white font-bold">Rs.{data?.totalPrice}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-3 rounded-2xl border border-[#1f2937] bg-[#0f172a] p-5">
            <h3 className="text-base font-extrabold text-white">Shipping Address</h3>
            <div className="mt-3 space-y-1 text-sm text-slate-300">
              <p>
                {data?.shippingAddress.address1} {data?.shippingAddress.address2}
              </p>
              <p>{data?.shippingAddress.city}</p>
              <p>{data?.shippingAddress.country}</p>
              <p>{data?.user?.phoneNumber}</p>
            </div>
          </div>

          <div className="md:col-span-2 rounded-2xl border border-[#1f2937] bg-[#0f172a] p-5">
            <h3 className="text-base font-extrabold text-white">Payment Info</h3>
            <p className="mt-3 text-sm text-slate-300">
              Status: <span className="text-white font-semibold">{data?.paymentInfo?.status || "Not Paid"}</span>
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#1f2937] bg-[#0f172a] p-5">
          <h3 className="text-base font-extrabold text-white mb-3">Order Status</h3>
          {data?.status !== "Processing refund" && data?.status !== "Refund Success" && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full sm:w-[260px] bg-[#0b1120] border border-[#1f2937] text-slate-200 rounded-xl px-3 py-2"
            >
              {[
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ]
                .slice(
                  [
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                  ].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          )}
          {data?.status === "Processing refund" || data?.status === "Refund Success" ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full sm:w-[260px] bg-[#0b1120] border border-[#1f2937] text-slate-200 rounded-xl px-3 py-2"
            >
              {["Processing refund", "Refund Success"]
                .slice(["Processing refund", "Refund Success"].indexOf(data?.status))
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          ) : null}

          <div className="mt-5">
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 shadow-lg hover:shadow-xl transition"
              onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

