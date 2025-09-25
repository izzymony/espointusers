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

  const res = await fetch(
    "https://espoint-auth.onrender.com/api/v1.0/auth/token/refresh",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    }
  );

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
          `https://espoint-auth.onrender.com/api/v1.0/get_user_info/${username}_no`,
          { headers: { Authorization: token ? `Bearer ${token}` : "" } }
        );

        if (res.status === 401) {
          token = await refreshAccessToken();
          res = await fetch(
            `https://espoint-auth.onrender.com/api/v1.0/get_user_info/${username}_no`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }

        if (!res.ok) throw new Error("Failed to fetch user info");

        const data = await res.json();
        if (data.msg) {
          setUserInfo(data.msg);
          localStorage.setItem("user", JSON.stringify(data.msg));
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-20">{error}</div>;
  if (!userInfo) return <div className="text-center mt-20">No user data found</div>;

  return (
    <RequireAuth>
      <div className="bg-gray-50 min-h-screen opacity-3">
        <Nav />
        <div className="flex justify-center px-4 sm:px-6 lg:px-8 pt-24">
          <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#7464fa]/10 text-[#7464fa] text-3xl font-bold shadow-inner">
                {userInfo.first_name?.[0] || userInfo.username?.[0]}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-4">
                {userInfo.first_name} {userInfo.last_name}
              </h1>
              <p className="text-sm text-gray-500">@{userInfo.username}</p>
            </div>

            {/* Info Section */}
            <div className="space-y-4">
              <Info label="Username" value={userInfo.username} />
              <Info
                label="Full Name"
                value={`${userInfo.first_name} ${userInfo.last_name}`}
              />
            </div>

            {/* Actions */}
           
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}

export default ProfilePage;
