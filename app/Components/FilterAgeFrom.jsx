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
    const minAge = ageFrom || "1"
    const maxAge = ageTo || "100"
    replace(`${pathname}?minAge=${minAge.toString()}&maxAge=${maxAge.toString()}`)

  };

  return (
    <div>
        <h1 className="text-center md:text-center mb-5 text-xl font-semibold uppercase">Filter Members By Age</h1>
      <form className="flex flex-col md:flex-row items-center justify-center gap-3"
      onSubmit={handleSubmit}
      >
        <div className="from  flex gap-3 justify-center items-center flex-col md:flex-row">
        <input className="p-2 md:p-4 w-[150px] md:[200px] rounded-lg border-2 border-zinc-300" value={ageFrom} placeholder="From" onChange={handleFrom} type="number" required />
        </div>
        <div className="to  flex gap-3 justify-center items-center flex-col md:flex-row">
        <input className="p-2 md:p-4 w-[150px] md:[200px] rounded-lg border-2 border-zinc-300" value={ageTo} placeholder="To"
         onChange={handleTo} 
         type="number" 
         required
         />
         </div>

        <button className="p-2 md:p-4 rounded-lg bg-green-300" type="submit">Search</button>
      </form>
    </div>
  );
};

export default FilterAgeFrom;
