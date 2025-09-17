'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loader from '@/app/components/Loading';
import Nav from '@/app/components/Nav';
import Image from 'next/image';
import { Clock2 } from 'lucide-react';

interface ServiceStore {
  branding: { logo_url: string[] };
  name: string;
  status: string;
  description: string;
  base_price: number;
  category: string;
  eligible_roles: string;
  duration_minutes: string;
  rental_items: {
    1: {
      item: string;
      quantity: number;
      duration_hours: number;
    };
  };
  discount_percent: number;
  service_hours: { start: string; end: string };
}

interface ServiceContent {
  content_id: string;
  service: string;
  service_unit: string;
  store: ServiceStore;
}

interface FormData {
  client_name: string;
  client_email: string;
  client_phone: string;
  service_date: string;
  service_time: string;
  notes: string;
  preferred_staff_id: string;
  status: string;
  booking_code: string;
  username?: string;
}

const ContentDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const content_id = params?.contentid as string;

  const [content, setContent] = useState<ServiceContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    client_name: '',
    client_email: '',
    client_phone: '',
    service_date: '',
    service_time: '',
    notes: '',
    booking_code: '',
    preferred_staff_id: '',
    status: 'pending',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser?.username) {
      setFormData((prev) => ({
        ...prev,
        username: storedUser.username,
      }));
    }
  }, []);

  useEffect(() => {
    if (!content_id) return;

    const url = `https://espoint.onrender.com/espoint/get_content/${content_id}`;
    setLoading(true);
    setError('');

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch content details');
        return res.json();
      })
      .then((data) => {
        if (data.msg) {
          setContent(data.msg);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [content_id]);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading)
    return (
      <div className="mt-20 flex h-[100vh] justify-center items-center">
        <Loader />
      </div>
    );
  if (error) return <div className="text-red-500 mt-20">{error}</div>;
  if (!content) return <div className="mt-20">No content found.</div>;

  const { store } = content;
  const itemQuantity = store.rental_items[1]?.quantity || 0;
  const itemPrice = store.base_price || 0;
  const totalPrice = itemQuantity * itemPrice;

  return (
    <div className="bg-white min-h-screen">
      <Nav />

      <div className='px-4'>

      {/* Hero Section */}
      <div className="relative w-full mt-20">
        <Image
          src={
            store.branding.logo_url.length > 0
              ? store.branding.logo_url[0]
              : '/camera-431119_1280.jpg'
          }
          alt={store.name}
          width={1200}
          height={600}
          className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover rounded-xl"
          priority
        />
        <div className="absolute top-4 left-0 w-full flex justify-between items-center px-6 z-10">
          <div className="text-center py-1 px-4 rounded-full bg-primary text-primary-foreground capitalize shadow-lg">
            {store.category}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          <h1 className="font-bold text-3xl text-black">{store.name}</h1>
          <div>
            <h2 className="text-xl font-bold text-black">Description</h2>
            <p className="text-[17px] text-gray-700 mt-2">{store.description}</p>
          </div>

          <hr className='p-4 mt-15' />

          {/* Rental Items */}
          <div>
            <h2 className="text-xl font-bold text-black">Rental Items</h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <p>
                <span className="text-[#d4731e] font-bold">Item:</span>{' '}
                {store.rental_items[1].item}
              </p>
              <p>
                <span className="text-[#d4731e] font-bold">Quantity:</span>{' '}
                {store.rental_items[1].quantity}
              </p>
              <p>
                <span className="text-[#d4731e] font-bold">Duration:</span>{' '}
                {store.rental_items[1].duration_hours} hrs
              </p>
            </div>
          </div>
          <hr className='p-4 mt-15'  />
          {/* Check-in Details */}
          <div>
            <h2 className="text-xl font-bold text-black">Check-in Details</h2>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-10">
              <div>
                <p className="font-medium">Start</p>
                <div className="flex items-center gap-2">
                  <Clock2 className="text-[#d4731e]" />
                  <span>{store.service_hours.start} AM</span>
                </div>
              </div>
              <div>
                <p className="font-medium">End</p>
                <div className="flex items-center gap-2">
                  <Clock2 className="text-[#d4731e]" />
                  <span>{store.service_hours.end} PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section (Right Column) */}
        <div className="bg-[#fffbed] border border-gray-200 h-fit rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 p-6 flex flex-col">
          <p className="font-bold text-2xl text-[#d4731e]">
            ₦{store.base_price}{' '}
            <span className="text-base text-gray-500 font-normal">
              (per item)
            </span>
          </p>

          <div className="py-4 space-y-2">
            <p className="text-lg text-black font-semibold">
              Total Items:{' '}
              <span className="text-[#d4731e]">{itemQuantity}</span>
            </p>
            <p className="text-lg text-black font-semibold">
              Total Price:{' '}
              <span className="text-[#d4731e]">₦{totalPrice}</span>
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full rounded-lg text-sm text-gray-800 border border-gray-200 rounded-full">
              <thead className="bg-[#d4731e] rounded-lg ">
                <tr className='rounded-lg'>
                  <th className="py-2 px-3 text-white">Item</th>
                  <th className="py-2 px-3 text-white">Unit Price</th>
                  <th className="py-2 px-3 text-white">Quantity</th>
                  <th className="py-2 px-3 text-white">Total</th>
                </tr>
              </thead>
              <tbody className='rounded-lg'>
                <tr>
                  <td className="py-2 px-3">{store.rental_items[1].item}</td>
                  <td className="py-2 px-3">₦{store.base_price}</td>
                  <td className="py-2 px-3">{store.rental_items[1].quantity}</td>
                  <td className="py-2 px-3 font-bold text-[#d4731e]">
                    ₦{store.base_price * store.rental_items[1].quantity}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Book Button */}
          <div className="mt-6 flex justify-center">
            <button
              className="bg-[#d4731e] hover:bg-[#b95f19] text-white font-bold rounded-lg p-3 w-full sm:w-[200px] transition disabled:opacity-60"
              disabled={bookingLoading}
              onClick={() => setShowModal(true)}
            >
              {bookingLoading ? 'Booking...' : 'Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContentDetails;
