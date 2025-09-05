import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Nav = () => {
  return (
    <div>
       <header className="border-b border-border bg-card/50 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
             
               <Image src={'/espointtower.jpg'} alt='' width={110} height={110 }/>
            
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/browse" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                Browse
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                About
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Nav
