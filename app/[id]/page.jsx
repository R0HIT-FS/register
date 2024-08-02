import React from 'react'
import Link from 'next/link';

const getUser=async(id)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,{
            cache:"no-store"
        })
        if(!res.ok){
            throw new Error("failed to fetch user");
        }
        return res.json()
    } catch (error) {
        console.log(error)
    }

}

const page = async({params}) => {
    const {id} = params;
    const data = await getUser(id)
      
  return (
    <div className={`w-full h-screen`}
    >
    <Link href="/"><button className='px-4 py-1 hover:bg-gray-500 text-sm rounded-full m-4'>Back to home</button></Link>
    <div className='p-10 h-[60vh] w-full flex flex-col justify-center items-center gap-5'>

        <div>
        </div>
        <div className=' p-4 rounded-lg  bg-white bg-opacity-20 backdrop-filter shadow-lg'>
            <h1 className='uppercase text-xl md:text-xl font-extrabold'>{data.name}</h1>
        <p className='font-semibold text-md md:text-lg'>ID : <span className='capitalize font-normal'>{data?._id}</span></p>
        <p className='font-semibold text-md md:text-lg'>Age : <span className='capitalize font-normal'>{data?.age}</span></p>
        <p className='font-semibold text-md md:text-lg'>Gender : <span className='capitalize font-normal'>{data?.gender}</span></p>
        <p className='font-semibold text-md md:text-lg'>Contact : <span className='capitalize font-normal'>{data?.phone}</span></p>
        <p className='font-semibold text-md md:text-lg'>Payment Status : <span className='capitalize font-normal'>{data?.paid.toLowerCase()=="yes"?"Paid":"Not Paid"}</span></p>
        <Link href={`/edit/${data?._id}`} className='text-blue-500'>Edit</Link>
        </div>
    </div>
    </div>
  )
}

export default page