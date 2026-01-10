"use client";

import React, { useState, useEffect } from "react";
import Loader from "../components/Loading";
import Nav from "../components/Nav";
import RequireAuth from "../components/RequireAuth";
import { useRouter } from "next/navigation";
import Foot from "../components/Foot";

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
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    let token = localStorage.getItem("authToken");

    if (!storedUser?.username) {
      setError("No user found in session. Please synchronize again.");
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

        if (!res.ok) throw new Error("Failed to fetch ecosystem user records");

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
      <div className="flex h-screen items-center justify-center bg-black">
        <Loader />
      </div>
    );

  if (error || !userInfo) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center px-6">
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-10 rounded-[40px] text-center font-bold shadow-2xl max-w-md w-full backdrop-blur-xl">
          <div className="bg-rose-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl shadow-[0_0_20px_rgba(244,63,94,0.3)]">!</div>
          <p className="text-2xl mb-4 tracking-tighter">Access denied</p>
          <p className="text-sm font-light text-rose-400/80 mb-8 leading-relaxed">
            {error || "Our central ecosystem ledger currently has no record of your profile data."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-8 py-4 bg-rose-500 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-rose-600 transition-all shadow-xl"
          >
            Retry Verification
          </button>
        </div>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="bg-gray-50 min-h-screen flex flex-col selection:bg-primary selection:text-black">
        <Nav />

        {/* Hero Header Section - Dark Branding */}
        <div className="relative pt-40 pb-32 px-6 overflow-hidden bg-[#050505] flex items-center justify-center">
          {/* Advanced Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] animate-bounce-slow"></div>
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          </div>

          <div className="relative z-10 text-center space-y-4">
            <div className="flex items-center justify-center gap-3 text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-6">
              <span className="w-12 h-[1px] bg-primary/50"></span>
              Profile Identification
              <span className="w-12 h-[1px] bg-primary/50"></span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              Ecosystem <span className="text-primary italic font-serif">Member</span>
            </h1>
            <p className="text-white/40 text-lg font-light tracking-wide max-w-lg mx-auto italic">
              Authenticated access to the ESPOINT premium management suite.
            </p>
          </div>
        </div>

        <main className="max-w-4xl mx-auto w-full px-6 -mt-20 pb-32 relative z-20">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left Column: Avatar & Quick Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#050505] border border-white/10 rounded-[48px] p-10 shadow-2xl space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all duration-700"></div>

                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 mx-auto rounded-[40px] bg-primary flex items-center justify-center text-black text-5xl font-black shadow-[0_20px_50px_rgba(var(--primary-rgb),0.3)] transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    {userInfo.first_name?.[0] || userInfo.username?.[0]}
                  </div>

                  <div className="mt-8 space-y-1">
                    <h2 className="text-3xl font-black text-white tracking-tight">
                      {userInfo.first_name} {userInfo.last_name}
                    </h2>
                    <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                      @{userInfo.username}
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="text-white/30 text-center">Account Tier</span>
                    <span className="text-primary text-center">Premium Hub</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="text-white/30 text-center">Status</span>
                    <span className="text-green-500 text-center flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-[40px] p-8 shadow-sm space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Security Node</h3>
                <button
                  onClick={() => router.push('/change_password')}
                  className="w-full flex items-center justify-between p-4 rounded-3xl bg-gray-50 hover:bg-primary/10 transition-all duration-300 group"
                >
                  <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">Security Credentials</span>
                  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Detailed Records */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-white border border-gray-100 rounded-[48px] p-12 shadow-2xl space-y-10 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Ecosystem Identifier</h3>
                </div>

                <div className="grid gap-8">
                  <RecordField label="First Designation" value={userInfo.first_name} />
                  <RecordField label="Final Designation" value={userInfo.last_name} />
                  <RecordField label="Central Alias" value={userInfo.username} />
                  <RecordField label="Registry Role" value="Standard Ecosystem Member" />
                </div>

                <div className="pt-10">
                  <div className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 italic text-gray-400 text-sm leading-relaxed">
                    "This profile record is synchronized with our global ESPOINT blockchain ledger, ensuring secure and verifiable access to premium services."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Foot />
      </div>
    </RequireAuth>
  );
};

const RecordField = ({ label, value }: { label: string; value: string }) => (
  <div className="group space-y-2 border-b border-gray-50 pb-6 last:border-0 hover:border-primary/20 transition-colors">
    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 group-hover:text-primary transition-colors">
      {label}
    </label>
    <p className="text-xl font-bold text-gray-900 tracking-tight">{value || "---"}</p>
  </div>
);

export default ProfilePage;

