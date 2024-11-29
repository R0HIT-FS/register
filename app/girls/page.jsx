import React from 'react'
// import MemberCard from '../Components/MemberCard';
import Link from 'next/link';
import AddMember from '../Components/AddMember';
import Search from '../Components/Search';
import dynamic from 'next/dynamic';
import Switch from "@/app/Components/Switch";
import GenderTabs from '../Components/GenderTabs';
const MemberCard = dynamic(() => import('../Components/MemberCard'), {
  loading: () => <div className='sm:h-[30vw] md:h-[15vw] sm:w-[300px] w-[200px] h-[40vw] bg-zinc-200 rounded-lg'></div>,
  ssr: false,
});



const getGirls = async()=>{
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`,{
      cache:"no-store"
    });
    if (!res.ok) {
      throw new Error('Failed to fetch Girls');
    }

    const data = await res.json();

    // Ensure data is an array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    return []; // Return an empty array on error
  }

}
const page = async({searchParams}) => {
  const data = await getGirls();
  const query = searchParams?.query || "";

  const girls = data.filter((girl)=>girl.gender.toLowerCase()=="female")

  const filteredMembers = girls.filter(member =>
    member.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="p-5 md:p-10 bg-[#09090B]">
      <Search/>
      <Switch gridlink={"girls"} tablelink={"table/girls"}/>
      <AddMember/>
    <GenderTabs tab1link={"/"} tab2link={"boys"} tab3={"tab"} data={girls}/>
    <div className="min-h-screen relative flex flex-wrap-reverse md:flex-wrap items-end content-end md:content-start gap-4 justify-center">
      {filteredMembers?.length>0?
            
            filteredMembers.map((user,i)=>{
                return <MemberCard key={i} user={user}/>
              })
              
      :
      <h1 className='text-white'>No Members Added Yet!</h1>
      }

    </div>

    </div>
  )
}

export default page