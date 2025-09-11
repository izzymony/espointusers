"use client";

import React, { useState, useEffect } from "react";
import Loader from "../components/Loading";
import Nav from "../components/Nav";

interface UserInfo {
  username: string;
  email?: string;
  first_name: string;
  last_name: string;
  phone?: string;
  date_joined?: string;
  status?: string;
  profile_image?: string;
}

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // fetch user info
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (!storedUser?.username) {
      setError("No user found in local storage");
      return;
    }

    const username = storedUser.username;
    setLoading(true);

    fetch(`https://espoint-auth.onrender.com/api/v1.0/get_user_info/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user info");
        return res.json();
      })
      .then((data) => {
        if (data.msg) {
          setUserInfo(data.msg);
        } else {
          setError("No user data found");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !userInfo) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profile_image", file);
    formData.append("username", userInfo.username);

    setUploading(true);

    try {
      const res = await fetch(
        "https://espoint-auth.onrender.com/api/v1.0/upload_user_profile_image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();
      setUserInfo((prev) =>
        prev ? { ...prev, profile_image: data.msg?.profile_image } : prev
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className="mt-20 flex h-[100vh] justify-center items-center">
        <Loader />
      </div>
    );

  if (error)
    return <div className="text-red-500 mt-20 text-center">{error}</div>;

  if (!userInfo)
    return <div className="mt-20 text-center">No user data found.</div>;

  return (
    <div className="bg-white pt-26 min-h-screen">
      <Nav />
      <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-2xl rounded-2xl">
        <h1 className="text-2xl font-bold text-[#d4731e] mb-6">User Profile</h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={userInfo.profile_image || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-[#d4731e] shadow-md"
          />
          <label className="mt-4 cursor-pointer bg-[#d4731e] text-white px-4 py-2 rounded-lg hover:bg-[#b55d15] transition">
            {uploading ? "Uploading..." : "Upload Image"}
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <Info label="Username" value={userInfo.username} />
          <Info
            label="Full Name"
            value={`${userInfo.first_name} ${userInfo.last_name}`}
          />
          <Info label="Email" value={userInfo.email || "-"} />
          <Info label="Phone" value={userInfo.phone || "-"} />
          <Info label="Status" value={userInfo.status || "active"} />
        </div>

        <div className="mt-8 text-center">
          <span className="text-xs text-gray-400">
            Joined:{" "}
            {userInfo.date_joined
              ? new Date(userInfo.date_joined).toLocaleString()
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-bold text-gray-700 w-32">{label}:</span>
      <span className="text-gray-900 break-all">{value}</span>
    </div>
  );
}

export default Page;
