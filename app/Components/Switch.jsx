"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Switch = (props) => {

  const pathname = usePathname();
  return (
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2 bg-transparent border-2 border-[#27272A] w-fit rounded-full mb-4 p-1">
        <Link
          href={`/${props.gridlink}`}
          className={`uppercase text-md font-semibold px-2 py-1 rounded-full ${pathname == `/${props.gridlink}`? "activeSwitchLink" :"text-zinc-500"}`}
        >
          Grid VIEW
        </Link>
        <Link
          href={`/${props.tablelink}`}
          className={`uppercase text-md font-semibold px-2 py-1 rounded-full ${pathname == `/${props.tablelink}`? "activeSwitchLink" :"text-zinc-500"}`}
        >
          Table View
        </Link>
      </div>
    </div>
  )
}

export default Switch;