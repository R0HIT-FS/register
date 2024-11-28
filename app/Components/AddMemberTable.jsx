"use client"
import Link from 'next/link';
import React from 'react'
// import { FiPlus } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import { GoPlus } from "react-icons/go";

const AddMemberTable = () => {
  return (
    <Link title='Add A Member' href="/add-member-table"><div className="p-2 bg-[#18181A] text-white flex items-center justify-center rounded-full ">
        <GoPlus size={"1.5em"}/>
    </div>
    </Link>
  )
}

export default AddMemberTable