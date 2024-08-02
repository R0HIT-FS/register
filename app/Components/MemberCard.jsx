import Link from "next/link";
import React from "react";

import { MdEdit } from "react-icons/md";
import DeleteButton from "./DeleteButton";
import Image from "next/image";


// const getImage = async()=>{
//   try {
//     const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.API_KEY}&query=abstract`)
//     return res.json()
//   } catch (error) {
//     console.log(error)
//   }
// }

const MemberCard = async({ user }) => {
  const colors = [
    "#EAE7E2",
    "#D7E2E8",
    "#B9CBD9",
    "#FCC9C5",
    "#FEDDD8",
    "#CFE3E2",
    "#fcc3a3",
    "#faedcd",
  ];

  const images = [
    "https://images.unsplash.com/photo-1680536555364-9dd4a1ab313e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1678257355149-6eda1755b1a2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1645323927877-3de25b4f819c?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1633430552351-51caf0fb16a8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1666696319287-a199c7bc2c64?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1697707903242-dc15a6b56d45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1650611250959-1e823abf6841?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1666718885155-be10a011641a?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1660069870507-30dc28e6645b?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1632292220916-e9c34dd75db2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1637216387853-4b305e78a9c5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];
    return randomImage;
  }
  const myRandomImage = getRandomImage();

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    return randomColor;
  }
  const myRandomColor = getRandomColor();

  function getInitials(fullName) {
    const names = fullName.split(" ");
    let initials = "";
    names.forEach((name) => {
      if (name.trim() !== "") {
        initials += name[0].toUpperCase();
      }
    });
    return initials;
  }
  const initials = getInitials(user.name);


  return (
    <div
      className="w-[60vw] md:w-[15vw] rounded-lg p-2 flex flex-col justify-between items-center gap-1 grow-0 bg-[#f8f8f8] bg-gradient-to-t from-[#f8f8f8] to-gray-100 shadow-lg"
      // style={{ backgroundColor: myRandomColor }}
    >
      <div className="w-full">

        <div className="membercircle flex justify-center items-center rounded-lg h-32 w-full overflow-hidden">
           {/* <img className="h-full w-full object-fit object-center" src={myRandomImage} alt="" />  */}
           <h1 className="h-16 w-16 flex items-center justify-center rounded-full font-semibold"
           style={{ backgroundColor: myRandomColor }}
           >{initials}</h1>
          </div>
      </div>
      <div className=" w-full flex justify-between items-start">
        <h4 className="font-semibold capitalize text-sm">{user.name} , <small>{user.age}</small></h4>
      </div>
      <div className="w-full">
        {user.paid.toLowerCase() === "yes"? <small className="px-2 bg-green-500 rounded-full text-white">Paid</small>:
        <small className="px-2 bg-red-500 rounded-full text-white">Not Paid</small>
      }
      </div>
      <div className="w-full flex justify-between items-center">
        <div>
          <Link href={`/${user._id}`}><small  className="text-gray-500 hover:text-blue-500">View Details.</small></Link>
        </div>
        <div className="flex items-center">
          <Link title="Edit" className="p-1 hover:bg-gray-300 rounded-full" href={`/edit/${user._id}`}><span><MdEdit/></span></Link>
          <DeleteButton id={user._id}/>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
