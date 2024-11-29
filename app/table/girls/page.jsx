import React from "react";
import Search from "../../Components/Search";
import Link from "next/link";
import AddMemberTable from "../../Components/AddMemberTable";
import TableHeader from "../../Components/TableHeader";
import dynamic from "next/dynamic";
import Switch from "@/app/Components/Switch";
import GenderTabs from "@/app/Components/GenderTabs";

const TableCard = dynamic(() => import('../../Components/TableCard'), {
  loading: () => <div className='w-full animate-pulse flex items-center justify-start bg-gray-100 rounded-lg p-4'><p>Loading...</p></div>,
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

  const girls = data.filter((girl)=>girl.gender.toLowerCase()=="female")

  const filteredMembers = girls.filter(member =>
    member.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="p-5 md:p-10 flex flex-col min-h-screen bg-[#09090B]">
      <Search />
      <Switch gridlink={`girls`} tablelink={`table/girls`}/>
      <AddMemberTable/>
      <GenderTabs tab1link={"table"} tab2link={"table/boys"} tab3={"tab"} data={girls}/>
      <TableHeader/>
      <div className="flex flex-col-reverse">


      {filteredMembers.length > 0 ? (
        filteredMembers.map((user, i) => {
          return (
            <TableCard key={i} user={user}/>
          );
        })
      ) : (
        <p className="capitalize">No members added yet!</p>
      )}
            </div>
    </div>
  );
};

export default page;
