'use client'
import React, { useEffect, useState } from 'react'
import Nav from "../components/Nav";
import { useRouter } from "next/navigation"
import Image from "next/image";
import Foot from "../components/Foot"
import { ArrowRight } from 'lucide-react';
import Loader from '../components/Loading';

interface Service {
  service_id: string;
  service_name: string;
  status: string;
  images?: string[];
}

const Page = () => {
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
    <div className="bg-white min-h-screen flex flex-col">
      <Nav />

      {/* Hero Section */}
      <header className="px-6 md:px-12 lg:px-20 py-16 mt-10 bg-gradient-to-b from-white to-gray-50">
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-7xl mx-auto">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="font-bold text-3xl sm:text-4xl  md:text-5xl lg:text-6xl leading-tight text-gray-900">
              Choose from <span className="text-[#7464fa]">varieties of services</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
  Discover top-quality services tailored to your needs. From everyday essentials to specialized solutions, our platform connects you with trusted providers who deliver reliability, convenience, and value. Whether you’re looking for personal assistance, professional expertise, or unique offerings, we make it simple and seamless to find the right service at the right time.
</p>

          </div>
          <div className="md:w-1/2">
            <Image
              src="/undraw_services_dhxj.svg"
              alt="Services illustration"
              width={450}
              height={450}
              className="rounded-2xl shadow-xl object-contain mx-auto w-full"
              priority
            />
          </div>
        </div>
      </header>

      {/* Services Section */}
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
                
              </section>
      
      <Foot />
    </div>
  )
}

export default Page;
