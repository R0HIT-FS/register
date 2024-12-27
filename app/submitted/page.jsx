import React from 'react'
import success from "@/public/success screen.webp"
import { FaLocationDot } from "react-icons/fa6";

const page = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-start p-10 bg-[#09090B]'>
        <div className='h-[250px] w-[250px] rounded-lg overflow-hidden mb-1'>
        <img className='h-full w-full object-cover object-left' src={success.src} alt="baby" /></div>
        <h1 className='text-green-500 text-3xl text-center'>Form Submitted.</h1>
        <h3 className='text-white text-2xl mb-4 text-center'>We are pumped to see you there!</h3>
        <a href="https://maps.app.goo.gl/ED54tc8oRYcfwFas7" target='_blank'>
        <button className='px-4 py-2 bg-red-500 text-white text-2xl rounded-md flex items-center justify-center gap-2'><FaLocationDot className='text-white' /> Google Map Location</button></a>
    </div>
  )
}

export default page