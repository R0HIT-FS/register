import React from 'react'
import success from "@/public/success screen.webp"

const page = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-start p-10 bg-[#09090B]'>
        <div className='h-[250px] w-[250px] rounded-lg overflow-hidden mb-1'>
        <img className='h-full w-full object-cover object-left' src={success.src} alt="baby" /></div>
        <h1 className='text-green-500 text-xl md:text-3xl text-center'>Form Submitted.</h1>
        <h3 className='text-white text-xl md:text-2xl mb-4 text-center'>We are pumped to see you there!</h3>
        <p className='text-white text-xl md:text-2xl mt-2'>Location:</p>
        <iframe className='h-[400px] w-full md:w-[500px]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.7303245927615!2d78.69873027493672!3d17.472616883429207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb765815870dad%3A0x11f0fea1b4dbb761!2sTENT%20-%20Carmel%20Campus!5e0!3m2!1sen!2sin!4v1735296873996!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

export default page