'use client';

import React, { useEffect, useState } from 'react';
import Loader from '@/app/components/Loading';
import Nav from '@/app/components/Nav';
import { useParams , useRouter} from 'next/navigation';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface ServiceStore {
  branding: {
    logo_url: ['/camera-431119_1280.jpg'];
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
  const router = useRouter()
  const [error, setError] = useState('');
  const [serviceContent, setServiceContent] = useState<ServiceContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!service_id) return;

    const url = `https://espoint.onrender.com/espoint/get_all_content_based_service_and_status/${service_id}/active`;
    console.log("Fetching URL:", url);

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
          setServiceContent([data.msg]); // wrap single object
        } else {
          setServiceContent([]);
        }
      })
      .catch((err) => setError(err.message || 'Error fetching service content'))
      .finally(() => setLoading(false));
  }, [service_id]);

  if (loading) return <div className="mt-20 flex h-[100vh] justify-center  items-center"><Loader /></div>;
  if (error) return <div className="text-red-500 mt-20">{error}</div>;
  if (serviceContent.length === 0)
    return <div className="mt-20">No content found for this service.</div>;

  return (
    <div className="bg-white">
      <Nav />
      <div className="px-4 mt-10">
        <h1 className="text-black font-bold text-4xl mb-6">
          Explore service contents
        </h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {serviceContent.map((content) => {
            const { store } = content;
            return (
              <div
                key={content.content_id}
                className="bg-[#fffbed]  pb-4  border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              >

                  {store.branding.logo_url.length > 0 ? (
                      <Image
                        src={store.branding.logo_url[0]}
                        alt={store.name}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />

                      
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        <Image src={'/camera-431119_1280.jpg'}  alt={store.name}
                        width={400}
                        height={200}
                        className="w-full h-60 object-cover" />
                      </div>

                    )}
                  <div className=" relative -top-45  flex justify-between items-center px-4 mt-2">
  <div className="  text-center py-0.5 px-3 rounded-full bg-primary text-primary-foreground capitalize">
    {store.category}
  </div>
  <button
    className="  p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
    onClick={(e) => e.preventDefault()}
  >
    <Heart className="w-4 h-4 text-muted-foreground hover:text-red-500 transition-colors" />
  </button>
</div>
                <div className='px-4  py-8' >
                  <div className='flex justify-between items-center'>
                  <h1 className='font-semibold text-[26px]'>{store.name}</h1>
                     <span className={` ${store.status === 'active' ? 'text-green-600' : 'text-gray-600' } font-medium`}>{store.status}</span>
                     </div>
                  <div className='flex flex-col-1 py-5 font-medium text-[18px]'>
                    <div>{store.description}</div>
                  </div>

                  <div className='flex justify-between items-center'>
                    <span className='font-bold  text-[#d4731e] text-[24px]'>&#8358; {store.base_price} </span>
                    <button onClick={() => router.push(`/services/${service_id}/content/${content.content_id}`)} className="  bg-[#d4731e]  text-white hover:bg-[#d4731e]text-white py-2 px-4 rounded-lg transition-colors duration-300" >
                    Book Now
                  </button>
                  </div>
                </div>

                {/* Logo */}
                
              {/*   {store.branding.logo_url.length > 0  ? (
                  <div className="relative">
                    
                    <Image
                      src={store.branding.logo_url[0]}
                      alt={store.name}
                      width={100}
                      height={100}
                      className=" h-full bg-gray-400 object-cover"
                    />
                  </div>
                ) : (
                   <div className="relative h-[200px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
    📷
  </div>
                )}

               
                <div className='px-4 '>
                <div className="flex justify-between items-center mb-2 ">
                  <h2 className="text-lg font-bold text-gray-800">{store.name}</h2>
                  <span
                    className={` absolute rounded-full p-1 px-3 text-[14px] text-white font-medium ${
                      store.status === 'active'
                        ? 'bg-[#d4731e] text-green-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {store.status}
                  </span>
                </div>
                

                
                
                <p className="text-gray-700 text-sm">{store.description}</p>
              </div> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className='flex justify-center items-center my-10'>
      <button className='bg-[#d4731e] text-white mt-15 p-3 font-medium rounded-md'>Browse All Properties</button>
      </div>
    </div>
  );
};

export default ContentService;
