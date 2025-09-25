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
  booking_code: string;
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
    booking_code: "",
    preferred_staff_id: "",
    status: "pending",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser?.username) {
      setFormData((prev) => ({ ...prev, username: storedUser.username }));
    }
  }, []);

  useEffect(() => {
    if (!content_id) return;
    setLoading(true);
    setError("");

    fetch(`https://espoint.onrender.com/espoint/get_content/${content_id}`)
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
      const itemQuantity = content?.store?.rental_items[1]?.quantity || 0;
      const itemPrice = content?.store?.base_price || 0;
      const totalPrice = itemQuantity * itemPrice;

      const payload = {
        service: content?.service || "",
        service_unit: content?.service_unit || "",
        username: formData.username,
        from: "internal",
        data: {
          client_email: formData.client_email,
          preferred_staff_id: formData.preferred_staff_id,
          notes: formData.notes,
          service_time: formData.service_time,
          amount: String(totalPrice),
          currency: "NGN",
          service_date: formData.service_date,
          client_phone: formData.client_phone,
          client_name: formData.client_name,
          status: "pending",
          completed_date: "",
          booking_code: formData.booking_code,
        },
      };

      const res = await fetch(
        "https://espoint.onrender.com/espoint/create_booking_no",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data: BookingApiResponse = await res.json();
      console.log("Create Booking API Response:", data);

      let message = "";
      let bookingId = "";

      if (typeof data.msg === "string") {
        message = data.msg;
        if (message.includes("Booking ID")) {
          bookingId = message.replace("Booking ID ", "");
        }
      } else if (data.msg && typeof data.msg === "object") {
        message = data.msg.message || "";
        bookingId = data.msg.booking_id || "";
      }

      // ✅ Success check
      if (message.toLowerCase().includes("success") || bookingId) {
        setBookingSuccess(message || "Booking successful!");
        setShowModal(false);

        setTimeout(() => {
          router.push("/booked_contents");
        }, 1200);
      } else {
        setBookingError(message || "Booking failed.");
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
      <div className="mt-20 flex h-[100vh] justify-center items-center opacity-3">
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
    <div className="bg-white min-h-screen opacity-5">
      <Nav />
      <div className="container mx-auto px-4 mt-24">
        <main className="space-y-10">
          {/* Hero image */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-md">
            <Image
              src={store.branding.logo_url[0] || "/camera-431119_1280.jpg"}
              alt={store.name}
              width={1200}
              height={600}
              className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover"
              priority
            />
            <div className="absolute top-4 left-4 px-4 py-1 rounded-full bg-[#7464fa] text-white shadow-lg text-sm sm:text-base capitalize">
              {store.category}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <h1 className="font-bold text-3xl text-black">{store.name}</h1>
            <section>
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">
                Description
              </h2>
              <p className="text-gray-600">{store.description}</p>
            </section>

            {/* Rental items */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">
                Rental Items
              </h2>
              <div className="grid gap-3 mt-3 text-gray-700">
                <p>
                  <span className="font-semibold text-[#7464fa]">Item:</span>{" "}
                  {store.rental_items[1].item}
                </p>
                <p>
                  <span className="font-semibold text-[#7464fa]">
                    Quantity:
                  </span>{" "}
                  {store.rental_items[1].quantity}
                </p>
                <p>
                  <span className="font-semibold text-[#7464fa]">
                    Duration:
                  </span>{" "}
                  {store.rental_items[1].duration_hours} hrs
                </p>
              </div>
            </section>

            {/* Check-in details */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">
                Check-in Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 mt-3">
                <div>
                  <p className="font-medium">Start</p>
                  <div className="flex gap-2 items-center mt-1">
                    <Clock2 className="text-[#7464fa]" />
                    <span>{store.service_hours.start} AM</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium">End</p>
                  <div className="flex gap-2 items-center mt-1">
                    <Clock2 className="text-[#7464fa]" />
                    <span>{store.service_hours.end} PM</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing + Booking */}
            <div className="bg-[#f5f3ff] border rounded-xl shadow-md p-6 space-y-6">
              <p className="font-bold text-2xl text-[#7464fa]">
                ₦{store.base_price}{" "}
                <span className="text-base text-gray-500 font-normal">
                  (per item)
                </span>
              </p>
              <div className="space-y-2">
                <p className="text-lg">
                  Total Items:{" "}
                  <span className="text-[#7464fa] font-semibold">
                    {itemQuantity}
                  </span>
                </p>
                <p className="text-lg">
                  Total Price:{" "}
                  <span className="text-[#7464fa] font-semibold">
                    ₦{totalPrice}
                  </span>
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="py-2 px-3 text-left">Item</th>
                      <th className="py-2 px-3 text-left">Unit Price</th>
                      <th className="py-2 px-3 text-left">Quantity</th>
                      <th className="py-2 px-3 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-3">
                        {store.rental_items[1].item}
                      </td>
                      <td className="py-2 px-3">₦{store.base_price}</td>
                      <td className="py-2 px-3">
                        {store.rental_items[1].quantity}
                      </td>
                      <td className="py-2 px-3 font-bold text-[#7464fa]">
                        ₦
                        {store.base_price * store.rental_items[1].quantity}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-[#7464fa] text-white font-semibold rounded-lg px-6 py-3 w-full sm:w-auto disabled:opacity-60 hover:bg-[#5c4ddf] transition-colors"
                  onClick={() => setShowModal(true)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pt-20 pb-20 bg-black/50 overflow-auto">
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 w-[95%] max-w-lg max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Complete Your Booking
            </h2>
            <form
              onSubmit={handleSubmitBooking}
              className="flex flex-col gap-4 text-gray-700"
            >
              <input
                name="client_name"
                value={formData.client_name}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 w-full"
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                name="client_email"
                value={formData.client_email}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 w-full"
                placeholder="Email"
                required
              />
              <input
                name="client_phone"
                value={formData.client_phone}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 w-full"
                placeholder="Phone"
                required
              />
              <input
                type="date"
                name="service_date"
                value={formData.service_date}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="time"
                name="service_time"
                value={formData.service_time}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="text"
                name="booking_code"
                value={formData.booking_code}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 w-full"
                placeholder="Booking code (optional)"
              />
              <input
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 w-full"
                placeholder="Username"
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="pending">Pending</option>
              </select>

              <button
                type="submit"
                className="bg-[#7464fa] text-white font-bold rounded-lg py-2 mt-2 w-full disabled:opacity-60 hover:bg-[#5c4ddf] transition-colors"
                disabled={bookingLoading}
              >
                {bookingLoading ? "Booking..." : "Submit Booking"}
              </button>
            </form>
            {bookingSuccess && (
              <p className="text-green-600 font-semibold mt-4 text-center">
                {bookingSuccess}
              </p>
            )}
            {bookingError && (
              <p className="text-red-600 font-semibold mt-4 text-center">
                {bookingError}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDetails;
