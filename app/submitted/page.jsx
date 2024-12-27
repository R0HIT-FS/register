import React from 'react'
import success from "@/public/success screen.webp"
import { FaLocationDot } from "react-icons/fa6";

const page = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-[#09090B]'>
        <div className='h-[250px] w-[250px] rounded-lg overflow-hidden mb-1'>
        <img className='h-full w-full object-cover object-left' src={success.src} alt="baby" /></div>
        <h1 className='text-white text-2xl text-center'>Form Submitted.</h1>
        <h3 className='text-white text-3xl mb-4 text-center'>We are pumped to see you there!</h3>
        <a href="https://www.google.com/maps/place/TENT+-+Carmel+Campus/@17.4726169,78.7013052,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb765815870" target='_blank'>
        <button className='px-4 py-2 bg-green-500 text-white text-2xl rounded-md flex items-center justify-center gap-2'><FaLocationDot className='text-white' /> Google Map Location</button></a>
    </div>
  )
}

export default page