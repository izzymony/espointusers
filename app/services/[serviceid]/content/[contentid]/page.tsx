'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loader from '@/app/components/Loading';
import Nav from '@/app/components/Nav';
import Image from 'next/image';
import { Heart, ArrowLeft, Package, Clock2, Calendar1} from 'lucide-react';
interface ServiceStore {
  branding: {
    logo_url: string[];
  };
  name: string;
  status: string;
  description: string;
  base_price: number;
  category: string;
  eligible_roles: string;
  duration_minutes: string;
  rental_items:{
    1:{
      item: string;
      quantity:number;
      duration_hours:number;
    }
  }

  discount_percent: number;
  service_hours:{
    start: string;
    end:string
  }
  
}

interface ServiceContent {
  content_id: string;
  service: string;
  service_unit: string;
  store: ServiceStore;
}

const ContentDetails = () => {
  const params = useParams();
  const content_id = params?.contentid as string;

  const [content, setContent] = useState<ServiceContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    if (!content_id) return;

    const url = `https://espoint.onrender.com/espoint/get_content/${content_id}`;
    console.log("Fetching Content URL:", url);

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

  const handleBooking = async () => {
    setBookingLoading(true);
    setBookingError("");
    setBookingSuccess("");

    try{
      const res = await fetch(`https://espoint.onrender.com/espoint/create_booking`, {
        method: "POST",
        headers:{
          'Content-Type' : "application/json",
        },
        body: JSON.stringify({
          content_id: content?.content_id,
        service_id: content?.service,
        quantity: itemQuantity,
        total_price: totalPrice,
        })
      })

      const data = await res.json();
    if (res.ok && data.success) {
      setBookingSuccess('Booking successful!');
    } else {
      setBookingError(data.message || 'Booking failed.');
    }
  } catch (err) {
    setBookingError('Booking failed.');
  } finally {
    setBookingLoading(false);
  }
  }

  if (loading) return <div className="mt-20 flex h-[100vh] justify-center items-center"><Loader /></div>;
  if (error) return <div className="text-red-500 mt-20">{error}</div>;
  if (!content) return <div className="mt-20">No content found.</div>;

  const { store } = content;
  // Calculate total price and total items
  const itemQuantity = store.rental_items[1]?.quantity || 0;
  const itemPrice = store.base_price || 0;
  const totalPrice = itemQuantity * itemPrice;

  return (
    <div className="bg-white h-[100vh] mt-24 ">
      <Nav />
      <div className=" px-4">
        <main>
          <div className="relative w-full">
            {store.branding.logo_url.length > 0 ? (
              <Image
                src={store.branding.logo_url[0]}
                alt={store.name}
                width={1200}
                height={600}
                className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover rounded-xl"
                priority
              />
            ) : (
              <Image
                src={'/camera-431119_1280.jpg'}
                alt={store.name}
                width={1200}
                height={600}
                className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover rounded-xl"
                priority
              />
            )}
            <div className="absolute top-4 left-0 w-full flex justify-between items-center px-6 z-10">
                                <div className="text-center py-1 px-4 rounded-full bg-primary text-primary-foreground capitalize shadow-lg">
                                  {store.category}
                                </div>
                                <button
                                  className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <Heart className="w-6 h-6 text-muted-foreground hover:text-red-500 transition-colors" />
                                </button>
                              </div>
          </div>

          <div className='py-8'>
            <div className=''>
            <h1 className='font-bold text-3xl text-black py-5 '>{store.name}</h1>
            </div>
            <hr className='mt-6' />
            <h1 className='text-black text-xl font-bold mt-4'> Description</h1>
            <p className='font-xs  text-[18px] mt-2'>{store.description}</p>


            <hr className='mt-6'/>
            <h1 className='text-black text-xl font-bold mt-4'> Rental items</h1>
            <div className='grid gap-5 mt-6'>
            <div className='flex items-center gap-2 '>
              <p className='text-[#d4731e] font-bold text-[18px]'>Items</p>:
              <p className='font-xs text-black'>{store.rental_items[1].item}</p>
              
            </div>
            <div className='flex items-center gap-2'>
             <p className='text-[#d4731e] font-bold text-[18px]'>Quantity</p>:
              <p className='font-xs text-black'>{store.rental_items[1].quantity}</p>

            </div>
            <div className='flex items-center gap-2 '>
               <p className='text-[#d4731e] font-bold text-[18px]'>Duration hours</p>:
              <p className='font-xs text-black'>{store.rental_items[1].duration_hours}hr</p>

            </div>
            </div>
            <hr className='mt-6' />
            <h1 className='text-black text-xl font-bold mt-4'> Check-in details</h1>
            <div className='grid gap-1  mt-4'>
               <p className='font-medium text-[17px]'>Start</p>
              <div className='flex gap-2 mt-1'>
                <Clock2 className='text-[#d4731e]  ' />
               
                 <p className='font-xs text-black'>{store.service_hours.start}AM</p>
                 
              </div>
            </div>
            <div className='grid gap-1  mt-4'>
               <p className='font-medium text-[17px]'>End</p>
              <div className='flex gap-2 mt-1'>
                <Clock2 className='text-[#d4731e]  ' />
               
                 <p className='font-xs text-black'>{store.service_hours.end}PM</p>
                 
              </div>
            </div>

            <div className='bg-[#fffbed] pb-6 p-4 border mt-10 border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 flex flex-col overflow-hidden'>
              <p className='font-bold text-2xl text-[#d4731e] '>
                &#8358; {store.base_price} <span className='text-base text-gray-500 font-normal'>(per item)</span>
              </p>
              <div className='flex flex-col gap-2 py-3'>
                <p className='text-lg text-black font-semibold'>Total Items: <span className='text-[#d4731e]'>{itemQuantity}</span></p>
                <p className='text-lg text-black font-semibold'>Total Price: <span className='text-[#d4731e]'>&#8358; {totalPrice}</span></p>
              </div>
              <div className=' flex gap-3 py-7'>
                <div className='border w-full border-gray-300 rounded-lg mt-4 p-4'>
                  <p className='text-black text-[17px]'>START</p>
                  <div className='flex gap-2'>
                    <Calendar1 className='text-black w-4 mt-2' />
                    <p className='font-medium mt-2 text-black'>Add date</p>
                  </div>
                </div>
                <div className='border w-full border-gray-300 rounded-lg mt-4 p-4'>
                  <p className='text-black text-[17px]'>START</p>
                  <div className='flex gap-2'>
                    <Calendar1 className='text-black w-4 mt-2' />
                    <p className='font-medium mt-2 text-black'>Add date</p>
                  </div>
                </div>
              </div>
              <button className='text-white font-bold rounded-lg bg-[#d4731e] p-2 w-full'>Reserve</button>

              <hr className='border border-gray-200 mt-8'/>
              <div className='py-6'>
                <table className='w-full text-left text-gray-800 text-[15px] border border-gray-200 rounded-lg mt-2'>
                  <thead>
                    <tr className='text-[14px]'>
                      <th className='py-2 px-3'>Item</th>
                      <th className='py-2 px-3'>Unit Price</th>
                      <th className='py-2 px-3'>Quantity</th>
                      <th className='py-2 px-3'>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='py-2 px-3'>{store.rental_items[1].item}</td>
                      <td className='py-2 px-3'>&#8358; {store.base_price}</td>
                      <td className='py-2 px-3'>{store.rental_items[1].quantity}</td>
                      <td className='py-2 px-3 font-bold text-[#d4731e]'>&#8358; {store.base_price * store.rental_items[1].quantity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='flex justify-center'>
              <button
  className='text-white font-bold rounded-lg bg-[#d4731e] p-2 w-[200px] text-white disabled:opacity-60'
  onClick={handleBooking}
  disabled={bookingLoading}
>
  {bookingLoading ? 'Booking...' : 'Book'}
</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContentDetails;