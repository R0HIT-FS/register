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
    <div className="flex w-full p-5 justify-between items-center md:px-10 sticky top-0 z-[1000] bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg" >
      <OverlayMenu isOpen={isOpen} toggleNavbar={toggleNavbar}/>
        <Link href="/"><div className="text-3xl font-bold uppercase"><h1>registration</h1></div></Link>
        <div className="flex gap-5 items-center">
            <button className="font-normal" onClick={toggleNavbar}>Menu</button>
        </div>
    </div>
  )
}

export default Navbar