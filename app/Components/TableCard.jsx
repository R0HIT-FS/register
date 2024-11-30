import Link from 'next/link'
import React from 'react'
import DeleteButton from './DeleteButton'

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const TableCard = ({user}) => {
  return (
    <div className="tile w-full flex items-center justify-between p-4 border-b-2 border-[#27272A]">
                    <p className="text-left  w-1/3 capitalize text-sm md:text-md font-medium text-white">{user.name}</p>
                    <p className="text-center w-1/3 hidden md:block text-sm md:text-md text-white">{user.age}</p>
                    <p className="text-center w-1/3 hidden md:block text-sm md:text-md text-white">{user.gender}</p>
                    <p className="text-center w-1/3 hidden md:block text-sm md:text-md text-white">{user.phone}</p>
                    <p className="text-center w-1/3 hidden md:block text-sm md:text-md text-white">{user.paid.toLowerCase()=="yes"?<small className="px-2 bg-green-500 rounded-full text-white py-1">Paid</small>:<small className="px-2 py-1 bg-red-500 rounded-full text-white ">Pending</small>}</p>
                    <Link href={`/${user._id}`} className="text-center whitespace-nowrap w-1/3 text-white hover:text-zinc-300 text-sm md:text-md">View Details</Link>
                    <div className="text-center w-1/3 text-red-500 hover:underline flex justify-center"><AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="py-4 sm:py-2" variant="destructive">Del</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#09090B] backdrop-blur-3xl border-[1px] border-[#27272A]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-transparent hover:bg-transparent"><DeleteButton id={user._id} /></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog></div>
                    
                </div>
  )
}

export default TableCard