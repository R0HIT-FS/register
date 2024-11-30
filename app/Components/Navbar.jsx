"use client"
import React from 'react'
import OverlayMenu from './OverlayMenu'
import { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false)

  const toggleNavbar=()=>{
    setisOpen(!isOpen);
  }
  return (
    <div className="flex w-full p-5 justify-between items-center md:px-10 sticky top-0 z-[99] bg-[#09090B] border-b-2 border-[#27272A]" >
      <OverlayMenu isOpen={isOpen} toggleNavbar={toggleNavbar}/>
        <Link href="/"><div className="text-3xl font-bold uppercase text-white"><h1>registration</h1></div></Link>
        <div className="flex gap-5 items-center">
            <button className="font-normal text-white" onClick={toggleNavbar}>Menu</button>
        </div>
    </div>
  )
}

export default Navbar