'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/app/components/Nav'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import RequireAuth from '../components/RequireAuth'

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
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!storedUser?.username) return;

    setError('');
    setLoading(true);

    const username = storedUser.username;
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

  return (
    <RequireAuth>
      <div className="bg-white min-h-screen">
        <Nav />
        <div className="max-w-7xl mx-auto pt-28 pb-16 px-6">
          <h1 className="text-5xl font-bold mb-10   text-black">My <span className='text-[#7464fa]'>Bookings</span></h1>

          <div className='flex flex-wrap gap-4 items-center mb-6'>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className='border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7464fa]'
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {loading && <div className="text-[#7464fa] text-lg">Loading {status} bookings...</div>}
          {error && <div className="text-red-500 text-lg">{error}</div>}

          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center text-gray-500 text-xl">
              No bookings yet.
            </div>
          ) : (
            <div className="w-full overflow-x-auto rounded-lg shadow-md border border-gray-200">
              <div className="min-w-[1100px]">
                <Table className="w-full text-lg">
                  <TableHeader className='rounded-md bg-[#7464fa]/10'>
                    <TableRow className="bg-[#7464fa] text-white shadow-md text-white">
                      <TableHead className="py-4 px-6 text-left text-lg text-white">Booking ID</TableHead>
                      <TableHead className="py-4 px-6 text-left text-lg text-white">Service</TableHead>
                      <TableHead className="py-4 px-6 text-left text-lg text-white">Status</TableHead>
                      <TableHead className="py-4 px-6 text-left text-lg text-white">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow
                        key={booking.booking_id}
                        className="hover:bg-[#7464fa]/10 cursor-pointer transition-all duration-200"
                        onClick={() => router.push(`/bookings/${booking.booking_id}`)}
                      >
                        <TableCell className="break-all font-mono py-4 px-6 text-base">{booking.booking_id}</TableCell>
                        <TableCell className="font-semibold text-[#7464fa] py-4 px-6 text-base">{booking.service}</TableCell>
                        <TableCell className="py-4 px-6">
                          <span className={`px-4 py-2 rounded-full font-semibold text-base shadow ${
                            booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'paid'
                              ? 'bg-blue-100 text-blue-800'
                              : booking.status === 'rejected'
                              ? 'bg-red-700 text-white'
                              : booking.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-500 text-white'
                          }`}>{booking.status}</span>
                        </TableCell>
                        <TableCell className="text-gray-700 py-4 px-6 text-base">{new Date(booking.created).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </RequireAuth>
  )
}

export default Page
