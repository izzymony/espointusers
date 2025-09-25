"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import Loader from "../components/Loading";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RequireAuth from "../components/RequireAuth";

import Foot from "../components/Foot";
import Link from "next/link"

interface Service {
  service_id: string;
  service_name: string;
  status: string;
  images: string[];
}

const featuredServiceIds = ["service1", "service2", "service3"]; // Example featured service IDs

const ServicePage = () => {
  const [error, setError] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("https://espoint.onrender.com/espoint/get_all_pub_service?limit=5")
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

  // Filter featured services for carousel
  const featuredServices = services.filter((s) =>
    featuredServiceIds.includes(s.service_id)
  );

  // Service categories example
  const serviceCategories = [
    {
      id: "cat1",
      name: "Home Services",
      description: "Cleaning, repairs, and maintenance",
      icon: "/icons/home-services.svg",
    },
    {
      id: "cat2",
      name: "Events & Photography",
      description: "Capture your moments and organize events",
      icon: "/icons/events.svg",
    },
    {
      id: "cat3",
      name: "Wellness & Beauty",
      description: "Spa, fitness, and personal care",
      icon: "/icons/wellness.svg",
    },
    {
      id: "cat4",
      name: "Education & Tutoring",
      description: "Learn new skills and get expert help",
      icon: "/icons/education.svg",
    },
  ];

  return (
    <RequireAuth>
      <div className="bg-white text-gray-800 mt-14 opacity-5">
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
          aria-label="Hero section with main headline and call to action"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#7464fa]/90"></div>

          {/* Content Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full max-w-6xl mx-auto text-white">
            {/* Left - Text */}
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold leading-snug">
                Empowering Your Needs with{" "}
                <span className="text-black">
                  ESTrans <span className="text-white">Pro</span>
                </span>
              </h1>
              <p className="text-lg sm:text-xl">
                Over <span className="font-semibold">10,000+</span> services
                booked. Find trusted providers, book instantly, and enjoy
                tailored experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                
                <button
                  onClick={() => router.push("/services")}
                  className="px-6 py-3 border border-white rounded-full font-medium shadow hover:bg-white hover:text-[#7464fa] transition"
                  aria-label="Explore available services"
                >
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
                  alt="Illustration showing various services"
                  width={800}
                  height={599}
                  className="rounded-lg object-contain w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        {/* How It Works */}
        <section
          className="py-20 px-6 bg-gray-50"
          aria-labelledby="how-it-works-title"
        >
          <h2
            id="how-it-works-title"
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            How It <span className="text-[#7464fa]">Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
            {[
              {
                title: "1. Pick a Service",
                desc: "Browse categories and choose what suits your needs.",
                img: "/undraw_select_u1sa.svg",
                alt: "Select a service illustration",
              },
              {
                title: "2. Book Instantly",
                desc: "Secure your booking with instant confirmation.",
                img: "/undraw_booking_1ztt.svg",
                alt: "Booking confirmation illustration",
              },
              {
                title: "3. Enjoy Experience",
                desc: "Sit back and let our providers deliver top-notch service.",
                img: "/undraw_services_dhxj.svg",
                alt: "Enjoying service illustration",
              },
            ].map((step, i) => (
              <article
                key={i}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
                tabIndex={0}
                aria-label={step.title}
              >
                <Image
                  src={step.img}
                  alt={step.alt}
                  width={200}
                  height={200}
                  className="mb-4"
                  loading="lazy"
                />
                <h3 className="font-semibold text-xl text-[#7464fa] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Service Categories */}
       {/*  <section
          className="py-16 px-6 max-w-6xl mx-auto"
          aria-labelledby="service-categories-title"
        >
          <h2
            id="service-categories-title"
            className="text-4xl font-bold mb-10 text-center text-gray-900"
          >
            Explore by <span className="text-[#7464fa]">Categories</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {serviceCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push(`/services?category=${cat.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") router.push(`/services?category=${cat.id}`);
                }}
                aria-label={`Explore ${cat.name} services`}
              >
                <Image
                  src={cat.icon}
                  alt={`${cat.name} icon`}
                  width={80}
                  height={80}
                  className="mb-4"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold text-[#7464fa] mb-2">
                  {cat.name}
                </h3>
                <p className="text-gray-600 text-center">{cat.description}</p>
              </div>
            ))}
          </div>
        </section>
 */}
        {/* Featured Services Carousel */}
        {featuredServices.length > 0 && (
          <section
            className="py-16 px-6 bg-[#f5f6ff]"
            aria-labelledby="featured-services-title"
          >
            <h2
              id="featured-services-title"
              className="text-4xl font-bold mb-10 text-center text-gray-900"
            >
              Featured <span className="text-[#7464fa]">Services</span>
            </h2>
            <div className="flex overflow-x-auto gap-6 max-w-6xl mx-auto px-2 scrollbar-thin scrollbar-thumb-[#7464fa]/60 scrollbar-track-gray-200">
              {featuredServices.map((service) => (
                <article
                  key={service.service_id}
                  className="min-w-[280px] bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() =>
                    router.push(`/services/${service.service_id}/content`)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      router.push(`/services/${service.service_id}/content`);
                  }}
                  aria-label={`View details for ${service.service_name}`}
                >
                  <Image
                    src={
                      Array.isArray(service.images) && service.images.length > 0
                        ? service.images[0]
                        : "/camera-5113699_1280.jpg"
                    }
                    alt={service.service_name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {service.service_name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      Book premium services from trusted providers with ease.
                    </p>
                    <button
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-[#7464fa] hover:bg-[#5d4ce0] transition-colors"
                      aria-label={`Explore ${service.service_name}`}
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Services Grid */}
        <section className="px-6 py-16" aria-labelledby="all-services-title">
          <h2
            id="all-services-title"
            className="text-4xl font-bold mb-8 text-center text-gray-900"
          >
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
                  <article
                    key={service.service_id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                    tabIndex={0}
                    aria-label={`Service: ${service.service_name}, status: ${service.status}`}
                    onClick={() =>
                      router.push(`/services/${service.service_id}/content`)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        router.push(`/services/${service.service_id}/content`);
                    }}
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
                      loading="lazy"
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
                        aria-label={`Explore ${service.service_name}`}
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-center text-gray-500">No services found.</p>
              )}
            </div>
          )}
          <div className="flex justify-center items-center mt-5 align-center">
          <button className=" p-3 text-[#7464fa] w-[300px] mt-1 rounded-full border-2 bg-white border-2 border-[#7464fa] " onClick={() => router.push('/all_services')}>
            Browse more
          </button>
          </div>
        </section>

        {/* Testimonials */}
        <section
          className="bg-gray-50 py-20 px-6"
          aria-labelledby="testimonials-title"
        >
          <h2
            id="testimonials-title"
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            What Our Clients Say
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                review:
                  "ESTransPro made my wedding planning stress-free. Highly recommend!",
                photo: "/clients/sarah-johnson.jpg",
                alt: "Photo of Sarah Johnson",
              },
              {
                name: "David Kim",
                review:
                  "Amazing service! Booked a photoshoot and the quality was top-notch.",
                photo: "/clients/david-kim.jpg",
                alt: "Photo of David Kim",
              },
              {
                name: "Maria Lopez",
                review:
                  "The platform is easy to use and the providers are very professional.",
                photo: "/clients/maria-lopez.jpg",
                alt: "Photo of Maria Lopez",
              },
            ].map((t, i) => (
              <article
                key={i}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
                tabIndex={0}
                aria-label={`Testimonial from ${t.name}`}
              >
                <Image
                  src={t.photo}
                  alt={t.alt}
                  width={80}
                  height={80}
                  className="rounded-full mb-4 object-cover"
                  loading="lazy"
                />
                <p className="text-gray-600 mb-4 italic">“{t.review}”</p>
                <p className="font-semibold text-[#7464fa]">{t.name}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section
          className="py-20 px-6 max-w-6xl mx-auto grid gap-10 md:grid-cols-3 text-center"
          aria-label="Platform features"
        >
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

        {/* Call to Action */}
                {/* Call to Action */}
        <section
          className="bg-[#7464fa] text-white py-16 px-6 text-center rounded-lg max-w-6xl mx-auto mb-20"
          aria-label="Call to action"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to <span className="underline decoration-yellow-400">transform</span> your experience?
          </h2>
          <p className="mb-8 max-w-xl mx-auto text-lg">
            Join thousands of satisfied customers who trust ESTransPro for their service needs. Start your journey today!
          </p>
          <button
            onClick={() => router.push("/services")}
            className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition"
            aria-label="Get started with ESTransPro"
          >
            Browse
          </button>
        </section>

        {/* Footer */}
       <Foot/>
      </div>
    </RequireAuth>
  );
};

export default ServicePage;