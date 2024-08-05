import React from "react";
import Link from "next/link";
import AddMember from "../Components/AddMember";
import Search from "../Components/Search";

import dynamic from 'next/dynamic';
const MemberCard = dynamic(() => import('../Components/MemberCard'), {
  loading: () => <div className='md:h-[15vw] md:w-[15vw] w-[60vw] h-[40vw] bg-zinc-200 rounded-lg'></div>,
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
    <div className="p-5 md:p-10">
      <Search />
      <div className="flex items-center gap-2 bg-gray-200 w-fit rounded-full mb-4 p-1">
        <Link
          href={`/`}
          className="uppercase text-md font-semibold bg-white px-2 py-1 rounded-full"
        >
          Grid VIEW
        </Link>
        <Link
          href={`/table`}
          className="uppercase text-md font-medium px-2 py-1 text-zinc-400"
        >
          Table View
        </Link>
      </div>
      <div className="mb-5 md:mb-10 flex justify-center md:justify-start items-center gap-4">
        <Link href={"/"}>
          <small className="px-4 py-1 rounded-full bg-gray-500 text-white">
            All
          </small>
        </Link>
        <small className="md:text-md font-semibold px-4 py-1 bg-blue-500 text-white rounded-full">
          Boys({boys?.length})
        </small>
        <Link href={"/girls"}>
          <small className="px-4 py-1 rounded-full bg-pink-500 text-white">
            Girls
          </small>
        </Link>
      </div>
      <div className="min-h-screen relative flex flex-wrap-reverse md:flex-wrap items-end content-end md:content-start gap-4 justify-center">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((user, i) => {
            return <MemberCard key={i} user={user} />;
          })
        ) : (
          <h1>No Members Added Yet!</h1>
        )}
      </div>
      <AddMember />
    </div>
  );
};

export default page;
