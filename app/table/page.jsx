import React from "react";
import TableHeader from "../Components/TableHeader"
import Search from "../Components/Search";
import Link from "next/link";
import AddMemberTable from "../Components/AddMemberTable";
import dynamic from "next/dynamic";
import Switch from "../Components/Switch";
const TableCard = dynamic(() => import('../Components/TableCard'), {
  loading: () => <div className='w-full animate-pulse flex items-center justify-start bg-zinc-500 mt-2 rounded-lg p-6'><p></p></div>,
  ssr: false,
});


const getMembers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch members");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ searchParams }) => {
  const data = await getMembers();
  const query = searchParams?.query || "";
  

  const filteredMembers = data.filter((member) =>
    member.name.toLowerCase().includes(query.toLowerCase())
  );
  const Boys = data.filter((member) =>
    member.gender.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="p-5 md:p-10 flex flex-col min-h-screen bg-[#09090B]">
    <Search />
    <Switch gridlink={""} tablelink={"table"}/>
      <AddMemberTable/>
    <div className='mb-5 md:mb-10 flex justify-center md:justify-start items-center gap-4'>
      <small className="md:text-md font-semibold px-4 py-1 bg-transparent border-2 border-[#27272A] text-white rounded-full">All({data.length})</small>
      <Link href={"/table/boys"} ><small className='px-4 py-1 rounded-full bg-[#27272A] border-2 border-[#27272A] text-white'>Boys</small></Link>
      <Link href={"/table/girls"} ><small className='px-4 py-1 rounded-full bg-[#27272A] border-2 border-[#27272A] text-white'>Girls</small></Link>
    </div>
    <TableHeader/>
    <div className="flex flex-col-reverse">

    {
      filteredMembers.length>0?
      filteredMembers.map((user,i)=>{
        return (
          <TableCard user={user} key={i}/>
                )
            }):
            <p className="capitalize">No members added yet!</p>
    }
          </div>
            
            </div>
  );
};

export default page;
