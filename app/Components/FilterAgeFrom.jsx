"use client";
import React, { useState } from "react";
import { useSearchParams,usePathname,useRouter } from 'next/navigation';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const FilterAgeFrom = () => {
  const [ageFrom, setageFrom] = useState("");
  const [ageTo, setageTo] = useState("");
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname()
  const {replace} = useRouter();

  const handleFrom = (e) => {
    setageFrom(e.target.value);
  };
  const handleTo = (e) => {
    setageTo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const minAge = ageFrom || "1"
    const maxAge = ageTo || "100"
    replace(`${pathname}?minAge=${minAge.toString()}&maxAge=${maxAge.toString()}`)
  };

  const handleRefresh = () =>{
    replace(`${pathname}?minAge=1&maxAge=100`)
    setageFrom("")
    setageTo("")
  }

  return (
    <div>
        <h1 className="text-center md:text-center mb-5 text-xl font-semibold uppercase text-white">Filter Members By Age</h1>
      <form className="flex flex-col md:flex-row items-center justify-center gap-3"
      onSubmit={handleSubmit}
      >
        <div className="from  flex gap-3 justify-center items-center flex-col md:flex-row">
        <Input className="p-2 py-6 md:p-4 md:py-6 w-[150px] md:[200px] rounded-lg border-2 border-[#18181B] text-white" value={ageFrom} placeholder="From" onChange={handleFrom} type="number" required />
        </div>
        <div className="to  flex gap-3 justify-center items-center flex-col md:flex-row">
        <Input className="p-2 py-6 md:p-4 md:py-6 w-[150px] md:[200px] rounded-lg border-2 border-[#18181B] text-white" value={ageTo} placeholder="To"
         onChange={handleTo} 
         type="number" 
         required
         />
         </div>
        <Button variant="secondary" className="p-2 py-6 px-14 md:p-4 md:py-6" type="submit">Search</Button>
      </form>
      <div className="w-full flex justify-center items-center px-[calc(50vw-100px)]">
      {/* <button className="md:w-[300px] w-[200px] p-2 text-center mx-auto md:p-4 cursor-pointer rounded-lg bg-green-300" onClick={handleRefresh}>Refresh</button> */}
      <Button variant="outline" className="p-2 py-6 px-14 md:p-4 md:py-6 mt-4" onClick={handleRefresh}>Refresh</Button>
      </div>
    </div>
  );
};

export default FilterAgeFrom;
