import React from 'react'
import { useRouter } from 'next/navigation'

const Footer = () => {
  const router = useRouter()            
  return (
    <div>
      <footer className="bg-[#7464fa] text-white py-16 px-6">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-4">
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
              
                  <button
                    onClick={() => router.push("/")}
                    className="hover:underline"
                  >
                    Home
                  </button>
              
                
                  <button
                    onClick={() => router.push("/services")}
                    className="hover:underline"
                  >
                    Services
                  </button>
                
                
               
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
              <h3 className="text-lg font-bold mb-3">Subscribe</h3>
              <p className="text-sm mb-3">
                Get the latest services and offers directly in your inbox.
              </p>
             
             
            </div>
          </div>
          <p className="text-center text-xs text-gray-200 mt-12">
            © {new Date().getFullYear()} ESTransPro. All rights reserved.
          </p>
        </footer>
    </div>
  )
}

export default Footer
