import Image from "next/image";
import Link from "next/link";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Nav />
      <div className="flex flex-col h-screen items-center justify-center px-4">

        <h1 className="font-bold text-5xl text-center mt-2 mb-4">
          ESTrans<span className="text-[#d4731e]">Pro</span>
        </h1>
        <p className="text-black text-lg text-center mt-2 mb-8 max-w-xl mx-auto">
          Your luxury is our concern. Create your account today and access the best services and products that suit your needs. Classy photography, modern outfit alignment, event planning and management, and more.
        </p>
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
          <Link href="/login" className="w-full">
            <button className="text-white bg-[#d4731e] p-3 w-full rounded-full font-semibold shadow hover:bg-[#b85c13] transition-colors">
              Login
            </button>
          </Link>
          <Link href="/signup" className="w-full">
            <button className="w-full p-3 bg-white border-2 rounded-full border-[#d4731e] text-[#d4731e] font-semibold shadow hover:bg-[#fffbed] transition-colors">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}