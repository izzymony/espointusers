import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header"
export default function Home() {
  return (
    <div className="bg-white w-full min-h-screen">
      <Header/>
      {/* Hero Section */}
      <section className="relative mt-22 flex flex-col lg:flex-row items-center justify-between w-full px-4 sm:px-8 lg:px-16 py-12 sm:py-16 gap-10 lg:gap-16 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7464fa] via-[#a59df7] to-white opacity-90 -z-10"></div>

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left order-1">
          <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-gray-900 mb-4 leading-tight">
            ESTrans<span className="text-[#7464fa]">Pro</span>
          </h1>
          <p className="text-black text-base sm:text-lg lg:text-xl mb-6 mx-auto lg:mx-0 max-w-2xl">
            Your luxury is our concern. Create your account today and access the best
            services that suit your needs: classy photography, modern outfits, event
            planning, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/login">
              <button className="w-full sm:w-auto text-white bg-[#7464fa] px-6 py-3 rounded-full font-semibold shadow hover:bg-[#4a36d0] transition-colors">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-[#7464fa] text-[#7464fa] rounded-full font-semibold shadow hover:bg-[#f4f2ff] transition-colors">
                Signup
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center order-2 w-full">
          <Image
            src="/camera-431119_1280.jpg"
            alt="App UI Mockup"
            width={800}
            height={500}
            className="rounded-2xl shadow-2xl object-contain w-[90%] sm:w-full max-w-xl"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 lg:px-16">
  <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
    Explore Our <span className="text-[#7464fa]">Features</span>
  </h2>

  <div className="space-y-20 max-w-6xl mx-auto">
    {/* Feature 1 */}
    <div className="flex flex-col lg:flex-row items-center gap-12">
      {/* Text */}
      <div className="flex-1 text-center lg:text-left">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Browse & Book Items
        </h3>
        <p className="text-gray-600 text-base">
          Quickly explore our wide selection of items and book what suits your
          taste and style. Easy, fast, and seamless.
        </p>
      </div>
      {/* Floating Illustration */}
      <div className="flex-1 relative flex justify-center">
        <Image
          src="/undraw_booking_1ztt.svg"
          alt="Browse and Book Items"
          width={500}
          height={350}
          className="rounded-xl shadow-lg object-contain w-[90%] sm:w-full max-w-md animate-bounce-slow"
        />
        <div className="absolute bottom-0 w-2/3 h-5 bg-black/30 rounded-full blur-xl animate-bounce-slow scale-95"></div>
      </div>
    </div>

    {/* Feature 2 */}
    <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
      {/* Floating Illustration */}
      <div className="flex-1 relative flex justify-center">
        <Image
          src="/undraw_date-picker_8qys.svg"
          alt="Pick Suitable Dates"
          width={500}
          height={350}
          className="rounded-xl shadow-lg object-contain w-[90%] sm:w-full max-w-md animate-bounce-slow"
        />
        <div className="absolute bottom-0 w-2/3 h-5 bg-black/30 rounded-full blur-xl animate-bounce-slow scale-95"></div>
      </div>
      {/* Text */}
      <div className="flex-1 text-center lg:text-left">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Pick Suitable Dates
        </h3>
        <p className="text-gray-600 text-base">
          Select the dates that match your experience. We provide flexible
          scheduling to make your booking stress-free.
        </p>
      </div>
    </div>

    {/* Feature 3 */}
    <div className="flex flex-col lg:flex-row items-center gap-12">
      {/* Text */}
      <div className="flex-1 text-center lg:text-left">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          View & Manage Bookings
        </h3>
        <p className="text-gray-600 text-base">
          Stay organized with a simple dashboard that lets you view, edit, or
          cancel bookings at your convenience.
        </p>
      </div>
      {/* Floating Illustration */}
      <div className="flex-1 relative flex justify-center">
        <Image
          src="/undraw_booked_bb22.svg"
          alt="View and Manage Bookings"
          width={500}
          height={350}
          className="rounded-xl shadow-lg object-contain w-[90%] sm:w-full max-w-md animate-bounce-slow "
        />
        <div className="absolute bottom-0 w-2/3 h-5 bg-black/30 rounded-full blur-xl animate-bounce-slow scale-95"></div>
      </div>
    </div>
  </div>
</section>


      {/* Call to Action */}
      <section className="py-16 bg-[#7464fa] text-center text-white px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Experience Premium Services?
        </h2>
        <p className="mb-6 text-base sm:text-lg max-w-xl mx-auto">
          Join ESTransPro today and unlock access to tailored services and premium
          experiences.
        </p>
        <Link href="/signup">
          <button className="px-6 py-3 bg-white text-[#7464fa] rounded-full font-semibold shadow hover:bg-gray-100 transition">
            Get Started
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} ESTransPro. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs sm:text-sm justify-center sm:justify-end">
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
