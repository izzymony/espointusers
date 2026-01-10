import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import Image from 'next/image'

const Foot = () => {
              const router = useRouter() 
  return (
    <div>
      <footer className="bg-black text-gray-300 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <Link href="/" className="flex items-center space-x-3">
              <Image src={'/espointtower.jpg'} alt='' width={150} height={150} />
            </Link>
              <p className="text-gray-400 max-w-xs">
                Empowering businesses through comprehensive solutions across multiple industries.
              </p>
            </div>

            <div>
              <h4 className="text-primary font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="#" className="hover:text-primary transition-colors">Multimedia Services</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Local Product Promotion</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">General Merchandise</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">International Sourcing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Event Planning</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Development Consulting</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-primary font-bold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex flex-col">
                  <span className="text-primary text-xs uppercase tracking-wider font-bold mb-1">Email</span>
                  info@espointintl.com
                </li>
                <li className="flex flex-col">
                  <span className="text-primary text-xs uppercase tracking-wider font-bold mb-1">Phone</span>
                  +232 79 570723
                </li>
                <li className="flex flex-col">
                  <span className="text-primary text-xs uppercase tracking-wider font-bold mb-1">Address</span>
                  1 Lano Avenue, Mambo <br /> Freetown, Sierra Leone
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-primary font-bold mb-6">Follow Us</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-black border-primary/50 border-1 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all cursor-pointer">
                  <Facebook className="w-5 h-5 text-primary hover:text-black" />
                </div>
                <div className="w-10 h-10 bg-black border-primary/50 border-1 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all cursor-pointer">
                  <Twitter className="w-5 h-5 text-primary hover:text-black" />
                </div>
                <div className="w-10 h-10 bg-black border-primary/50 border-1 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all cursor-pointer">
                  <Linkedin className="w-5 h-5 text-primary hover:text-black" />
                </div>
                <div className="w-10 h-10 bg-black border-primary/50 border-1 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all cursor-pointer">
                  <Instagram className="w-5 h-5 text-primary hover:text-black" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} ESPoint. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
  )
}

export default Foot
