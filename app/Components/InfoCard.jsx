import React from 'react'
import Link from 'next/link'

const InfoCard = ({user}) => {
  return (
    <div className='w-[80vw] md:w-[20vw] h-[60vh] md:h-[60vh] rounded-lg overflow-hidden shadow-2xl'>
        <div className='w-full h-1/2 p-5 bg-white text-[#AB7F69] flex items-center justify-center'>
        <h1 className='text-3xl font-semibold capitalize'>{user?.name}</h1>
        </div>
        <div className='w-full h-1/2 bg-[#AB7F69] text-white flex flex-col items-start justify-center gap-2 p-5'>
            <p className='font-medium'>Age : <span className='font-normal'>{user?.age}</span></p>
            <p className='font-medium'>Contact : <span className='font-normal'>{user?.phone}</span></p>
            <p className='font-medium'>Gender : <span className='capitalize font-normal'>{user?.gender}</span></p>
            <p className='font-medium'>Payment : {user?.paid.toLowerCase()=="yes"?<span className='capitalize font-normal px-2 rounded-full bg-green-500'>Done</span>:<span className='capitalize font-normal px-2 rounded-full bg-red-500'>Pending</span>}</p>
            <Link href={`/edit/${user._id}`} className='text-black mt-2 py-1 px-2 rounded-lg bg-yellow-300'>Edit Member</Link>
        </div>
    </div>
  )
}

export default InfoCard