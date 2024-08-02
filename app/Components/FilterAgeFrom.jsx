"use client";
import React, { useState } from "react";
import { useSearchParams,usePathname,useRouter } from 'next/navigation';

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
    // console.log("from:",ageFrom)
    // console.log("to:",ageTo)
    const minAge = ageFrom || "1"
    const maxAge = ageTo || "100"
    replace(`${pathname}?minAge=${minAge.toString()}&maxAge=${maxAge.toString()}`)

  };

  return (
    <div>
        <h1 className="text-center md:text-left text-xl font-semibold uppercase">Filter Members By Age</h1>
      <form className="flex flex-col md:flex-row items-center justify-center gap-3"
      onSubmit={handleSubmit}
      >
        <span className="text-xsm md:text-lg">From:</span>
        <input className="p-2 md:p-4 rounded-lg border-2 border-zinc-300" value={ageFrom} placeholder="Enter Age.." onChange={handleFrom} type="number" required />
        <span className="text-xsm md:text-lg">To:</span>
        <input className="p-2 md:p-4 rounded-lg border-2 border-zinc-300" value={ageTo} placeholder="Enter Age.."
         onChange={handleTo} 
         type="number" 
         required
         />
        <button className="p-2 md:p-4 rounded-lg bg-green-300" type="submit">Search</button>
      </form>
    </div>
  );
};

export default FilterAgeFrom;
