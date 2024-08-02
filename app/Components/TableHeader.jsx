import React from 'react'

const TableHeader = () => {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-gray-200 rounded-lg">
        <p className="text-left w-1/3 font-semibold">Name</p>
        <p className="text-center w-1/3 hidden md:block font-semibold">Age</p>
        <p className="text-center w-1/3 hidden md:block font-semibold">Gender</p>
        <p className="text-center w-1/3 hidden md:block font-semibold">Contact</p>
        <p className="text-center w-1/3 hidden md:block font-semibold">Status</p>
        <p className="text-center w-1/3 font-semibold">Details</p>
        <p className="text-center w-1/3 font-semibold">Delete</p>
    </div>
  )
}

export default TableHeader