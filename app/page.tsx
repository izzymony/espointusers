import Image from "next/image";



export default function Home() {
  return (
    <div className=" bg-white h-[100vh]">
      <div className="flex min-h-screen justify-center items-center p-4 ">
      <div className="p-5 w-full bg-[#f5f5f5] py-5 max-w-md shadow-lg rounded-md">
        <div className="mx-auto">
          <Image src={"/espointtower.jpg"} alt="" width={150} height={150} className="py-3 mx-auto "/>
        </div>
        <h1 className="text-[#475569] text-2xl  font-bold text-center md:text-3xl">Booking System</h1>

        <p className="text-[#475569] font-medium text-[14px] mt-2 text-center">Welcome to our professional booking platform</p>
        <div className="grid  grid-cols-1 gap-3 mt-5">
        <button className=" font-bold text-bold text-white bg-[#f5cf00] rounded-lg p-2 w-full">Book Appointment</button>
       <button className="font-bold border border-gray-300 rounded-lg p-2 w-full text-gray-500 hover:[background-color:#c6a821] active:[background-color:#c6a821] focus:[background-color:#c6a821] hover:text-white active:text-white focus:text-white">
  Login
</button>

<button className="font-bold border border-gray-300 rounded-lg p-2 w-full text-gray-500 hover:[background-color:#c6a821] active:[background-color:#c6a821] focus:[background-color:#c6a821] hover:text-white active:text-white focus:text-white">
  Sign Up
</button>

        </div>
      </div>
      </div>
    </div>
  );
}
