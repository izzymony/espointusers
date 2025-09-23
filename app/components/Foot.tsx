import React from 'react'
import { useRouter } from 'next/navigation'

const Foot = () => {
              const router = useRouter() 
  return (
    <div>
      <div>
      <footer className="bg-[#7464fa] text-white py-16 px-6">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 md:mx-auto">
            <div>
              <h3 className="text-lg font-bold mb-3">ESTransPro</h3>
              <p className="text-sm text-gray-100">
                Delivering quality services with a modern and user-friendly
                experience. Your satisfaction is our priority.
              </p>
            </div>
            <nav aria-label="Quick links">
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
              <li>
                  <button
                    onClick={() => router.push("/")}
                    className="hover:underline"
                  >
                    Home
                  </button>
              </li>
                <li>
                  <button
                    onClick={() => router.push("/services")}
                    className="hover:underline"
                  >
                    Services
                  </button>
                </li>

                <li>
                   <button
                    onClick={() => router.push("/Services")}
                    className="hover:underline"
                  >Browse
                  </button>          
                </li>
                
               
              </ul>
            </nav>
            <div>
              <h3 className="text-lg font-bold mb-3">Stay Connected</h3>
              <p className="text-sm">Follow us on social media</p>
              <div className="flex gap-4 mt-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#7464fa] transition"
                >
                  F
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#7464fa] transition"
                >
                  T
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#7464fa] transition"
                >
                  I
                </a>
              </div>
            </div>
            <div>
              
             
             
            </div>
          </div>
          <p className="text-center text-xs text-gray-200 mt-12">
            © {new Date().getFullYear()} ESTransPro. All rights reserved.
          </p>
        </footer>
    </div>
    </div>
  )
}

export default Foot
