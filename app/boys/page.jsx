import React from "react";
import Link from "next/link";
import AddMember from "../Components/AddMember";
import Search from "../Components/Search";
import Switch from "../Components/Switch";

import dynamic from 'next/dynamic';
import GenderTabs from "../Components/GenderTabs";
import View from "../Components/View";
const MemberCard = dynamic(() => import('../Components/MemberCard'), {
  loading: () => <div className='sm:h-[30vw] md:h-[15vw] sm:w-[300px] w-[200px] h-[40vw] bg-zinc-200 rounded-lg'></div>,
  ssr: false,
});

const getBoys = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error('Failed to fetch Boys');
    }

    const data = await res.json();

    // Ensure data is an array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    return []; // Return an empty array on error
  }
};
const page = async ({ searchParams }) => {
  const data = await getBoys();
  const query = searchParams?.query || "";
  // console.log(query);
  const boys = data.filter((boy)=>boy.gender.toLowerCase()=="male")

  const filteredMembers = boys.filter((member) =>
    member.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="p-5 md:p-10 bg-[#09090B]">
      <Search />
      <Switch gridlink={"boys"} tablelink={"table/boys"}/>
      <AddMember />
      <GenderTabs tab1link={"/"} tab2={"tab"} tab3link={"girls"} data={boys}/>
      <View grid={"true"} filteredMembers={filteredMembers}/>
    </div>
  );
};

export default page;
