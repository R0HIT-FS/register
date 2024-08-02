"use client"
import Link from 'next/link';
import React from 'react'
// import { FiPlus } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";

const AddMember = () => {
  return (
    <Link title='Add A Member' href="/add-member"><div className="h-[10vw] w-[10vw] md:h-[3vw] md:w-[3vw] bg-green-300 flex items-center justify-center rounded-full fixed bottom-2 right-2">
        <IoMdPersonAdd size={"1.5em"} />
    </div>
    </Link>
  )
}

export default AddMember