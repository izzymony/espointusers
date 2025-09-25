'use client';

import React, { useEffect, useState } from 'react';
import Loader from '@/app/components/Loading';
import Nav from '@/app/components/Nav';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface ServiceStore {
  branding: {
    logo_url: string[];
  };
  name: string;
  status: string;
  description: string;
  base_price: number;
  category: string;
}

interface ServiceContent {
  content_id: string;
  store: ServiceStore;
}

const ContentService = () => {
  const params = useParams();
  const service_id = params?.serviceid as string;
  const router = useRouter();
  const [error, setError] = useState('');
  const [serviceContent, setServiceContent] = useState<ServiceContent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!service_id) return;

    const url = `https://espoint.onrender.com/espoint/get_all_content_based_service_and_status/${service_id}/approved`;
    console.log('Fetching URL:', url);

    setLoading(true);
    setError('');

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.msg)) {
          setServiceContent(data.msg);
        } else if (data.msg) {
          setServiceContent([data.msg]);
        } else {
          setServiceContent([]);
        }
      })
      .catch((err) => setError(err.message  || 'Error fetching service content'))
      .finally(() => setLoading(false));
  }, [service_id]);

  if (loading)
    return (
      <div className="mt-20 flex h-[100vh] justify-center items-center">
        <Loader />
      </div>
    );
  if (error) return <div className="text-red-500 mt-20">{error}</div>;
  if (serviceContent.length === 0)
    return <div className="mt-20 text-gray-600">No content found for this service.</div>;

  return (
    <div className="bg-white min-h-screen ">
      {/* Navbar */}
      <Nav />

      {/* Header */}
      <div className="px-4 mt-25 text-center lg:text-left opacity-5">
        <h1 className="text-black text-4xl font-bold text-3xl md:text-4xl mb-6">
          Explore Service <span className='text-[#7464fa]'>Contents</span>
        </h1>
      </div>

      {/* Cards Grid */}
      <div className="px-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {serviceContent.map((content) => {
          const { store } = content;
          return (
            <div
              key={content.content_id}
              className="bg-white h-fit border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full group">
                <Image
                  src={store.branding.logo_url?.[0] || '/camera-431119_1280.jpg'}
                  alt={store.name}
                  width={1200}
                  height={600}
                  className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] object-cover transform group-hover:scale-105 transition duration-500"
                  priority
                />

                {/* Category Tag */}
                <div className="absolute top-4 left-4 py-1 px-4 rounded-full bg-[#7464fa] text-white text-xs sm:text-sm font-medium shadow-lg capitalize">
                  {store.category}
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6 flex flex-col gap-4 flex-1">
                {/* Title + Status */}
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-xl md:text-2xl text-gray-900">
                    {store.name}
                  </h2>
                  <span
                    className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full ${
                      store.status === 'approved'
                        ? 'bg-[#7464fa] text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {store.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {store.description.length > 120
                    ? store.description.slice(0, 120) + '...'
                    : store.description}
                </p>

                {/* Price + CTA */}
                <div className="flex justify-between items-center mt-auto pt-2">
                  <span className="font-extrabold text-[#7464fa] text-lg md:text-xl">
                    &#8358; {store.base_price}
                  </span>
                  <button
                    onClick={() =>
                      router.push(`/services/${service_id}/content/${content.content_id}`)
                    }
                    className="bg-[#7464fa] text-white hover:bg-[#5a4ad8] py-2 px-5 rounded-lg transition-colors duration-300 font-semibold shadow-md"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Browse All CTA */}
      
    </div>
  );
};

export default ContentService;
