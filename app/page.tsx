import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";

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
    <div className="bg-white w-full min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full py-20 sm:py-24 lg:py-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7464fa] via-[#a59df7] to-white opacity-90 -z-10"></div>

        {/* Content Wrapper */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-20 gap-12 lg:gap-24">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left order-1">
            <h1 className="font-bold text-5xl sm:text-6xl lg:text-7xl text-gray-900 mb-8 leading-tight tracking-tight">
              ESTrans<span className="text-[#7464fa]">Pro</span>
            </h1>
            <p className="text-gray-900 text-lg sm:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto lg:mx-0">
              Elevate your luxury experience with ESTransPro. Create your account today and unlock exclusive access to premium photography, stylish outfits, expert event planning, and much more.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start max-w-sm mx-auto lg:mx-0">
              <Link href="/login" passHref className="bg-[#7464fa] p-3 text-center text-white rounded-full w-full">
                
               
                  Login
             
              </Link>
              <Link href="/signup" passHref className="bg-white border-2 border-[#7464fa] text-center w-full p-3 text-[#7464fa] rounded-full">
                
                  Signup
             
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center order-2">
            <Image
              src="/camera-431119_1280.jpg"
              alt="Luxury Photography"
              width={800}
              height={500}
              className="rounded-3xl shadow-2xl object-cover w-[90%] sm:w-full max-w-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#f9f8ff] py-16 px-6 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          Why <span className="text-[#7464fa]">Choose Us</span>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          {[
            {
              icon: (
                <svg
                  className="mx-auto mb-4 w-12 h-12 text-[#7464fa]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636"
                  ></path>
                </svg>
              ),
              title: "Premium Quality",
              description:
                "We deliver top-notch services with attention to every detail, ensuring your experience is flawless.",
            },
            {
              icon: (
                <svg
                  className="mx-auto mb-4 w-12 h-12 text-[#7464fa]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h1l3 9h8l3-9h1"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 10V6a4 4 0 00-8 0v4"
                  ></path>
                </svg>
              ),
              title: "Flexible Scheduling",
              description:
                "Choose dates and times that fit your lifestyle with our easy-to-use booking system.",
            },
            {
              icon: (
                <svg
                  className="mx-auto mb-4 w-12 h-12 text-[#7464fa]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              ),
              title: "Trusted by Clients",
              description:
                "Our clients trust us for professionalism and excellence in every service we provide.",
            },
          ].map(({ icon, title, description }, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow cursor-default"
            >
              {icon}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 text-base">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
          Explore Our <span className="text-[#7464fa]">Features</span>
        </h2>

        <div className="space-y-24 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-semibold text-gray-800 mb-5">
                Browse & Book Items
              </h3>
              <p className="text-gray-600 text-lg max-w-xl mx-auto lg:mx-0">
                Quickly explore our wide selection of items and book what suits your taste and style. Easy, fast, and seamless.
              </p>
            </div>
            <div className="flex-1 relative flex justify-center">
              <Image
                src="/undraw_booking_1ztt.svg"
                alt="Browse and Book Items"
                width={520}
                height={370}
                className="rounded-2xl shadow-xl object-contain w-[90%] sm:w-full max-w-md animate-bounce-slow"
              />
              <div className="absolute bottom-0 w-2/3 h-6 bg-black/25 rounded-full blur-xl animate-bounce-slow scale-95"></div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="flex-1 relative flex justify-center">
              <Image
                src="/undraw_date-picker_8qys.svg"
                alt="Pick Suitable Dates"
                width={520}
                height={370}
                className="rounded-2xl shadow-xl object-contain w-[90%] sm:w-full max-w-md animate-bounce-slow"
              />
              <div className="absolute bottom-0 w-2/3 h-6 bg-black/25 rounded-full blur-xl animate-bounce-slow scale-95"></div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-semibold text-gray-800 mb-5">
                Pick Suitable Dates
              </h3>
              <p className="text-gray-600 text-lg max-w-xl mx-auto lg:mx-0">
                Select the dates that match your experience. We provide flexible scheduling to make your booking stress-free.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-semibold text-gray-800 mb-5">
                View & Manage Bookings
              </h3>
              <p className="text-gray-600 text-lg max-w-xl mx-auto lg:mx-0">
                Stay organized with a simple dashboard that lets you view, edit, or cancel bookings at your convenience.
              </p>
            </div>
            <div className="flex-1 relative flex justify-center">
              <Image
                src="/undraw_booked_bb22.svg"
                alt="View and Manage Bookings"
                width={520}
                height={370}
                className="rounded-2xl shadow-xl object-contain w-[90%] sm:w-full max-w-md animate-bounce-slow"
              />
              <div className="absolute bottom-0 w-2/3 h-6 bg-black/25 rounded-full blur-xl animate-bounce-slow scale-95"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20 px-6 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
          What Our <span className="text-[#7464fa]">Clients Say</span>
        </h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map(({ name, text, avatar }, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition cursor-default"
            >
              <div className="flex justify-center mb-6">
                <Image
                  src={avatar}
                  alt={`${name} avatar`}
                  width={72}
                  height={72}
                  className="rounded-full object-cover"
                  priority={i === 0}
                />
              </div>
              <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">“{text}”</p>
              <h4 className="text-xl font-semibold text-gray-900">{name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#7464fa] text-center text-white px-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight max-w-3xl mx-auto">
          Ready to Experience Premium Services?
        </h2>
        <p className="mb-10 text-lg sm:text-xl max-w-xl mx-auto">
          Join ESTransPro today and unlock access to tailored services and premium experiences designed just for you.
        </p>
        <Link href="/signup" passHref>
          
            Get Started
        
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs sm:text-sm text-center sm:text-left select-none">
            © {new Date().getFullYear()} ESTransPro. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm justify-center sm:justify-end">
            {[
              { href: "/about", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} passHref>
                
                  {label}
        
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}