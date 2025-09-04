'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import Nav from '../components/Nav'
interface Content {
  id: string;
  serviceName: string
  description: string
  images: string[]
}

// Using placeholder images from a reliable source
const contents = [
  {
    id: "camera",
    serviceName: "Camera Rental",
    description: "We rent high-quality cameras for all your photography needs",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=800&h=500"
    ],
  },
  {
    id: "audio",
    serviceName: "Audio Equipment",
    description: "Professional audio equipment for events and recordings",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1598407307310-7b288f3d091c?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&h=500"
    ],
  }
]

const Page = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [content, setContent] = useState<Content[]>(contents);
  const [activeIndex, setActiveIndex] = useState<{[key: string]: number}>({})
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({})

  // Initialize activeIndex with 0 for each content item
  useEffect(() => {
    const initialIndex: {[key: string]: number} = {};
    content.forEach(item => {
      initialIndex[item.id] = 0;
    });
    setActiveIndex(initialIndex);
  }, [content]);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const updated: {[key: string]: number} = {...prev};
        content.forEach(item => {
          updated[item.id] = (prev[item.id] + 1) % item.images.length;
        });
        return updated;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [content]);

  const handleNext = (id: string, imageCount: number) => {
    setActiveIndex(prev => ({
      ...prev,
      [id]: (prev[id] + 1) % imageCount
    }));
  }

  const handlePrev = (id: string, imageCount: number) => {
    setActiveIndex(prev => ({
      ...prev,
      [id]: (prev[id] - 1 + imageCount) % imageCount
    }));
  }

  const handleImageLoad = (id: string) => {
    setIsLoading(prev => ({ ...prev, [id]: false }));
  }

  const handleImageError = (id: string) => {
    console.error(`Image failed to load for ${id}`);
    setIsLoading(prev => ({ ...prev, [id]: false }));
  }

  return (
    <div className='bg-[#ffffff] min-h-screen'>
     <Nav />
      
      <main className='container mx-auto px-4 mt-22 pb-16'>
        <div>
          <h1 className='font-bold text-4xl text-gray-800'>Discover Amazing Services</h1>
          <p className='text-gray-600 text-lg mt-2'>Choose your preferred date, time, and details below to complete your booking</p>
          
          <button className="border w-[100px] border-gray-200 p-2 mt-5 gap-4 rounded-full hover:shadow-md hover:bg-[#d4731e] focus:bg-[#d4731e] cursor-pointer transition-all duration-300  hover:[&_*]:text-white focus:[&_*]:text-white">
            <div className="flex items-center gap-2 justify-center group">
              <Filter size={20} className="inline-block text-gray-700 group-hover:text-white transition-colors duration-200" />
              <p className="text-gray-700 font-semibold group-hover:text-white transition-colors duration-200">Filter</p>
            </div>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {content.map((item) => (
              <div key={item.id} className='bg-[#fffbed] border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1'>
                <div className="relative w-full h-72 overflow-hidden">
                  {/* Loading indicator */}
                  {isLoading[item.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                  )}
                  
                  {/* Main image with fade transition */}
                  <div className={`relative w-full h-full transition-opacity duration-700 ${isLoading[item.id] ? 'opacity-0' : 'opacity-100'}`}>
                    <Image
                      src={item.images[activeIndex[item.id]]}
                      alt={`${item.serviceName} image ${activeIndex[item.id] + 1}`}
                      fill
                      className="object-cover"
                      onLoad={() => handleImageLoad(item.id)}
                      onError={() => handleImageError(item.id)}
                      priority={activeIndex[item.id] === 0}
                    />
                  </div>
                  
                  {/* Navigation buttons */}
                  <button
                    onClick={() => handlePrev(item.id, item.images.length)}
                    className='absolute left-3 top-1/2 shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full z-10'
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => handleNext(item.id, item.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full z-10"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  {/* Indicator dots */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {item.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveIndex(prev => ({ ...prev, [item.id]: idx }));
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === activeIndex[item.id] 
                            ? 'bg-[#d4731e] scale-125' 
                            : 'bg-white/80 hover:bg-white'
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.serviceName}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <button className="mt-4 bg-[#d4731e]  text-white hover:bg-[#d4731e]text-white py-2 px-4 rounded-lg transition-colors duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 Espoint Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Page