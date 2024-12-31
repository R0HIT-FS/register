import React from 'react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"


const InfoCard = ({user}) => {
  return (
    // <div className='w-[80vw] md:w-[20vw] h-[60vh] md:h-[60vh] rounded-lg overflow-hidden shadow-2xl'>
    //     <div className='w-full h-1/2 p-5 bg-white text-[#AB7F69] flex items-center justify-center'>
    //     <h1 className='text-3xl font-semibold capitalize'>{user?.name}</h1>
    //     </div>
    //     <div className='w-full h-1/2 bg-[#AB7F69] text-white flex flex-col items-start justify-center gap-2 p-5'>
    //         <p className='font-medium'>Age : <span className='font-normal'>{user?.age}</span></p>
    //         <p className='font-medium'>Contact : <span className='font-normal'>{user?.phone}</span></p>
    //         <p className='font-medium'>Gender : <span className='capitalize font-normal'>{user?.gender}</span></p>
    //         <p className='font-medium'>Payment : {user?.paid.toLowerCase()=="yes"?<span className='capitalize font-normal px-2 rounded-full bg-green-500'>Done</span>:<span className='capitalize font-normal px-2 rounded-full bg-red-500'>Pending</span>}</p>
    //         <Link href={`/edit/${user._id}`} className=' mt-2 py-1 px-2 rounded-lg bg-amber-700 text-white hover:text-gray-300'>Edit Member</Link>
    //     </div>
    // </div>
    <Card className='w-full sm:w-[350px] md:w-[350px] h-1/3 border-2 border-[#27272A] bg-transparent text-white'>
  <CardHeader>
    <CardTitle className='text-2xl'>{user?.name}</CardTitle>
    {/* <CardDescription className='text-md'>{user?.age}</CardDescription> */}
  </CardHeader>
  <CardContent className='flex flex-col'>
    <p className='font-light  bg-[#18181A] mb-1 p-3 rounded-md'>Age : <span className='font-medium'>{user?.age}</span></p>
    <p className='font-light  bg-[#18181A] mb-1 p-3 rounded-md'>Contact : <span className='font-medium'>{user?.phone}</span></p>
    <p className='font-light  bg-[#18181A] mb-1 p-3 rounded-md'>Gender : <span className='capitalize font-medium'>{user?.gender}</span></p>
    <p className='font-light  bg-[#18181A] p-3 rounded-md'>Payment : {user?.paid.toLowerCase()=="yes"?<span className='capitalize font-normal px-2 rounded-full bg-green-500'>Done</span>:<span className='capitalize font-normal px-2 rounded-full bg-red-500'>Pending</span>}</p>
    <p className='font-light  bg-[#18181A] mb-1 p-3 rounded-md'>Transaction ID:<span className='capitalize font-medium'>{user?.transaction}</span></p>
  </CardContent>
  <CardFooter>
    {/* <p>Card Footer</p> */}
    <Link href={`/edit/${user._id}`} className={`${buttonVariants({ variant: "secondary" })} mt-2 py-1 px-2 rounded-lg`}>Edit Member</Link>
  </CardFooter>
</Card>
  )
}

export default InfoCard