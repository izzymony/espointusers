'use client'
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Foot from "./components/Foot";
import {
  ArrowRight,
  Video,
  ShoppingBag,
  Package,
  Globe,
  Calendar,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  BarChart4Icon
} from "lucide-react";
import GlobeComponent from "./components/Globe";


const testimonials = [
  {
    name: "Sarah Johnson",
    text: "ESTransPro made my event unforgettable! Everything was smooth and professional.",
    avatar: "/avatars/sarah.jpg",
  },
  {
    name: "Michael Lee",
    text: "Booking was seamless. I loved how I could manage everything online.",
    avatar: "/avatars/michael.jpg",
  },
  {
    name: "Amara Okafor",
    text: "They truly care about luxury service. I’ll definitely use them again.",
    avatar: "/avatars/amara.jpg",
  },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground w-full min-h-screen flex flex-col dark">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[100vh] py-20 lg:py-32 overflow-hidden bg-black">
        {/* Globe Background */}
        {/* Globe Background */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/image copy 7.png"
            className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-screen animate-globe"
            alt=""

          />
        </div>


        {/* Globe Background */}
        <div className="absolute inset-0 pointer-events-none ">
          <div className="w-full h-full max-w-5xl aspect-square scale-110 lg:scale-100 opacity-20">
            <GlobeComponent />
          </div>
        </div>


        {/* Background Animation/Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top Left Glow (Closer to text) */}
          <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] sm:w-[20%] sm:h-[20%] bg-primary rounded-full blur-[80px] animate-pulse "></div>

          {/* Bottom Right Glow (Closer to text) */}
          <div className="absolute bottom-[30%] right-[20%] w-[40%] h-[40%] sm:w-[25%] sm:h-[25%] bg-primary rounded-full blur-[100px] animate-bounce-slow"></div>

          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

          {/* Animated Light Streaks */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer"></div>
        </div>


        {/* Content Wrapper */}
        <div className="max-w-7xl mx-auto flex flex-col items-center h-screen justify-center px-6 relative z-10 text-center">
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-7xl text-white mb-6 leading-tight tracking-tight max-w-5xl">
            Empowering Businesses <br />
            Through <span className="text-primary">Diverse Solutions</span>
          </h1>
          <p className="text-white text-lg sm:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto">
            From multimedia production to international sourcing, we deliver comprehensive services that drive growth and innovation across industries.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
            <Link
              href="/login"
              className="bg-primary hover:bg-primary/90 text-black font-semibold py-4 px-8 rounded-full transition-all group flex items-center justify-center gap-2"
            >
              Login
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/signup"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-black font-semibold py-4 px-8 rounded-full transition-all text-center"
            >
              Signup
            </Link>
          </div>

          {/* Scroll Down Indicator */}
          <div className="mt-20 animate-bounce cursor-pointer">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Business Solutions Section */}
      <section className="bg-white py-24 px-6 lg:px-20 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Comprehensive <span className="text-primary">Business Solutions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Leveraging expertise across multiple domains to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Multimedia Services",
                desc: "Professional video production, photography, and digital content creation for brands that demand excellence.",
                icon: <Video className="w-6 h-6 text-black" />,
                img: "/image copy 5.png"
              },
              {
                title: "Local Product Promotion",
                desc: "Amplify local artisans and businesses through strategic marketing and curated showcases.",
                icon: <ShoppingBag className="w-6 h-6 text-black" />,
                img: "/image copy 6.png"
              },
              {
                title: "General Merchandise",
                desc: "Diverse product offerings with quality assurance and reliable distribution networks.",
                icon: <Package className="w-6 h-6 text-black" />,
                img: "/image copy.png"
              },
              {
                title: "International Sourcing",
                desc: "Connect global markets with efficient procurement solutions and logistics management.",
                icon: <Globe className="w-6 h-6 text-black" />,
                img: "/image copy 4.png"
              },
              {
                title: "Event Planning",
                desc: "End-to-end event management from intimate gatherings to large-scale corporate functions.",
                icon: <Calendar className="w-6 h-6 text-black" />,
                img: "/image copy 2.png"
              },
              {
                title: "Development Consulting",
                desc: "Strategic advisory services to optimize operations and accelerate business growth.",
                icon: <TrendingUp className="w-6 h-6 text-black" />,
                img: "/image copy 3.png"
              },
            ].map((service, i) => (
              <div key={i} className="group bg-[#fcfcfc] border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  {/* Image placeholder */}
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 font-medium">
                    <Image
                      src={service.img}
                      alt={service.title}
                      width={500}
                      height={500}

                      className="h-full w-full object-cover"
                    />

                  </div>
                </div>
                <div className="p-8 relative">
                  <div className="absolute -top-6 left-8 bg-primary p-4 rounded-xl shadow-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Let's Start a Conversation Section */}
      <section className="bg-gray-50 py-24 px-6 lg:px-20 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Let&apos;s Start a <span className="text-primary">Conversation</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ready to transform your business? Reach out and let&apos;s discuss how we can help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-6 bg-white border-primary/70 border-1 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-black border-primary/50 border-1 p-4 rounded-2xl">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Us</h4>
                  <p className="text-gray-600 text-lg">info@espointintl.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-white border-primary/70 border-1 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-black border-primary/50 border-1 p-4 rounded-2xl">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Call Us</h4>
                  <p className="text-gray-600 text-lg">+232 79 570723</p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-white border-primary/70 border-1 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-black border-primary/50 border-1 p-4 rounded-2xl">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Visit Us</h4>
                  <p className="text-gray-600 text-lg">
                    1 Lano Avenue, Mambo <br />
                    Freetown, Sierra Leone
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white border-primary/70 border-1 p-10 rounded-[40px] shadow-xl border border-gray-100">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="you.email@example.com"
                    className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-5 rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Dark) */}
      <div>
        <Foot />
      </div>
    </div>
  );
}