import React from "react";
import Search from "../../Components/Search";
import Link from "next/link";
import TableHeader from "../../Components/TableHeader";
import dynamic from "next/dynamic";
import Switch from "../../Components/Switch";
import AddMemberTable from "../../Components/AddMemberTable";
import GenderTabs from "@/app/Components/GenderTabs";
import View from "@/app/Components/View";
const TableCard = dynamic(() => import("../../Components/TableCard"), {
  loading: () => (
    <div className="w-full animate-pulse flex items-center justify-start bg-gray-100 rounded-lg p-4">
      <p>Loading...</p>
    </div>
  ),
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

  const boys = data.filter((boy) => boy.gender.toLowerCase() == "male");

  const filteredMembers = boys.filter((member) =>
    member.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="p-5 md:p-10 flex flex-col min-h-screen bg-[#09090B]">
      <Search />
      <Switch gridlink={"boys"} tablelink={"table/boys"} />
      <AddMemberTable />
      <GenderTabs
        tab1link={"table"}
        tab2={"tab"}
        tab3link={"table/girls"}
        data={boys}
      />
      <TableHeader />
      <View grid={"false"} filteredMembers={filteredMembers} />
    </div>
  );
};

export default page;
