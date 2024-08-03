import Link from 'next/link'
import React from 'react'

const OverlayMenu = ({isOpen,toggleNavbar}) => {
  return (
    <div className={`transition w-full h-screen bg-yellow-100 absolute top-0 left-0 z-20 ${isOpen ? "open":"overlaymenu"}`}>
            <div className="flex w-full p-5 justify-between items-center md:px-10" >
        <div className="text-3xl font-bold uppercase"><h1>registration</h1></div>
        <div>
            <button className="font-normal" onClick={toggleNavbar}>Close</button>
        </div>
    </div>
        <div className='p-4 flex flex-col items-center justify-center w-full h-2/3 gap-3'>
        <Link href={"/"} onClick={toggleNavbar} className='hover:underline text-xl font-semibold uppercase tracking-tighter'>Grid View</Link>
        <Link href={"/table"} onClick={toggleNavbar} className='hover:underline text-xl font-semibold uppercase tracking-tighter'>Table view</Link>
        <Link href={"/add-member"} onClick={toggleNavbar} className='hover:underline text-xl font-semibold uppercase tracking-tighter'>Add A Member</Link>
        <Link href={"/filter?minAge=1&maxAge=100"} onClick={toggleNavbar} className='hover:underline text-xl font-semibold uppercase tracking-tighter'>Filter By Age</Link>
        <Link href={"/drop"} onClick={toggleNavbar} className='text-red-500 hover:underline text-xl font-semibold uppercase tracking-tighter'>Delete all data</Link>
        </div>
    </div>
  )
}

export default OverlayMenu