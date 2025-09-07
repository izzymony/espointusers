'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  // Modify structure as per the API's actual returned fields
}

const ServiceContentPage: React.FC = () => {
  const router = useRouter();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Retrieve serviceid from the URL via useRouter().query (for client component)
  useEffect(() => {
    // Extract serviceid from path
    // Next.js app router doesn't provide query directly. We'll do some workaround:
    const pathMatch = window.location.pathname.match(/services\/(.+?)\/content/);
    const serviceid = pathMatch ? pathMatch[1] : null;

    if (!serviceid) {
      setError("Invalid Service ID");
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`https://espoint.onrender.com/espoint/get_content`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch content");
        const data = await res.json();
        setContent(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError(err.message);
        setContent([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Service Contents</h1>
      {content.length === 0 ? (
        <div>No content found for this service.</div>
      ) : (
        <ul className="space-y-4">
          {content.map((item) => (
            <li key={item.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceContentPage;
