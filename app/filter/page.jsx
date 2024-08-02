import React from 'react'
import FilterAgeFrom from '../Components/FilterAgeFrom'
import Link from 'next/link';


const FilterByAge=async(minage,maxage)=>{
  try {
    const res = await fetch(`http://localhost:3000/api/filter?minAge=${minage}&maxAge=${maxage}`,{
      cache:"no-store"
    })
    if(!res.ok){
      throw new Error("Failed to fetch users!");
        }
        return res.json()
  } catch (error) {
    console.log(error)
  }
}

const page = async({searchParams}) => {
  const min = searchParams?.minAge || "";
  const max = searchParams?.maxAge || "";
  const filteredUsers = await FilterByAge(min,max)





  return (
    <div className='p-10 min-h-screen'>
        <FilterAgeFrom/>
        <p className='text-left font-semibold mt-4 px-10'>Members between age of age {min} and {max}({filteredUsers.length})</p> 
        <div className='px-10 py-5 flex flex-col md:flex-row flex-wrap gap-3 '>
            {filteredUsers.length>0?
            
            filteredUsers.map((user)=>{
              return <p key={user._id} className=' bg-[#E9C46A] text-center md:text-left text-sm md:text-lg capitalize whitespace-nowrap rounded-lg px-2 p-1'>{user.name} ({user.age})</p>
            })
          : <p className='text-center font-semibold text-lg w-full'>No Members in the specified range!</p>
          }
        </div>
    </div>
  )
}

export default page