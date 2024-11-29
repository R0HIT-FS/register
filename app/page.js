import React from 'react';
import AddMember from './Components/AddMember';
import Search from './Components/Search';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Switch from './Components/Switch';
import GenderTabs from "./Components/GenderTabs"
import View from './Components/View';
const MemberCard = dynamic(() => import('./Components/MemberCard'), {
  loading: () => <div className='sm:h-[30vw] md:h-[15vw] sm:w-[300px] w-[200px] h-[40vw] bg-zinc-200 rounded-lg animate-pulse'></div>,
  ssr: false,
});

const getMembers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch members');
    }

    const data = await res.json();

    // Ensure data is an array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    return []; // Return an empty array on error
  }
};

const Page = async ({ searchParams }) => {
  const data = await getMembers();
  const query = searchParams?.query || '';

  const filteredMembers = (data ?? []).filter(member =>
    member.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-5 md:p-10 w-full bg-[#09090B]">
      <Search />
      <Switch gridlink={""} tablelink={"table"}/>
      <AddMember/>
      <GenderTabs tab1={"tab"} tab2link={"boys"} tab3link={"girls"} data={data}/>
      <View grid={"true"} filteredMembers={filteredMembers}/>
    </div>
  );
};

export default Page;