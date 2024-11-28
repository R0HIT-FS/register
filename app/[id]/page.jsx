import React from 'react'
import Link from 'next/link';
import dynamic from 'next/dynamic';
const InfoCard = dynamic(() => import('../Components/InfoCard'), {
    loading: () => <div className='w-full md:w-[350px] h-[60vh] md:h-[60vh] rounded-lg bg-gray-200 animate-pulse'></div>,
    ssr: false,
  });

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
    <div className={`w-full h-screen bg-[#09090B]`}
    >
    <Link href="/"><button className='px-4 py-1 hover:bg-gray-500 text-sm text-white rounded-full m-4'>Back to home</button></Link>
    <div className='p-10 w-full flex flex-col justify-center items-center gap-5'>
        <InfoCard user={data}/>
    </div>
    </div>
  )
}

export default page