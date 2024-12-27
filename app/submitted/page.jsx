import React from 'react'
import success from "@/public/success screen.webp"

const page = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-[#09090B]'>
        <div className='h-1/6 w-1/6 rounded-lg overflow-hidden  mb-4'>
        <img className='object-cover' src={success.src} alt="baby" /></div>
        <h1 className='text-white text-4xl'>Form Submitted!</h1>
    </div>
  )
}

export default page