import Image from "next/image";
import Link from "next/link";
import Nav from "./components/Nav";


export default function Home() {
  return (
    <div  className=" bg-[#ffffff] h-screen mt-18">
     <Nav/>
      <div className="px-4 ">
         <div>
        <Image src={'/espointtower.jpg'} alt="ESPOINT" width={150} height={150} className="mx-auto rounded-md"/>
      </div>
        <h1 className="font-bold text-5xl text-center mt-6">Book Your Perfect <span className="text-[#d4731e]">Experience</span></h1>
        <p className="text-black font-sm text-[20px] text-center mt-5 max-w-lg mx-auto">Discover and book unique accommodations, experiences, and services tailored to your preferences. From luxury retreats to cozy getaways, find exactly what you're looking for.</p>

        <div className="grid py-7 flex-col-1 gap-3 max-w-md mx-auto lg:flex md:gap-2">
          <Link href={"/login"} className=""><button className="text-white bg-[#d4731e] p-2 w-full rounded-full"> Login </button></Link>
          <button className="text-center w-full p-2 bg-white border-2 rounded-full border-black"><Link href={"/signup"}> Signup</Link></button>
        </div>
      </div>
    </div>
  );
}
