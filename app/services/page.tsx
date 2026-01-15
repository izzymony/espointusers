"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import Loader from "../components/Loading";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Video, ShoppingBag, Package, Globe } from "lucide-react";
import Foot from "../components/Foot";

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
    fetch("https://espoint-5shr.onrender.com/espoint/get_all_pub_service")
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
  /* 
  const featuredServices = services.filter((s) =>
    featuredServiceIds.includes(s.service_id)
  );
  */

  return (
    // <RequireAuth>
    <div className="bg-background text-foreground min-h-screen flex flex-col dark">
      {/* Navbar */}
      <Nav />

      {/* Hero Section */}
      <header
        className="relative min-h-[700px] flex items-center px-6 sm:px-12 bg-[#050505] overflow-hidden pt-20"
        aria-label="Services Hero section"
      >
        {/* Advanced Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main Mesh Gradients */}
          <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] animate-pulse transition-all duration-[10000ms]"></div>
          <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] animate-bounce-slow"></div>
          <div className="absolute -bottom-[20%] left-[20%] w-[70%] h-[70%] bg-primary/5 rounded-full blur-[160px]"></div>

          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

          {/* Animated Light Streaks */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer"></div>
        </div>

        {/* Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000 ease-out">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary text-sm font-semibold rounded-full tracking-wider uppercase">
                Premium Product Ecosystem
              </span>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white">
                <span className="text-primary italic font-serif">ESPOINT</span> <br />
                <span className="text-white/90">Solutions & Products</span>
              </h1>
            </div>

            <p className="text-xl sm:text-2xl text-white/60 max-w-xl leading-relaxed font-light">
              Experience the excellence of <span className="text-white font-medium italic">ESPOINT&apos;s</span> premium product suite. From bespoke multimedia to global sourcing, we deliver <span className="text-white font-medium italic">industrial-grade solutions</span>.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('all-services-title');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-10 py-5 bg-primary text-black font-extrabold rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-primary/40 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Browse Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <div className="flex flex-col justify-center">
                <div className="flex -space-x-3 mb-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                      <Image src={`/camera-5113699_1280.jpg`} alt="User" width={40} height={40} className="object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-primary flex items-center justify-center text-[10px] font-bold text-black">
                    1k+
                  </div>
                </div>
                <p className="text-sm text-white/40 font-medium">Trusted by 1000+ businesses globally</p>
              </div>
            </div>
          </div>

          {/* Right - Visual Asset */}
          <div className="hidden lg:block relative perspective-1000 animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="relative z-10 transform hover:rotate-y-12 transition-transform duration-700">
              {/* Glassmorphism Backdrop */}
              <div className="absolute -inset-4 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-2xl"></div>

              {/* Main SVG Illustration */}
              <div className="relative p-8">
                <Image
                  src="/undraw_services_dhxj.svg"
                  alt="Professional Services Illustration"
                  width={600}
                  height={500}
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>

              {/* Decorative Floating Elements */}
              <div className="absolute -top-12 -right-12 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Top Rated</div>
                    <div className="text-white/40 text-[10px] uppercase font-black tracking-widest">Excellence</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-12 p-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-float">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">99%</span>
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-black">Success</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-[100px] -z-10"></div>
          </div>
        </div>
      </header>

      {/* Categories Section - "ESPOINT Ecosystem" */}
      <section className="py-32 px-6 bg-white text-black relative overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-3 text-primary uppercase tracking-[0.3em] text-[10px] font-black">
                <span className="w-12 h-[1px] bg-primary/50"></span>
                Product Domains
              </div>
              <h2 className="text-6xl font-black tracking-tighter leading-tight">
                Explore the <span className="text-primary italic font-serif">ESPOINT</span> <br />
                Business Ecosystem
              </h2>
              <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl">
                Our services are engineered as discrete product domains, designed to provide comprehensive coverage for your business needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Multimedia", icon: <Video className="w-8 h-8" />, desc: "Visual storytelling and digital media engineering." },
              { name: "Promotion", icon: <ShoppingBag className="w-8 h-8" />, desc: "Strategic product elevation and market presence." },
              { name: "Merchandise", icon: <Package className="w-8 h-8" />, desc: "Custom product development and brand tangibles." },
              { name: "Global Sourcing", icon: <Globe className="w-8 h-8" />, desc: "Strategic international procurement and supply." },
            ].map((cat, i) => (
              <div
                key={i}
                className="group relative p-10 rounded-[48px] bg-gray-50 border border-gray-100 hover:border-primary/50 hover:bg-white transition-all duration-700 cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5"
              >
                {/* Hover Glow */}
                <div className="absolute -inset-24 bg-primary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="bg-primary p-6 rounded-[28px] w-fit mb-10 text-black group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-xl shadow-primary/20">
                    {cat.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-4 tracking-tight text-gray-900 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-gray-500 mb-10 font-light leading-relaxed text-sm">{cat.desc}</p>

                  <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    Enter Domain
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid - "The Catalog" */}
      <section className="px-6 py-32 bg-gray-50 text-black relative overflow-hidden" id="all-services-title">
        {/* Subtle Background Decoration */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32 space-y-6">
            <div className="flex items-center justify-center gap-3 text-primary uppercase tracking-[0.3em] text-[10px] font-black">
              <span className="w-8 h-[1px] bg-primary/50"></span>
              The Full Collection
              <span className="w-8 h-[1px] bg-primary/50"></span>
            </div>
            <h2 className="text-6xl font-black tracking-tight text-gray-900">
              Premium <span className="text-primary italic font-serif">Product Catalog</span>
            </h2>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-[32px] text-center font-medium max-w-md mx-auto">
              {error}
            </div>
          ) : (
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {services.length > 0 ? (
                services.map((service) => (
                  <article
                    key={service.service_id}
                    className="group relative bg-white w-full rounded-[48px] overflow-hidden border border-gray-100 hover:border-primary/40 transition-all duration-700 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary/10 flex flex-col"
                    onClick={() => router.push(`/services/${service.service_id}/content`)}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-8 right-8 z-20">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${service.status === "active"
                        ? "bg-primary text-black border-primary/30"
                        : "bg-gray-100 text-gray-500 border-gray-200"
                        }`}>
                        {service.status}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-10 pt-16 flex-1 flex flex-col">
                      <h3 className="font-black text-3xl tracking-tighter group-hover:text-primary transition-colors leading-tight mb-4 text-gray-900">
                        {service.service_name}
                      </h3>

                      <p className="text-gray-500 mb-8 line-clamp-2 font-light leading-relaxed">
                        Professional <span className="text-gray-700 italic font-medium">{service.service_name.toLowerCase()}</span> solutions engineered for maximum performance and business growth.
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-1">Domain</span>
                          <span className="text-xs font-black text-primary uppercase">Elite Suite</span>
                        </div>

                        <div className="bg-gray-900 text-white p-4 rounded-2xl group-hover:bg-primary group-hover:text-black transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-black/5">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Interactive Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none"></div>
                  </article>
                ))
              ) : (
                <div className="col-span-full py-32 text-center bg-gray-50 rounded-[48px] border-2 border-dashed border-gray-200">
                  <p className="text-gray-300 text-2xl font-black tracking-tight">No products found in the ecosystem.</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-40 text-center">
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <Foot />
    </div>
    // </RequireAuth>
  );
};

export default ServicePage;