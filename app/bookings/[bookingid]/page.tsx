"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/app/components/Loading";
import Nav from "@/app/components/Nav";

interface Booking {
  booking_id: string;
  service: string;
  service_unit: string;
  store: {
    client_email: string;
    preferred_staff_id: string;
    notes: string;
    service_time: string;
    amount: string;
    currency: string;
    service_date: string;
    client_phone: string;
    client_name: string;
    status: string;
    completed_date: string;
    booking_code: string;
  };
  status: string;
  created: string;
}

interface ServiceStore {
  branding: { logo_url: string[] };
  name: string;
  status: string;
  description: string;
  base_price: string;
  category: string;
  eligible_roles: string;
  duration_minutes: string;
  rental_items: { [key: string]: { item: string; quantity: string; duration_hours: string } };
  discount_percent: string;
  service_hours: { start: string; end: string };
}

interface ServiceContent {
  content_id: string;
  service: string;
  service_unit: string;
  store: ServiceStore;
  status: string;
  created: string;
}

const Page = () => {
  const params = useParams();
  const bookingId = params?.bookingid as string;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [serviceContent, setServiceContent] = useState<ServiceContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) return;
    setLoading(true);

    fetch(`https://espoint.onrender.com/espoint/get_booking/${bookingId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch booking");
        return res.json();
      })
      .then(data => {
        if (data.msg) {
          setBooking(data.msg);

          const unit = data.msg.service_unit;
          if (unit) {
            fetch(
              `https://espoint.onrender.com/espoint/get_all_content_based_service_and_status/${unit}/approved`
            )
              .then(res => {
                if (!res.ok) throw new Error("Failed to fetch service content");
                return res.json();
              })
              .then(contentData => {
                if (contentData.msg && contentData.msg.length > 0) {
                  setServiceContent(contentData.msg[0]);
                }
              })
              .catch((err: unknown) => {
                if (err instanceof Error) setError(err.message);
              });
          }
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error) setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading)
    return (
      <div className="mt-20 flex justify-center items-center h-[100vh] opacity-3">
        <Loader />
      </div>
    );

  if (error) return <div className="text-red-500 mt-20">{error}</div>;
  if (!booking) return <div className="mt-20 text-center">No booking found.</div>;

  const statusColor =
    booking.status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : booking.status === "confirmed"
      ? "bg-[#7464fa]/20 text-[#7464fa]"
      : booking.status === "rejected"
      ? "bg-red-100 text-red-800"
      : "bg-green-100 text-green-800";

  return (
    <div className="bg-gray-50 min-h-screen opacity-3">
      <Nav />
      <div className="pt-28 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto opacity-3">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
            <h1 className="text-5xl font-bold mb-10   text-black">Booking <span className='text-[#7464fa]'>Details</span></h1>
          <span className={`px-5 py-2 rounded-full font-semibold text-base w-fit capitalize ${statusColor}`}>
            {booking.status}
          </span>
        </div>

        {/* Booking Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-[#7464fa]/30">
          <h2 className="text-xl font-semibold text-[#7464fa] mb-6">Client & Booking Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Info label="Booking ID" value={booking.booking_id} />
            <Info label="Client Name" value={booking.store.client_name} />
            <Info label="Email" value={booking.store.client_email} />
            <Info label="Phone" value={booking.store.client_phone} />
            <Info label="Service Date" value={booking.store.service_date} />
            <Info label="Service Time" value={booking.store.service_time} />
            <Info label="Amount" value={`₦${booking.store.amount} ${booking.store.currency}`} />
            <Info label="Notes" value={booking.store.notes || "-"} />
            <Info label="Booking Code" value={booking.store.booking_code || "Not assigned"} />
          </div>
        </div>

        {/* Service Info Card */}
        <div className="bg-white rounded-2xl shadow-lg w-full mb-10 p-6 md:p-8 border border-[#7464fa]/30">
          <h2 className="text-xl font-semibold text-[#7464fa] mb-6">Service Information</h2>
          {serviceContent ? (
            <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
              {serviceContent.store.branding.logo_url?.[0] && (
                <img
                  src={serviceContent.store.branding.logo_url[0]}
                  alt={serviceContent.store.name}
                  className="w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56 object-cover rounded-xl border border-[#7464fa]/30 flex-shrink-0"
                />
              )}
              <div className="flex-1 w-full">
                <h3 className="text-xl md:text-2xl font-bold text-[#7464fa] mb-2 break-words">
                  {serviceContent.store.name}
                </h3>
                <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed break-words">
                  {serviceContent.store.description}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <Tag label={`Category: ${serviceContent.store.category}`} />
                  <Tag label={`Base Price: ₦${serviceContent.store.base_price}`} />
                  <Tag label={`Discount: ${serviceContent.store.discount_percent}%`} />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center">No service details found.</div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <span className="text-sm text-gray-500">
            Created: {new Date(booking.created).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#7464fa]/5 p-4 rounded-lg shadow-sm">
      <span className="block text-sm font-medium text-[#7464fa]">{label}</span>
      <span className="block text-gray-900 font-semibold break-words">{value}</span>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="bg-[#7464fa]/10 px-3 py-1 rounded-lg text-sm text-[#7464fa] font-medium shadow-sm">
      {label}
    </span>
  );
}

export default Page;
