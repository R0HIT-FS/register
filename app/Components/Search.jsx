"use client"
import React, { useState } from 'react'
import { useSearchParams,usePathname,useRouter } from 'next/navigation';


const Search = () => {
    const [search, setsearch] = useState('');
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname()
    const {replace} = useRouter();
    
    const handleChange=(e)=>{
        setsearch(e.target.value);

        if(e.target.value){
            params.set("query",e.target.value)
        }else{
            params.delete("query")
        }
        replace(`${pathname}?${params.toString()}`)
    }
  return (
    <div className='w-full rounded-lg mb-4'>
        <input className='w-full rounded-lg p-2 border-2 border-zinc-400' type="text"  placeholder='Search Member....' onChange={handleChange} defaultValue={searchParams.get("query")?.toString()}/>
    </div>
  )
}

export default Search