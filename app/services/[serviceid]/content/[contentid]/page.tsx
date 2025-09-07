'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loader from '@/app/components/Loading';
import Nav from '@/app/components/Nav';
import Image from 'next/image';
import { Heart, ArrowLeft } from 'lucide-react';
interface ServiceStore {
  branding: {
    logo_url: string[];
  };
  name: string;
  status: string;
  description: string;
  base_price: number;
  category: string;
  eligible_roles: string;
  duration_minutes: string;
}

interface ServiceContent {
  content_id: string;
  service: string;
  service_unit: string;
  store: ServiceStore;
}

const ContentDetails = () => {
  const params = useParams();
  const content_id = params?.contentid as string;

  const [content, setContent] = useState<ServiceContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!content_id) return;

    const url = `https://espoint.onrender.com/espoint/get_content/${content_id}`;
    console.log("Fetching Content URL:", url);

    setLoading(true);
    setError('');

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch content details');
        return res.json();
      })
      .then((data) => {
        if (data.msg) {
          setContent(data.msg);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [content_id]);

  if (loading) return <div className="mt-20 flex h-[100vh] justify-center items-center"><Loader /></div>;
  if (error) return <div className="text-red-500 mt-20">{error}</div>;
  if (!content) return <div className="mt-20">No content found.</div>;

  const { store } = content;

  return (
    <div className="bg-white">
      <Nav />

     </div>
  );
};

export default ContentDetails;
