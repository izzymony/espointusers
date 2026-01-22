'use client';

import React, { useEffect, useState } from 'react';
import Loader from '@/app/components/Loading';
import Nav from '@/app/components/Nav';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Foot from '@/app/components/Foot';

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



const ContentCard = ({ content, service_id, extractAllImages }: { content: ServiceContent, service_id: string, extractAllImages: (item: ServiceContent) => string[] }) => {
  const router = useRouter();
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const { store } = content;
  const images = extractAllImages(content);
  const fallbackImage = '/camera-431119_1280.jpg';

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <article
      className="group group/card bg-white h-fit border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 flex flex-col overflow-hidden"
    >
      {/* Image Slider Container */}
      <div className="relative w-full overflow-hidden h-[240px] bg-gray-50 group/slider">
        <div
          ref={sliderRef}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          {images.map((src, idx) => (
            <div key={idx} className="min-w-full h-full snap-start relative">
              <Image
                src={src}
                alt={`${store?.name || 'Service'} - ${idx + 1}`}
                width={400}
                height={240}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackImage;
                }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons - Always Visible */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollSlider('left'); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 z-20 border border-white/10 hover:scale-110 active:scale-95 shadow-lg"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollSlider('right'); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 z-20 border border-white/10 hover:scale-110 active:scale-95 shadow-lg"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Category Tag */}
        <div className="absolute top-6 left-6 transition-transform group-hover:scale-110 duration-500">
          <span className="px-5 py-1.5 rounded-full bg-primary/95 backdrop-blur-md text-black text-[9px] font-black uppercase tracking-[0.2em] shadow-xl border border-primary/20 text-center inline-block">
            {store?.category || 'General'}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-60 pointer-events-none"></div>
      </div>

      {/* Compact Content Section */}
      <div className="px-8 py-8 flex flex-col gap-4 flex-1 bg-white relative">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h2 className="font-black text-2xl text-gray-900 leading-tight tracking-tight group-hover:text-primary transition-colors line-clamp-1">
              {store.name}
            </h2>
            <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Premium Offering</div>
          </div>
          <span
            className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${store.status === 'active' || store.status === 'approved'
              ? 'bg-primary/10 text-primary border-primary/20'
              : 'bg-gray-50 text-gray-400 border-gray-100'
              }`}
          >
            {store.status}
          </span>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-2">
          {store.description}
        </p>

        <div className="flex justify-between items-center mt-4 pt-6 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-400 font-black uppercase tracking-[0.3em] mb-0.5">Acquisition Tier</span>
            <span className="font-black text-black text-xl tracking-tighter">
              SL {Number(store.base_price).toLocaleString()}
            </span>
          </div>
          <button
            onClick={() =>
              router.push(`/services/${service_id}/content/${content.content_id}`)
            }
            className="group/btn relative overflow-hidden bg-gray-900 text-white hover:text-black py-4 px-8 rounded-[20px] transition-all duration-500 font-black text-[10px] uppercase tracking-widest shadow-xl hover:shadow-primary/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              Enter
              <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </article>
  );
};

const ContentService = () => {
  const params = useParams();
  const service_id = params?.serviceid as string;
  const router = useRouter();
  const [error, setError] = useState('');
  const [serviceContent, setServiceContent] = useState<ServiceContent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!service_id) return;

    const url = `https://espoint-5shr.onrender.com/espoint/get_all_content_based_service_and_status/${service_id}/active`;
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
      .catch((err) => setError(err.message || 'Error fetching service content'))
      .finally(() => setLoading(false));
  }, [service_id]);

  const extractAllImages = (item: ServiceContent | null): string[] => {
    const fallback = '/camera-431119_1280.jpg';
    if (!item) return [fallback];

    const getDeepValue = (obj: Record<string, unknown>, path: string): unknown => {
      return path.split('.').reduce((acc, part) => {
        if (acc && typeof acc === 'object') {
          return (acc as Record<string, unknown>)[part];
        }
        return undefined;
      }, obj as unknown);
    };

    const potentialPaths = [
      'store.branding.logo_url',
      'branding.logo_url',
      'store.logo_url',
      'logo_url',
      'store.branding.images',
      'branding.images',
      'images',
      'image'
    ];

    const images: string[] = [];

    for (const path of potentialPaths) {
      const val = getDeepValue(item as unknown as Record<string, unknown>, path);
      if (!val) continue;

      const items = Array.isArray(val) ? val : [val];
      items.forEach((v: unknown) => {
        if (typeof v === 'string') {
          if (v && !v.startsWith('blob:')) images.push(v);
        } else if (v && typeof v === 'object') {
          const imgObj = v as Record<string, unknown>;
          const src = (imgObj.url || imgObj.logo_url || imgObj.image_url || imgObj.src) as string | undefined;
          if (src && typeof src === 'string' && !src.startsWith('blob:')) {
            images.push(src);
          }
        }
      });

      if (images.length > 0) break;
    }

    if (images.length === 0) {
      // Safe access using unknown to avoiding strict type checks against the interface
      // while avoiding 'any' which triggers the lint rule.
      const itemRecord = item as unknown as Record<string, unknown>;
      const storeRecord = itemRecord.store as Record<string, unknown> | undefined;
      const brandingRecord = itemRecord.branding as Record<string, unknown> | undefined;

      const storeBrandingLogo = (storeRecord?.branding as Record<string, unknown> | undefined)?.logo_url;
      const directBrandingLogo = brandingRecord?.logo_url;

      const backup = (Array.isArray(storeBrandingLogo) ? storeBrandingLogo[0] : undefined) ||
        (Array.isArray(directBrandingLogo) ? directBrandingLogo[0] : undefined);

      return backup ? [backup as string] : [fallback];
    }

    return images;
  };

  useEffect(() => {
    if (serviceContent.length > 0) {
      console.log('--- SYSTEM DIAGNOSTIC: DATA ARRIVED ---');
      console.log('Extracted Images count:', extractAllImages(serviceContent[0]).length);
      console.log('---------------------------------------');
    }
  }, [serviceContent]);

  if (loading)
    return (
      <div className="mt-20 flex h-screen justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 px-6 mt-32 mb-20">
        <div className="text-center lg:text-left max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-3 text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-4 justify-center lg:justify-start">
            <span className="w-12 h-[1px] bg-primary/50"></span>
            Ecosystem Content
          </div>
          <h1 className="text-black text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
            Explore <span className='text-primary italic font-serif'>Service Contents</span>
          </h1>
        </div>

        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="bg-rose-50 border border-rose-100 text-rose-600 p-10 rounded-[40px] text-center font-bold shadow-sm max-w-md w-full">
                <div className="bg-rose-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl">!</div>
                <p className="text-xl mb-4">Connection Error</p>
                <p className="text-sm font-light text-rose-400">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-8 px-8 py-3 bg-rose-500 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-rose-600 transition-all"
                >
                  Retry Synchronization
                </button>
              </div>
            </div>
          ) : serviceContent.length === 0 ? (
            <div className="py-32 text-center bg-gray-50/50 rounded-[60px] border-4 border-dashed border-gray-100/50">
              <div className="bg-white p-8 rounded-[40px] w-fit mx-auto mb-10 shadow-2xl shadow-gray-200/50 text-gray-200">
                <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-4xl font-black text-gray-900 tracking-tight mb-4">No content found</h3>
              <p className="text-gray-400 font-light max-w-md mx-auto italic text-lg leading-relaxed px-6">
                Our central ecosystem ledger currently shows no active content records for this specific service unit.
              </p>
              <button
                onClick={() => router.push('/services')}
                className="mt-10 px-10 py-4 bg-gray-900 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all shadow-xl"
              >
                Back to Ecosystem
              </button>
            </div>
          ) : (
            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {serviceContent.map((content) => (
                <ContentCard
                  key={content.content_id}
                  content={content}
                  service_id={service_id}
                  extractAllImages={extractAllImages}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Foot />
    </div>
  );
};

export default ContentService;
