"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import Loader from "../components/Loading";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RequireAuth from "../components/RequireAuth";

interface Service {
  service_id: string;
  service_name: string;
  status: string;
  images: string[];
}

const ServicePage = () => {
  const [error, setError] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("https://espoint.onrender.com/espoint/get_all_pub_service")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.msg)) {
          setServices(data.msg);
        } else {
          setServices([]);
        }
      })
      .catch((err) => setError(err.message || "Error fetching services"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <RequireAuth>
      <div className="bg-white text-gray-800 mt-14">
        {/* Navbar */}
        <Nav />

        {/* Hero Section */}
        <header
          className="relative h-[700px] flex items-center px-6 sm:px-12"
          style={{
            backgroundImage: "url('/zeiterfassung-4703485_1280.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#7464fa]/90"></div>

          {/* Content Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full max-w-6xl mx-auto text-white">
            {/* Left - Text */}
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold leading-snug">
                Empowering Your Needs with{" "}
                <span className="text-black">ESTrans <span className="text-white">Pro</span></span>
              </h1>
              <p className="text-lg sm:text-xl">
                Over <span className="font-semibold">10,000+</span> services
                booked. Find trusted providers, book instantly, and enjoy
                tailored experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-6 py-3 bg-white text-[#7464fa] font-medium rounded-full shadow hover:bg-gray-100 transition">
                  Get Started
                </button>
                <button className="px-6 py-3 border border-white rounded-full font-medium shadow hover:bg-white hover:text-[#7464fa] transition">
                  Explore Services
                </button>
              </div>
            </div>

            {/* Right - Animated Illustration */}
            <div className="relative flex justify-center md:justify-end">
              <div className="absolute bottom-0 w-64 h-10 bg-black/30 blur-2xl rounded-full"></div>
              <div className="relative bg-white rounded-xl shadow-2xl p-4 animate-bounce-slow w-[90%] sm:w-[70%] max-w-md">
                <Image
                  src="/undraw_services_dhxj.svg"
                  alt="Services illustration"
                  width={800}
                  height={599}
                  className="rounded-lg object-contain w-full"
                />
              </div>
            </div>
          </div>
        </header>

        {/* How It Works */}
        <section className="py-20 px-6 bg-gray-50">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How It <span className="text-[#7464fa]">Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
            {[
              {
                title: "1. Pick a Service",
                desc: "Browse categories and choose what suits your needs.",
                img: "/undraw_select_u1sa.svg"
              },
              {
                title: "2. Book Instantly",
                desc: "Secure your booking with instant confirmation.",
                img: "/undraw_booking_1ztt.svg",
              },
              {
                title: "3. Enjoy Experience",
                desc: "Sit back and let our providers deliver top-notch service.",
                img: "/undraw_services_dhxj.svg",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
              >
                <Image
                  src={step.img}
                  alt={step.title}
                  width={200}
                  height={200}
                  className="mb-4"
                />
                <h3 className="font-semibold text-xl text-[#7464fa] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-6 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Explore Our <span className="text-[#7464fa]">Services</span>
          </h2>

          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {services.length > 0 ? (
                services.map((service) => (
                  <div
                    key={service.service_id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                  >
                    {/* Image */}
                    <Image
                      src={
                        Array.isArray(service.images) &&
                        service.images.length > 0
                          ? service.images[0]
                          : "/camera-5113699_1280.jpg"
                      }
                      alt={service.service_name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-xl text-gray-900">
                          {service.service_name}
                        </h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            service.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {service.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-yellow-500 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                        <span className="text-xs text-gray-500 ml-2">
                          120+ bookings
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">
                        Book premium services from trusted providers with ease.
                      </p>

                      <button
                        onClick={() =>
                          router.push(
                            `/services/${service.service_id}/content`
                          )
                        }
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-[#7464fa] hover:bg-[#5d4ce0] transition-colors"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No services found.</p>
              )}
            </div>
          )}
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-20 px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Clients Say
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                review:
                  "ESTransPro made my wedding planning stress-free. Highly recommend!",
              },
              {
                name: "David Kim",
                review:
                  "Amazing service! Booked a photoshoot and the quality was top-notch.",
              },
              {
                name: "Maria Lopez",
                review:
                  "The platform is easy to use and the providers are very professional.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <p className="text-gray-600 mb-4">“{t.review}”</p>
                <p className="font-semibold text-[#7464fa]">{t.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 max-w-6xl mx-auto grid gap-10 md:grid-cols-3 text-center">
          <div>
            <h3 className="text-xl font-semibold text-[#7464fa]">
              Easy Booking
            </h3>
            <p className="text-gray-600 mt-2">
              Book your services in just a few clicks with our intuitive
              platform.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#7464fa]">
              Reliable Providers
            </h3>
            <p className="text-gray-600 mt-2">
              We connect you with trusted and verified service providers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#7464fa]">
              24/7 Support
            </h3>
            <p className="text-gray-600 mt-2">
              Our support team is available anytime to assist you with your
              needs.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#7464fa] text-white py-16 px-6">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold mb-3">ESTransPro</h3>
              <p className="text-sm text-gray-100">
                Delivering quality services with a modern and user-friendly
                experience. Your satisfaction is our priority.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>Home</li>
                <li>Services</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Stay Connected</h3>
              <p className="text-sm">Follow us on social media</p>
              <div className="flex gap-4 mt-3">
                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  F
                </span>
                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  T
                </span>
                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  I
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Subscribe</h3>
              <p className="text-sm mb-3">
                Get the latest services and offers directly in your inbox.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-l-lg text-black w-full"
                />
                <button className="px-4 bg-yellow-400 text-black font-semibold rounded-r-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-200 mt-12">
            © {new Date().getFullYear()} ESTransPro. All rights reserved.
          </p>
        </footer>
      </div>
    </RequireAuth>
  );
};

export default ServicePage;
