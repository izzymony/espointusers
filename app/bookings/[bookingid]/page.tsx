'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loader from '@/app/components/Loading';
import Nav from '@/app/components/Nav';

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
  branding: {
    logo_url: string[];
  };
  name: string;
  status: string;
  description: string;
  base_price: string;
  category: string;
  eligible_roles: string;
  duration_minutes: string;
  rental_items: {
    [key: string]: {
      item: string;
      quantity: string;
      duration_hours: string;
    };
  };
  discount_percent: string;
  service_hours: {
    start: string;
    end: string;
  };
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
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookingId) return;
    setLoading(true);

    fetch(`https://espoint.onrender.com/espoint/get_booking/${bookingId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch booking');
        return res.json();
      })
      .then((data) => {
        if (data.msg) {
          setBooking(data.msg);

          const unit = data.msg.service_unit;
          if (unit) {
            fetch(
              `https://espoint.onrender.com/espoint/get_all_content_based_service_and_status/${unit}/active`
            )
              .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch service content');
                return res.json();
              })
              .then((contentData) => {
                if (contentData.msg && contentData.msg.length > 0) {
                  setServiceContent(contentData.msg[0]);
                }
              })
              .catch((err) => setError(err.message));
          }
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading)
    return (
      <div className="mt-20 flex justify-center items-center h-[100vh]">
        <Loader />
      </div>
    );

  if (error) return <div className="text-red-500 mt-20">{error}</div>;
  if (!booking) return <div className="mt-20">No booking found.</div>;

  const statusColor =
    booking.status === 'pending'
      ? 'bg-yellow-100 text-yellow-800'
      : booking.status === 'confirmed'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';

  return (
    <div className="bg-white min-h-screen">
      <Nav />
      <div className="mt-26 p-6 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#d4731e]">Booking Details</h1>
          <span className={`px-5 py-2 rounded-full font-semibold text-base ${statusColor}`}>
            {booking.status}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Info label="Booking ID" value={booking.booking_id} />
          <Info label="Client Name" value={booking.store.client_name} />
          <Info label="Email" value={booking.store.client_email} />
          <Info label="Phone" value={booking.store.client_phone} />
          <Info label="Service Date" value={booking.store.service_date} />
          <Info label="Service Time" value={booking.store.service_time} />
          <Info label="Amount" value={`₦${booking.store.amount} ${booking.store.currency}`} />
          <Info label="Notes" value={booking.store.notes || '-'} />
        </div>
        <div className="mt-8">
          {serviceContent ? (
            <div className="bg-[#fffbed] rounded-xl p-8 shadow flex flex-col md:flex-row gap-8 items-center">
              {serviceContent.store.branding.logo_url?.[0] && (
                <img
                  src={serviceContent.store.branding.logo_url[0]}
                  alt={serviceContent.store.name}
                  className="w-40 h-40 object-cover rounded-xl border"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#d4731e] mb-2">
                  {serviceContent.store.name}
                </h2>
                <p className="text-gray-700 mb-2">{serviceContent.store.description}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-600">
                    Category: {serviceContent.store.category}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-600">
                    Base Price: ₦{serviceContent.store.base_price}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-600">
                    Discount: {serviceContent.store.discount_percent}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center mt-6">
              No service details found.
            </div>
          )}
        </div>
        <div className="mt-10 text-center">
          <span className="text-xs text-gray-400">
            Created: {new Date(booking.created).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col mb-2">
      <span className="font-semibold text-gray-600 text-sm">{label}</span>
      <span className="text-gray-900 break-all text-base">{value}</span>
    </div>
  );
}

export default Page;