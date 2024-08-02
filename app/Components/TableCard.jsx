import Link from 'next/link'
import React from 'react'
import DeleteButton from './DeleteButton'

const TableCard = ({user}) => {
  return (
    <div className="w-full flex items-center justify-between p-4 border-b-2 border-zinc-200">
                    <p className="text-left  w-1/3 capitalize text-sm md:text-md font-medium">{user.name}</p>
                    <p className="text-center w-1/3 hidden md:block text-sm md:text-md">{user.age}</p>
                    <p className="text-center w-1/3 hidden md:block text-sm md:text-md">{user.gender}</p>
                    <p className="text-center w-1/3 hidden md:block text-sm md:text-md">{user.phone}</p>
                    <p className="text-center w-1/3 hidden md:block text-sm md:text-md">{user.paid.toLowerCase()=="yes"?<small className="px-2 bg-green-500 rounded-full text-white py-1">Paid</small>:<small className="px-2 py-1 bg-red-500 rounded-full text-white ">Pending</small>}</p>
                    <Link href={`/${user._id}`} className="text-center whitespace-nowrap w-1/3 text-blue-500 hover:underline text-sm md:text-md">View Details</Link>
                    <div className="text-center w-1/3 text-red-500 hover:underline flex justify-center"><DeleteButton id={user._id}/></div>
                    
                </div>
  )
}

export default TableCard