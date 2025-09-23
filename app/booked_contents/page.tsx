'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/app/components/Nav'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import RequireAuth from '../components/RequireAuth'
import Image from 'next/image'

type Status = 'pending' | 'paid' | 'confirmed' | 'completed' | 'rejected'
interface Booking {
  booking_id: string;
  service: string;
  service_unit: string;
  status: string;
  created: string;
}

const Page = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState<Status>('pending')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  useEffect(() => {
    const storedUser  = JSON.parse(localStorage.getItem("user") || "{}");
    if (!storedUser ?.username) return;

    setError('');
    setLoading(true);

    const username = storedUser .username;
    const url = `https://espoint.onrender.com/espoint/get_user_booking/${username}/${status}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        if (data.msg) setBookings(data.msg);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [status]);

  // Helper function to get status badge classes
  const getStatusBadgeClasses = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full font-medium text-xs sm:text-sm shadow inline-block';
    if (status === 'pending') return `${baseClasses} bg-yellow-100 text-yellow-800`;
    if (status === 'confirmed' || status === 'completed') return `${baseClasses} bg-green-100 text-green-800`;
    if (status === 'paid') return `${baseClasses} bg-blue-100 text-blue-800`;
    if (status === 'rejected') return `${baseClasses} bg-red-600 text-white`;
    return `${baseClasses} bg-gray-500 text-white`;
  };

  return (
    <RequireAuth>
      <div className="bg-white min-h-screen flex flex-col">
        <Nav />

        {/* Hero Section */}
        <header className="px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 mt-12 bg-gradient-to-b from-white to-gray-50">
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 max-w-7xl mx-auto">
            {/* Text */}
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
                Manage Your <span className="text-[#7464fa]">Bookings</span>
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
                Track, review, and manage all your service bookings in one place.
                Stay updated with real-time statuses, revisit past appointments,
                and enjoy a smoother service experience every time.
              </p>
            </div>

            {/* Illustration */}
            <div className="md:w-1/2">
              <Image
                src="/undraw_date-picker_8qys (1).svg"
                alt="Booking illustration"
                width={450}
                height={450}
                className="rounded-2xl shadow-xl object-contain mx-auto w-full max-w-xs sm:max-w-md"
                priority
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 pt-10">
          {/* Filter */}
          <div className='flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center mb-8'>
            <label htmlFor="status" className="text-gray-700 font-medium text-sm sm:text-base">Filter by status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className='border border-gray-300 px-3 sm:px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7464fa] flex-1 sm:flex-none min-w-[200px]'
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Loading & Error States */}
          {loading && <div className="text-[#7464fa] text-base sm:text-lg">Loading {status} bookings...</div>}
          {error && <div className="text-red-500 text-base sm:text-lg">{error}</div>}

          {/* Bookings Table */}
          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center text-gray-500 text-lg sm:text-xl">
              No bookings found.
            </div>
          ) : (
          <div className=" overflow-x-auto rounded-2xl shadow-md border border-gray-200">
    <Table className="">
      <TableHeader>
        <TableRow className="bg-[#7464fa] sticky top-0 z-10">
          <TableHead className="py-3 px-3 sm:px-6 text-left text-white font-medium min-w-[100px] sm:min-w-[180px]">
            Booking ID
          </TableHead>
          <TableHead className="py-3 px-3 sm:px-6 text-left text-white font-medium min-w-[120px] sm:min-w-[180px]">
            Service
          </TableHead>
          <TableHead className="py-3 px-3 sm:px-6 text-left text-white font-medium min-w-[90px] sm:min-w-[120px]">
            Status
          </TableHead>
          <TableHead className="py-3 px-3 sm:px-6 text-left text-white font-medium min-w-[120px] sm:min-w-[160px]">
            Created
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow
            key={booking.booking_id}
            className="hover:bg-[#7464fa]/10 cursor-pointer transition-all duration-200 border-b last:border-b-0"
            onClick={() => router.push(`/bookings/${booking.booking_id}`)}
          >
            <TableCell className="font-sm line-clamp-2 text-sm clamp-1 py-3 px-3 sm:px-6 break-words whitespace-normal max-w-[100px] sm:max-w-[180px]">
              {booking.booking_id}
            </TableCell>
            <TableCell className="font-semibold text-[#7464fa] py-3 px-3 sm:px-6 break-words whitespace-normal max-w-[120px] sm:max-w-[180px]">
              {booking.service}
            </TableCell>
            <TableCell className="py-3 px-3 sm:px-6">
              <span className={getStatusBadgeClasses(booking.status)}>
                {booking.status}
              </span>
            </TableCell>
            <TableCell className="text-gray-700 py-3 px-3 sm:px-6 whitespace-nowrap">
              {new Date(booking.created).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>          )}

          {/* Optional: Mobile hint for scrolling */}
          <div className="mt-4 text-center text-xs text-gray-500 sm:hidden">
            Swipe left/right to view all columns
          </div>
        </main>
      </div>
    </RequireAuth>
  )
}

export default Page