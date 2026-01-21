'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/app/components/Nav'
import Foot from '@/app/components/Foot'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import RequireAuth from '../components/RequireAuth'
import Image from 'next/image'
import { ClipboardList, Filter, Calendar, Clock, ChevronRight, ArrowRight, Star, Search, CheckCircle } from 'lucide-react'

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
    const url = `https://espoint-5shr.onrender.com/espoint/get_user_booking/${username}/${status}`;

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

  // Helper function to get status badge classes (Updated for Premium Theme)
  const getStatusBadgeClasses = (status: string) => {
    const baseClasses = 'px-5 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-sm flex items-center gap-2 w-fit';
    if (status === 'pending') return `${baseClasses} bg-amber-500/10 text-amber-600 border border-amber-500/20`;
    if (status === 'confirmed' || status === 'completed') return `${baseClasses} bg-emerald-500/10 text-emerald-600 border border-emerald-500/20`;
    if (status === 'paid') return `${baseClasses} bg-blue-500/10 text-blue-600 border border-blue-500/20`;
    if (status === 'rejected') return `${baseClasses} bg-rose-500/10 text-rose-600 border border-rose-500/20`;
    return `${baseClasses} bg-gray-500/10 text-gray-600 border border-gray-500/20`;
  };

  return (
    /* <RequireAuth> */
    <div className="bg-white min-h-screen flex flex-col text-[#050505]">
      <Nav />

      {/* Premium Branded Hero - "The Ledger" */}
      <header className="relative min-h-[500px] flex items-center px-6 sm:px-12 bg-[#050505] overflow-hidden mt-16">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="space-y-8 max-w-3xl animate-in fade-in slide-in-from-left duration-1000">
              <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black">
                <span className="w-12 h-[1px] bg-primary/50"></span>
                Personal Ledger
              </div>

              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] text-white">
                Manage Your <br />
                <span className="text-primary italic font-serif">Booking Ecosystem</span>
              </h1>

              <p className="text-xl text-white/50 font-light leading-relaxed max-w-xl">
                Track and manage your professional service engagements through the <span className="text-white font-medium italic">ESPOINT Ledger</span>. Real-time updates and historical records.
              </p>

              <div className="flex items-center gap-10 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-white">{bookings.length}</span>
                  <span className="text-[10px] text-primary uppercase tracking-widest font-black">Active Records</span>
                </div>
                <div className="w-[1px] h-12 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-1">Standard</span>
                  <span className="text-sm font-black text-white/50 uppercase">Secured by Pro</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] shadow-2xl animate-float">
                <div className="bg-primary p-6 rounded-[28px] w-fit mb-8 text-black shadow-primary/20 shadow-2xl">
                  <ClipboardList className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <div className="text-white font-black text-2xl">Ledger Active</div>
                  <div className="text-white/40 text-[10px] uppercase font-black tracking-widest leading-none">ESPOINT Internal Terminal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Ledger Interface */}
      <main className="flex-1 bg-white relative z-10 px-6 sm:px-12 py-24 -mt-12 rounded-t-[60px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-gray-900 flex items-center gap-4">
                <div className="w-2 h-10 bg-primary rounded-full"></div>
                Management Dashboard
              </h2>
              <p className="text-gray-500 font-light">Filter and audit your service acquisitions</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Status Selector */}
              <div className="relative group min-w-[240px]">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary group-hover:scale-110 transition-transform">
                  <Filter className="w-5 h-5" />
                </div>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className="w-full pl-16 pr-10 py-5 bg-gray-50 border border-gray-100 rounded-[28px] text-sm font-black uppercase tracking-widest text-gray-900 appearance-none focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer hover:bg-white hover:border-primary/30 shadow-sm"
                >
                  <option value="pending">Records: Pending</option>
                  <option value="paid">Records: Paid</option>
                  <option value="confirmed">Records: Confirmed</option>
                  <option value="completed">Records: Completed</option>
                  <option value="rejected">Records: Rejected</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-5 h-5 text-gray-300 transform rotate-90" />
                </div>
              </div>
            </div>
          </div>

          {/* Loading & Error States */}
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center gap-6 animate-pulse">
              <div className="w-20 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-primary animate-[shimmer_2s_infinite]"></div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Synchronizing Ledger...</span>
            </div>
          )}

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-500 p-10 rounded-[40px] text-center font-bold shadow-sm max-w-2xl mx-auto">
              <div className="bg-rose-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6">!</div>
              {error}
            </div>
          )}

          {/* Bookings Table - "The Ledger Grid" */}
          {!loading && !error && (
            bookings.length === 0 ? (
              <div className="py-40 text-center bg-gray-50/50 rounded-[60px] border-4 border-dashed border-gray-100/50">
                <div className="bg-white p-8 rounded-[40px] w-fit mx-auto mb-10 shadow-2xl shadow-gray-200/50 text-gray-200">
                  <Search className="w-20 h-20" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4">No Records Found</h3>
                <p className="text-gray-400 font-light max-w-md mx-auto italic">Our central processing unit could not find any {status} bookings associated with your profile.</p>
              </div>
            ) : (
              <article className="overflow-hidden rounded-[48px] bg-white border border-gray-100 shadow-2xl shadow-gray-100 relative">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-900/5 border-none">
                        <TableHead className="py-8 px-10 text-left text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                          Ecosystem ID
                        </TableHead>
                        <TableHead className="py-8 px-10 text-left text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                          Product / Service
                        </TableHead>
                        <TableHead className="py-8 px-10 text-left text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                          Ledger Status
                        </TableHead>
                        <TableHead className="py-8 px-10 text-left text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                          Timestamp
                        </TableHead>
                        <TableHead className="py-8 px-10 text-right text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                          Audit
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow
                          key={booking.booking_id}
                          className="group hover:bg-gray-50 cursor-pointer transition-all duration-500 border-gray-50"
                          onClick={() => router.push(`/bookings/${booking.booking_id}`)}
                        >
                          <TableCell className="py-10 px-10 font-mono text-sm text-gray-400 group-hover:text-gray-900 transition-colors">
                            {booking.booking_id}
                          </TableCell>
                          <TableCell className="py-10 px-10">
                            <div className="flex flex-col">
                              <span className="text-xl font-black text-gray-900 tracking-tight group-hover:text-primary transition-colors">
                                {booking.service}
                              </span>
                              <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest mt-1">Official ESPOINT Delivery</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-10 px-10">
                            <span className={getStatusBadgeClasses(booking.status)}>
                              <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                              {booking.status}
                            </span>
                          </TableCell>
                          <TableCell className="py-10 px-10">
                            <div className="flex items-center gap-3 text-gray-500">
                              <Calendar className="w-4 h-4 text-gray-300" />
                              <span className="text-sm font-medium">{new Date(booking.created).toLocaleDateString()}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-10 px-10 text-right">
                            <div className="bg-gray-900 text-white p-4 rounded-2xl inline-flex group-hover:bg-primary group-hover:text-black transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-black/10">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Visual Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </article>
            )
          )}

          {/* Mobile Scroll Hint */}
          <div className="mt-12 text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] sm:hidden flex items-center justify-center gap-6">
            <span className="w-12 h-[1px] bg-gray-100"></span>
            Swipe to Explore
            <span className="w-12 h-[1px] bg-gray-100"></span>
          </div>
        </div>
      </main>


      <Foot />
    </div>
    /* </RequireAuth> */
  );
};

export default Page