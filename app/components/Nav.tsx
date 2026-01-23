'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Home, Search, Info, Phone, CalendarDays, User2 } from 'lucide-react'

const menuItems = [
  { href: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { href: '/services', label: 'Services', icon: <Search className="w-5 h-5" /> },
  { href: '/booked_contents', label: 'My Bookings', icon: <CalendarDays className="w-5 h-5" /> },
  { href: '/profile', label: 'Profile', icon: <User2 className="w-5 h-5" /> },
]

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div>
      <header className="  bg-black fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image src={'/espointtower.jpg'} alt='' width={110} height={110} />
            </Link>
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500 font-medium transition-colors"
                >
                  <p className='text-primary'>{item.icon}</p>
                  <p className='text-white'>{item.label}</p>
                </Link>
              ))}
            </nav>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden  text-primary p-2 rounded text-[#7464fa] hover:text-orange-500"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="md:hidden absolute top-[72px] left-0 w-full bg-black shadow-lg z-50">
            <nav className="flex flex-col py-4 px-6 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 text-gray-700 hover:text-orange-500 font-medium transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <p className='text-primary'>{item.icon}</p>
                  <p className='text-white'>{item.label}</p>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}

export default Nav