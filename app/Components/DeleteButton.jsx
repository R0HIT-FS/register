"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { AiFillDelete } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { Button } from "@/components/ui/button"

const DeleteButton = ({id}) => {
  const router = useRouter();
    const del=async()=>{
        // const confirmed = confirm("Are you sure you want to delete this member?")
        // if(confirmed){
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?id=${id}`,{
                method:"DELETE"
            })
        // }
        router.refresh();
        
    }
  return (
    <div title='Delete' onClick={del} className='w-full'>
    {/* <MdClose size={"1em"}/> */}
    <Button className="py-5 sm:py-5 w-full" variant="destructive">Delete</Button>
    </div>
  )
}

export default DeleteButton