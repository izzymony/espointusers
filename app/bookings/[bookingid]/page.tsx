"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/app/components/Loading";
import Nav from "@/app/components/Nav";
import Foot from "@/app/components/Foot";
import {
  ClipboardList,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  CheckCircle,
  ArrowLeft,
  MapPin,
  Tag as TagIcon,
  Phone,
  Mail,
  User,
  Hash,
  Download
} from 'lucide-react';

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
  const router = useRouter();
  const bookingId = params?.bookingid as string;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [serviceContent, setServiceContent] = useState<ServiceContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) return;
    setLoading(true);

    fetch(`https://espoint-5shr.onrender.com/espoint/get_booking/${bookingId}`)
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
              `https://espoint-5shr.onrender.com/espoint/get_all_content_based_service_and_status/${unit}/approved`
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

  // Helper function for status styles
  const getStatusStyles = (status: string) => {
    const baseClasses = 'px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-sm flex items-center gap-2 w-fit';
    if (status === 'pending') return {
      className: `${baseClasses} bg-amber-500/10 text-amber-600 border border-amber-500/20`,
      icon: <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
    };
    if (status === 'confirmed' || status === 'completed') return {
      className: `${baseClasses} bg-emerald-500/10 text-emerald-600 border border-emerald-500/20`,
      icon: <CheckCircle className="w-3 h-3" />
    };
    if (status === 'paid') return {
      className: `${baseClasses} bg-blue-500/10 text-blue-600 border border-blue-500/20`,
      icon: <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
    };
    if (status === 'rejected') return {
      className: `${baseClasses} bg-rose-500/10 text-rose-600 border border-rose-500/20`,
      icon: <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
    };
    return {
      className: `${baseClasses} bg-gray-500/10 text-gray-600 border border-gray-500/20`,
      icon: <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
    };
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Invoice_" + (booking?.booking_id?.slice(-6) || "Doc");
    window.print();
    document.title = originalTitle;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#050505]">
        <Loader />
      </div>
    );

  if (error) return (
    <div className="bg-[#050505] min-h-screen flex flex-col items-center justify-center px-6">
      <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-10 rounded-[40px] text-center font-bold shadow-2xl max-w-md w-full backdrop-blur-xl">
        <div className="bg-rose-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl shadow-[0_0_20px_rgba(244,63,94,0.3)]">!</div>
        <p className="text-2xl mb-4 tracking-tighter">System Error</p>
        <p className="text-sm font-light text-rose-400/80 mb-8 leading-relaxed">{error}</p>
        <button onClick={() => window.location.reload()} className="w-full px-8 py-4 bg-rose-500 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-rose-600 transition-all shadow-xl">Retry Connection</button>
      </div>
    </div>
  );

  if (!booking) return <div className="mt-20 text-center text-white">No booking found.</div>;

  const statusStyle = getStatusStyles(booking.status);
  const showInvoiceBtn = booking.status === 'confirmed' || booking.status === 'paid';

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans selection:bg-primary selection:text-black">
      {/* Global Print Styles */}
      <style jsx global>{`
        @media print {
          nav, header, main, footer, .print-hide { 
            display: none !important; 
          }
          .print-show { 
            display: block !important; 
          }
          body {
            background: white !important;
            color: black !important;
          }
          .invoice-container {
            padding: 40px !important;
          }
        }
        .print-show { display: none; }
      `}</style>

      <Nav />

      {/* Premium Hero Header */}
      <header className="relative min-h-[400px] flex items-center px-6 sm:px-12 bg-[#050505] overflow-hidden pt-20">
        {/* Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full pb-20">
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em] group"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to Ledger
          </button>

          <div className="flex flex-col lg:flex-row items-end justify-between gap-10">
            <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
              <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black">
                <span className="w-12 h-[1px] bg-primary/50"></span>
                Transaction Record
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-[1.1]">
                Booking <span className="text-primary italic font-serif">#{booking.booking_id.slice(-6)}</span>
              </h1>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className={`${statusStyle.className} text-sm py-3 px-8 border-2 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]`}>
                  {statusStyle.icon}
                  {booking.status}
                </div>

                {showInvoiceBtn && (
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-3 px-8 py-3 bg-primary text-black rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)] group"
                  >
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    Download Invoice
                  </button>
                )}
              </div>
            </div>

            <div className="hidden lg:block text-right space-y-2 text-white/30">
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">Created On</p>
              <p className="text-xl font-bold text-white tracking-tight">{new Date(booking.created).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="font-mono text-sm">{new Date(booking.created).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Overlap */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-24">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Service & Client Grid */}
          <div className="mt-7 grid lg:grid-cols-3 gap-8">

            {/* Left Column: Service Details (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">

              {/* Service Card */}
              <div className="bg-white  rounded-[40px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradian-to-br from-primary/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Service Acquistion</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Core Details</p>
                  </div>
                </div>

                {serviceContent ? (
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {serviceContent.store.branding.logo_url?.[0] && (
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                        <img
                          src={serviceContent.store.branding.logo_url[0]}
                          alt={serviceContent.store.name}
                          className="w-32 h-32 object-cover rounded-[24px] shadow-lg relative z-10 border-4 border-white"
                        />
                      </div>
                    )}
                    <div className="space-y-4 flex-1">
                      <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{serviceContent.store.name}</h3>
                      <p className="text-gray-500 leading-relaxed font-light">{serviceContent.store.description}</p>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <Tag label={`Category: ${serviceContent.store.category}`} />
                        <Tag label={`Base Rate: SL ${serviceContent.store.base_price}`} />
                        {/* <Tag label={`Duration: ${serviceContent.store.duration_minutes} mins`} /> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-center text-gray-400 italic">
                    Original service content details unavailable.
                  </div>
                )}
              </div>

              {/* Booking Logistics Card */}
              <div className="bg-white rounded-[40px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Service Information</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time & Location</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <InfoBox
                    icon={<Calendar className="w-5 h-5" />}
                    label="Scheduled Date"
                    value={booking.store.service_date}
                  />
                  <InfoBox
                    icon={<Clock className="w-5 h-5" />}
                    label="Time Slot"
                    value={booking.store.service_time}
                  />
                  <InfoBox
                    icon={<MapPin className="w-5 h-5" />}
                    label="Service Unit"
                    value={booking.service_unit}
                    className="sm:col-span-2"
                  />
                  <div className="sm:col-span-2 bg-gray-50 rounded-3xl p-6 border border-gray-100">
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Special Instructions / Notes</span>
                    <p className="text-gray-700 font-medium italic">"{booking.store.notes || "No special instructions provided."}"</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Client & Payment Info (1/3 width) */}
            <div className="space-y-8">

              {/* Client Card */}
              <div className="bg-white rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Client Profile</h2>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Name</p>
                    <p className="text-lg font-bold text-gray-900">{booking.store.client_name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <Mail className="w-3 h-3" /> {booking.store.client_email}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <Phone className="w-3 h-3" /> {booking.store.client_phone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment / Financials */}
              <div className="bg-[#050505] text-white rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[60px] -mr-10 -mt-10"></div>

                <div className="relative z-10">
                  <h2 className="text-lg font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" /> Financial
                  </h2>

                  <div className="space-y-6 border-t border-white/10 pt-6">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-medium text-white/50">Total Amount</span>
                      <span className="text-3xl font-black text-white tracking-tight">
                        <span className="text-lg align-top opacity-50 mr-1">SL</span>
                        {Number(booking.store.amount).toLocaleString()}
                      </span>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-4 flex justify-between items-center border border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Currency</span>
                      <span className="font-mono font-bold text-primary">{booking.store.currency || 'NGN'}</span>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Hash className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Booking Code</span>
                      </div>
                      <div className="font-mono text-xl tracking-widest text-white text-center bg-white/5 py-4 rounded-xl border border-white/10 border-dashed">
                        {booking.store.booking_code || "PENDING"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Printable Invoice Template */}
      <div className="print-show invoice-container bg-white text-black min-h-screen font-sans">
        <div className="flex flex-col items-center border-b-2 border-gray-100 pb-12 mb-12">
          <img src="/espointtower.jpg" alt="Logo" className="w-24 h-24 object-contain mb-8" />
          <h1 className="text-5xl font-black tracking-[0.2em] uppercase text-gray-900">Invoice</h1>
        </div>

        <div className="grid grid-cols-2 gap-20 mb-16 text-sm">
          <div className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b border-primary/20 pb-2">Client Details</h2>
            <div className="space-y-1">
              <p className="text-2xl font-black tracking-tight text-gray-900">{booking.store.client_name}</p>
              <p className="text-gray-600 font-medium">{booking.store.client_email}</p>
              <p className="text-gray-600 font-medium">{booking.store.client_phone}</p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b border-primary/20 pb-2">Transaction ID</h2>
            <div className="space-y-1">
              <p className="text-2xl font-black tracking-tight text-gray-900">#{booking.booking_id.slice(-12)}</p>
              <p className="text-gray-600 font-medium italic">Service: {serviceContent?.store.name || booking.service}</p>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2 px-3 py-1 bg-gray-50 rounded-full w-fit">Status: {booking.status}</p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-900 text-[10px] font-black uppercase tracking-[0.4em] text-gray-900">
                <th className="py-6 text-left">Product / Service</th>
                <th className="py-6 text-left">Schedule</th>
                <th className="py-6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-100">
                <td className="py-10">
                  <div className="space-y-1">
                    <p className="text-xl font-black tracking-tight text-gray-900">{booking.service}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CID: {booking.service_unit}</p>
                  </div>
                </td>
                <td className="py-10">
                  <p className="text-base font-bold text-gray-900">{booking.store.service_date}</p>
                  <p className="text-sm text-gray-400 font-medium">{booking.store.service_time}</p>
                </td>
                <td className="py-10 text-right text-2xl font-black tracking-tighter text-gray-900">
                  SL {Number(booking.store.amount).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-10 border-t-2 border-gray-900">
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center bg-gray-50 p-10 rounded-[32px]">
              <span className="text-lg font-black uppercase tracking-[0.4em] text-gray-900">Total Due</span>
              <span className="text-5xl font-black tracking-tighter text-gray-900">SL {Number(booking.store.amount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="fixed bottom-12 left-0 w-full text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-300">Official ESPOINT Ecosystem Document • Code: {booking.store.booking_code}</p>
        </div>
      </div>

      <Foot />
    </div>
  );
};

// Sub-components for cleaner code
function InfoBox({ label, value, icon, className = "" }: { label: string; value: string; icon: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center gap-2 text-gray-400 mb-1">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
      </div>
      <p className="text-lg font-bold text-gray-900 ml-7">{value}</p>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 bg-primary/5 text-primary-dark rounded-lg text-xs font-bold uppercase tracking-wider border border-primary/10">
      {label}
    </span>
  );
}

export default Page;
