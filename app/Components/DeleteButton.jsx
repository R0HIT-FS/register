"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { AiFillDelete } from "react-icons/ai";

const DeleteButton = ({id}) => {
  const router = useRouter();
    const del=async()=>{
        const confirmed = confirm("Are you sure you want to delete this member?")
        if(confirmed){
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?id=${id}`,{
                method:"DELETE"
            })
        }
        router.refresh();
        
    }
  return (
    <div title='Delete' onClick={del} className='p-1 hover:bg-gray-300 rounded-full'>
    <AiFillDelete size={"1em"}/>
    </div>
  )
}

export default DeleteButton