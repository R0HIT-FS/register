import React from 'react'
import dynamic from 'next/dynamic';

const MemberCard = dynamic(() => import('../Components/MemberCard'), {
    loading: () => <div className='sm:h-[30vw] md:h-[15vw] sm:w-[300px] w-full h-[40vw] bg-zinc-200 rounded-lg animate-pulse'></div>,
    ssr: false,
  });


  const TableCard = dynamic(() => import("../Components/TableCard"), {
    loading: () => (
      <div className="w-full animate-pulse flex items-center justify-start bg-zinc-500 mt-2 rounded-lg p-6">
        <p></p>
      </div>
    ),
    ssr: false,
  });

const View = ({grid,table,filteredMembers}) => {
  return (
    <>
    {grid === "true"?<div className="min-h-screen relative flex flex-wrap-reverse md:flex-wrap items-end content-end md:content-start gap-4 justify-center">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((user, i) => <MemberCard key={i} user={user} />)
        ) : (
          <h1 className='text-white'>No Members Added Yet!</h1>
        )}
      </div>:<div className="flex flex-col-reverse">
      {filteredMembers.length > 0 ? (
        filteredMembers.map((user, i) => {
          return <TableCard user={user} key={i} />;
        })
      ) : (
        <p className="capitalize ">No members added yet!</p>
      )}
    </div>}
    </>
  )
}

export default View