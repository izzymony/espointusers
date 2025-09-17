"use client";

import React, { useState, useEffect } from "react";
import Loader from "../components/Loading";
import Nav from "../components/Nav";
import RequireAuth from "../components/RequireAuth";

interface UserInfo {
  username: string;
  first_name: string;
  last_name: string;
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");

  const res = await fetch("https://espoint-auth.onrender.com/api/v1.0/auth/token/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!res.ok) throw new Error("Failed to refresh token");

  const data = await res.json();
  localStorage.setItem("authToken", data.access);
  return data.access;
}

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    let token = localStorage.getItem("authToken");

    if (!storedUser?.username) {
      setError("No user found in local storage");
      return;
    }

    const username = storedUser.username;
    const fetchData = async () => {
      setLoading(true);
      try {
        let res = await fetch(
          `https://espoint-auth.onrender.com/api/v1.0/get_user_info/${username}`,
          { headers: { Authorization: token ? `Bearer ${token}` : "" } }
        );

        // if expired, refresh token
        if (res.status === 401) {
          token = await refreshAccessToken();
          res = await fetch(
            `https://espoint-auth.onrender.com/api/v1.0/get_user_info/${username}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }

        if (!res.ok) throw new Error("Failed to fetch user info");

        const data = await res.json();
        if (data.msg) {
          setUserInfo(data.msg);
          localStorage.setItem("user", JSON.stringify(data.msg));
        }
      } catch (err: any) {
        setError(err.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader /></div>;
  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;
  if (!userInfo) return <div className="text-center mt-20">No user data found</div>;

  return (
    <RequireAuth>
    <div className="bg-white min-h-screen pt-8">
      <Nav />
      <div className="mt-22">
      <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-2xl rounded-2xl">
        <h1 className="text-2xl font-bold text-[#d4731e] mb-6">User Profile</h1>
        <div className="space-y-4">
          <Info label="Username" value={userInfo.username} />
          <Info label="Full Name" value={`${userInfo.first_name} ${userInfo.last_name}`} />
        </div>
      </div>
      </div>
    </div>
    </RequireAuth>
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

export default ProfilePage;
