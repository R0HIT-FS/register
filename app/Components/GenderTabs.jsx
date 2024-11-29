"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const GenderTabs = ({tab1,tab1link,tab2,tab2link,tab3,tab3link,data}) => {
  return (
    <div className="mb-5 md:mb-10 flex justify-center md:justify-start items-center gap-4">
        {tab1 == "tab"?<small className="md:text-md font-semibold px-4 py-1 bg-transparent border-2 border-[#27272A] text-white rounded-full">
          All({data.length})
        </small>: <Link href={`/${tab1link}`}>
          <small className="px-4 py-1 rounded-full bg-[#27272A] border-2 border-[#27272A] text-white">All</small>
        </Link>}
        {tab2 == "tab"?<small className="md:text-md font-semibold px-4 py-1 bg-transparent border-2 border-[#27272A] text-white rounded-full">
          Boys({data.length})
        </small>: <Link href={`/${tab2link}`}>
          <small className="px-4 py-1 rounded-full bg-[#27272A] border-2 border-[#27272A] text-white">Boys</small>
        </Link>}
        {tab3 == "tab"?<small className="md:text-md font-semibold px-4 py-1 bg-transparent border-2 border-[#27272A] text-white rounded-full">
          Girls({data.length})
        </small>: <Link href={`/${tab3link}`}>
          <small className="px-4 py-1 rounded-full bg-[#27272A] border-2 border-[#27272A] text-white">Girls</small>
        </Link>}
        
      </div>
  )
}

export default GenderTabs