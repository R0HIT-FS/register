"use client"
import Link from 'next/link';
import React from 'react'
// import { FiPlus } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import { GoPlus } from "react-icons/go";

const AddMember = () => {
  return (
    <Link title='Add A Member' href="/add-member"><div className="p-2 bg-[#27272A] text-white flex items-center justify-center rounded-full fixed bottom-5 right-[2%] z-[80]">
        {/* <IoMdPersonAdd size={"1.5em"} /> */}
        <GoPlus size={"1.5em"}/>
    </div>
    </Link>
  )
}

export default AddMember