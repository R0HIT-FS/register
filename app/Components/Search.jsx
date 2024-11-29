"use client"
import React, { useState } from 'react'
import { useSearchParams,usePathname,useRouter } from 'next/navigation';
import { IoMdCloseCircle } from "react-icons/io";


const Search = () => {
    const [search, setsearch] = useState('');
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname()
    const {replace} = useRouter();
    

    const handleClick =()=>{
        document.getElementById("search").value=""
        setsearch("")
        replace(`${pathname}`)
    }

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
    <div className='w-full rounded-lg mb-4 flex items-center gap-3'>
        <input className='w-full rounded-lg p-2 border-2 border-zinc-400' id='search' type="text"  placeholder='Search Member....' onChange={handleChange} defaultValue={searchParams.get("query")?.toString()}/><span className={`${parseInt(search.length)>0? "block":"hidden"} transition-all`} onClick={handleClick}><IoMdCloseCircle className='text-white' size={"1.6em"} /></span>
    </div>
  )
}

export default Search