"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/app/components/Loading";
import Nav from "@/app/components/Nav";
import Image from "next/image";
import { Clock2 } from "lucide-react";

interface RentalItem {
  item: string;
  quantity: number;
  duration_hours: number;
}

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
    1: RentalItem;
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
  username?: string;
}

interface BookingApiResponse {
  msg:
  | string
  | {
    message?: string;
    booking_id?: string;
  };
}

const ContentDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const content_id = params?.contentid as string;
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const [content, setContent] = useState<ServiceContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    client_name: "",
    client_email: "",
    client_phone: "",
    service_date: "",
    service_time: "",
    notes: "",

    preferred_staff_id: "",
    status: "pending",
  });

  const extractAllImages = (item: ServiceContent | null): string[] => {
    const fallback = '/camera-431119_1280.jpg';
    if (!item) return [fallback];

    const getDeepValue = (obj: Record<string, unknown>, path: string): unknown => {
      return path.split('.').reduce((acc, part) => {
        if (acc && typeof acc === 'object') {
          return (acc as Record<string, unknown>)[part];
        }
        return undefined;
      }, obj as unknown);
    };

    const potentialPaths = [
      'store.branding.logo_url',
      'branding.logo_url',
      'store.logo_url',
      'logo_url',
      'store.branding.images',
      'branding.images',
      'images',
      'image'
    ];

    const images: string[] = [];

    for (const path of potentialPaths) {
      const val = getDeepValue(item as unknown as Record<string, unknown>, path);
      if (!val) continue;

      const items = Array.isArray(val) ? val : [val];
      items.forEach((v: unknown) => {
        if (typeof v === 'string') {
          if (v && !v.startsWith('blob:')) images.push(v);
        } else if (v && typeof v === 'object') {
          const imgObj = v as Record<string, unknown>;
          const src = (imgObj.url || imgObj.logo_url || imgObj.image_url || imgObj.src) as string | undefined;
          if (src && typeof src === 'string' && !src.startsWith('blob:')) {
            images.push(src);
          }
        }
      });

      if (images.length > 0) break;
    }

    if (images.length === 0) {
      // Safe access using unknown to avoiding strict type checks against the interface
      // while avoiding 'any' which triggers the lint rule.
      const itemRecord = item as unknown as Record<string, unknown>;
      const storeRecord = itemRecord.store as Record<string, unknown> | undefined;
      const brandingRecord = itemRecord.branding as Record<string, unknown> | undefined;

      const storeBrandingLogo = (storeRecord?.branding as Record<string, unknown> | undefined)?.logo_url;
      const directBrandingLogo = brandingRecord?.logo_url;

      const backup = (Array.isArray(storeBrandingLogo) ? storeBrandingLogo[0] : undefined) ||
        (Array.isArray(directBrandingLogo) ? directBrandingLogo[0] : undefined);

      return backup ? [backup as string] : [fallback];
    }

    return images;
  };

  const formatTo12Hour = (timeStr: string) => {
    if (!timeStr) return "";
    try {
      const [hourStr, minuteStr] = timeStr.split(":");
      let hour = parseInt(hourStr, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      return `${hour}:${minuteStr} ${ampm}`;
    } catch (e) {
      return timeStr;
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser?.username) {
      setFormData((prev) => ({
        ...prev,
        username: storedUser.username,
      }));
    }
  }, []);

  useEffect(() => {
    if (!content_id) return;
    setLoading(true);
    setError("");

    fetch(`https://espoint-5shr.onrender.com/espoint/get_content/${content_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch content details");
        return res.json();
      })
      .then((data: { msg: ServiceContent }) => {
        if (data.msg) setContent(data.msg);
      })
      .catch((err: Error) => setError(err.message))
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

  // ✅ booking handler
  const handleSubmitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingSuccess("");
    setBookingError("");

    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (!storedUser?.username) {
        setBookingError("You must be logged in to make a booking");
        return;
      }

      // ✅ calculate price here before sending
      const itemQuantity = content?.store?.rental_items[1]?.quantity || 1; // Default to 1 if 0/missing
      const itemPrice = content?.store?.base_price || 0;
      const totalPrice = itemQuantity * itemPrice;

      const payload = {
        service: content?.service || "",
        service_unit: content?.service_unit || "",
        username: formData.username,
        from: "external",
        data: {
          client_email: formData.client_email,
          service_time: formData.service_time,
          amount: String(totalPrice),
          currency: "SL",
          service_date: formData.service_date,
          client_phone: formData.client_phone,
          client_name: formData.client_name,
          status: "pending",
        },
      };

      console.log("Submitting Booking Payload:", JSON.stringify(payload, null, 2));

      const res = await fetch(
        "https://espoint-5shr.onrender.com/espoint/create_booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      console.log("Booking Response Status:", res.status);

      const contentType = res.headers.get("content-type");
      let data: any = {};

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.log("Booking Raw Text Response:", text);
        data = { msg: text || (res.ok ? "Success" : "No content") };
      }

      console.log("Booking Response Data:", JSON.stringify(data, null, 2));

      let message = "";
      let bookingId = "";

      // 1. Check for booking_id in various locations
      if (data.booking_id) bookingId = String(data.booking_id);
      else if (data.msg?.booking_id) bookingId = String(data.msg.booking_id);
      else if (data.data?.booking_id) bookingId = String(data.data.booking_id);
      else if (typeof data.msg === "string" && data.msg.includes("Booking ID")) {
        bookingId = data.msg.replace("Booking ID ", "").trim();
      }

      // 2. Extract message from various common keys
      const potentialMessage = data.msg || data.message || data.detail || data.error || (res.ok ? "Success" : "Failed");

      if (typeof potentialMessage === "string") {
        message = potentialMessage;
      } else if (typeof potentialMessage === "object") {
        message = JSON.stringify(potentialMessage);
      }

      // 3. Robust Success Check
      if (res.ok || message.toLowerCase().includes("success") || bookingId) {
        setBookingSuccess(bookingId ? `Booking Successful! ID: ${bookingId}` : message || "Booking Successful!");
        setShowModal(false);

        setTimeout(() => {
          router.push("/booked_contents");
        }, 1500);
      } else {
        setBookingError(message || "Booking failed - no error message received from server.");
      }
    } catch (err) {
      console.error("Booking Error:", err);
      if (err instanceof Error) {
        setBookingError(err.message);
      } else {
        setBookingError("Booking failed. Please try again.");
      }
    } finally {
      setBookingLoading(false);
    }
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
  const itemQuantity = store.rental_items?.[1]?.quantity || 1; // Default to 1 if 0/missing
  const itemPrice = store.base_price || 0;
  const totalPrice = itemQuantity * itemPrice;
  const images = extractAllImages(content);
  const fallbackImage = '/camera-431119_1280.jpg';

  return (
    <div className="bg-white min-h-screen ">
      <Nav />
      <div className="container mx-auto px-6 mt-32">
        <main className="max-w-6xl mx-auto space-y-12 pb-20">
          {/* Hero Image Slider */}
          <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 group/slider">
            <div
              ref={sliderRef}
              className="flex w-full h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
            >
              {images.map((src, idx) => (
                <div key={idx} className="min-w-full h-full snap-start relative">
                  <Image
                    src={src}
                    alt={`${store.name} - ${idx + 1}`}
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons - Always Visible */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollSlider('left'); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 z-20 border border-white/10 hover:scale-110 active:scale-95 shadow-2xl"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollSlider('right'); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 z-20 border border-white/10 hover:scale-110 active:scale-95 shadow-2xl"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="absolute top-8 left-8 px-6 py-2 rounded-full bg-primary text-black shadow-xl text-sm font-bold capitalize z-10">
              {store.category}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <h1 className="font-extrabold text-4xl md:text-5xl text-black leading-tight">
                  {store.name}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 text-black text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                    {store.status}
                  </span>
                </div>
              </div>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-black flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  Description
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">{store.description}</p>
              </section>

              {/* Rental items */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-black flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  Rental Items
                </h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <p className="text-sm text-gray-400 font-medium uppercase mb-1">Item Name</p>
                    <p className="font-bold text-black">{store.rental_items?.[1]?.item || 'Not Specified'}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <p className="text-sm text-gray-400 font-medium uppercase mb-1">Quantity</p>
                    <p className="font-bold text-black">{store.rental_items?.[1]?.quantity || 0}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <p className="text-sm text-gray-400 font-medium uppercase mb-1">Duration</p>
                    <p className="font-bold text-black">{store.rental_items?.[1]?.duration_hours || 0} hrs</p>
                  </div>
                </div>
              </section>

              {/* Check-in details */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-black flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  Service Hours
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <div className="bg-primary/20 p-3 rounded-2xl">
                      <Clock2 className="text-black w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium uppercase">Starts at</p>
                      <p className="font-bold text-black">{formatTo12Hour(store.service_hours.start)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <div className="bg-primary/20 p-3 rounded-2xl">
                      <Clock2 className="text-black w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium uppercase">Ends at</p>
                      <p className="font-bold text-black">{formatTo12Hour(store.service_hours.end)}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Pricing Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl p-8 space-y-8">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">Base Price</p>
                    <p className="font-extrabold text-4xl text-black">
                      SL {store.base_price.toLocaleString()}
                      <span className="text-base text-gray-400 font-medium ml-2 uppercase">/ item</span>
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-gray-50">
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-gray-500">Total Items</span>
                      <span className="font-bold text-black">{itemQuantity}</span>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-extrabold text-black pt-4">
                      <span>Total Price</span>
                      <span className="text-primary">SL {totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Summary Table Table */}
                  <div className="overflow-hidden rounded-2xl border border-gray-50">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-400 font-bold uppercase tracking-tighter">
                        <tr>
                          <th className="py-3 px-4 text-left">Item</th>
                          <th className="py-3 px-4 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-black border-t border-gray-50">
                          <td className="py-4 px-4 font-medium">{store.rental_items?.[1]?.item || 'Base Service'}</td>
                          <td className="py-4 px-4 text-right font-bold">SL {totalPrice.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <button
                    className="bg-primary text-black font-extrabold rounded-2xl px-6 py-5 w-full shadow-lg shadow-primary/20 hover:bg-black hover:text-white transition-all duration-300 transform active:scale-[0.98]"
                    onClick={() => setShowModal(true)}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 w-full max-w-lg max-h-[90vh] overflow-y-auto relative border border-gray-100">
            <button
              className="absolute top-6 right-8 text-gray-400 hover:text-red-500 transition-colors text-3xl font-light"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-black">
                Confirm <span className="text-primary">Booking</span>
              </h2>
              <p className="text-gray-500 mt-2 font-medium">Please provide your details to proceed</p>
            </div>

            <form
              onSubmit={handleSubmitBooking}
              className="space-y-5"
            >
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                <input
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleFormChange}
                  className="w-full bg-gray-50 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 transition-all outline-none font-medium"
                  placeholder="Your Full Name"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                  <input
                    type="email"
                    name="client_email"
                    value={formData.client_email}
                    onChange={handleFormChange}
                    className="w-full bg-gray-50 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 transition-all outline-none font-medium"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Phone</label>
                  <input
                    name="client_phone"
                    value={formData.client_phone}
                    onChange={handleFormChange}
                    className="w-full bg-gray-50 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 transition-all outline-none font-medium"
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Service Date</label>
                  <input
                    type="date"
                    name="service_date"
                    value={formData.service_date}
                    onChange={handleFormChange}
                    className="w-full bg-gray-50 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 transition-all outline-none font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Service Time</label>
                  <input
                    type="time"
                    name="service_time"
                    value={formData.service_time}
                    onChange={handleFormChange}
                    className="w-full bg-gray-50 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 transition-all outline-none font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleFormChange}
                  className="w-full bg-gray-50 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 transition-all outline-none font-medium"
                  placeholder="Username"
                  required
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="bg-primary text-black font-extrabold rounded-2xl py-5 w-full shadow-lg shadow-primary/20 hover:bg-black hover:text-white transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin h-5 w-5 border-t-2 border-black rounded-full" />
                      Processing...
                    </span>
                  ) : "Complete Secure Booking"}
                </button>
              </div>
            </form>

            {bookingSuccess && (
              <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-2xl">
                <p className="text-green-700 font-bold text-center text-sm">
                  ✓ {bookingSuccess}
                </p>
              </div>
            )}
            {bookingError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                <p className="text-red-700 font-bold text-center text-sm">
                  ✕ {bookingError}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDetails;
