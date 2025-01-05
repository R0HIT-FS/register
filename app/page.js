// import React from 'react';
// import AddMember from './Components/AddMember';
// import Search from './Components/Search';
// import Link from 'next/link';
// import dynamic from 'next/dynamic';
// import Switch from './Components/Switch';
// import GenderTabs from "./Components/GenderTabs"
// import View from './Components/View';
// const MemberCard = dynamic(() => import('./Components/MemberCard'), {
//   loading: () => <div className='sm:h-[30vw] md:h-[15vw] sm:w-[300px] w-[200px] h-[40vw] bg-zinc-200 rounded-lg animate-pulse'></div>,
//   ssr: false,
// });

// const getMembers = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       throw new Error('Failed to fetch members');
//     }

//     const data = await res.json();

//     // Ensure data is an array
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.error(error);
//     return []; // Return an empty array on error
//   }
// };

// const Page = async ({ searchParams }) => {
//   const data = await getMembers();
//   const query = searchParams?.query || '';

//   const filteredMembers = (data ?? []).filter(member =>
//     member.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="p-5 md:p-10 w-full bg-[#09090B]">
//       <Search />
//       <Switch gridlink={""} tablelink={"table"}/>
//       <AddMember/>
//       <GenderTabs tab1={"tab"} tab2link={"boys"} tab3link={"girls"} data={data}/>
//       <View grid={"true"} filteredMembers={filteredMembers}/>
//     </div>
//   );
// };

// export default Page;

"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { toast } from 'react-toastify';
import { IoMdArrowBack } from "react-icons/io";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import logo from "@/public/the-bridge.jpg"
import qr from "@/public/harsha-qr.jpeg"

const page = () => {
  const router = useRouter();

  const { toast } = useToast();

  const [btntext, setbtntext] = useState("Submit");
  const [dis, setdis] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    gender: "",
    paid: "",
    method:"",
    transaction: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClick = () => {
    setbtntext(
      <>
        <Loader2 className="animate-spin" />
        Please wait
      </>
    );
    setdis(true);
  };
  function handleToast() {
    toast({
      title: "Registration Successful",
      description: "Cheers!",
      className: "z-[100] bg-green-500 border-none",
      duration: 3000,
    });
  }

  function handleError() {
    toast({
      title: "Another user with this exact name already exists!",
      description: "Please try again.",
      variant: "destructive",
      className: "z-[100] bg-red-500 text-white",
      duration: 3000,
    });
  }

  function handleContact() {
    toast({
      title: "Contact No. or Age Invalid!",
      description: "Please check.",
      variant: "destructive",
      className: "z-[100] bg-yellow-500 text-black",
      duration: 3000,
    });
  }

  const preventEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClick();
    // document.getElementById("form").addEventListener("keydown", (event) => {
    //   if (event.key === "Enter") {
    //     event.preventDefault();
    //     return; // Prevent the Enter key's default action
    //   }
    // });
    try {
      const phone = document.getElementById("phone").value;
      const age = document.getElementById("age").value;

      if (phone.length !== 10 || age < 0 || age == "") {
        // alert("Contact No. or Age Invalid!");
        handleContact();
        setbtntext("Submit");
        setdis(false);
      } else {
        // Check if the exact user already exists
        // const checkRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?name=${encodeURIComponent(formData.name)}`);
        const checkRes = await fetch(
          `https://register-the-bridge.vercel.app/api/users?name=${encodeURIComponent(
            formData.name
          )}`
        );
        const existingUser = await checkRes.json();

        // Normalize names by removing spaces, punctuation, and making them lowercase
        const normalizeName = (name) =>
          name.toLowerCase().replace(/[\s._]/g, "");

        // Filter the results to see if a normalized match exists
        const exactMatch = existingUser.some(
          (user) => normalizeName(user.name) === normalizeName(formData.name)
        );

        if (exactMatch) {
          // toast.error("User with this exact name already exists!", {
          //     closeOnClick: true,
          //     draggable: true,
          //     theme: "dark",
          //     autoClose: 3000,
          // });
          handleError();
          setbtntext("Submit");
          setdis(false);
        } else {
          // Proceed with adding the new user
          // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
          const res = await fetch(
            `https://register-the-bridge.vercel.app/api/users`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          if (res.ok) {
            router.push("/submitted");
            router.refresh();
            // setdis(true);
            // toast.success("Member Added Successfully", {
            //     closeOnClick: true,
            //     draggable: true,
            //     theme: "dark",
            //     autoClose: 3000,
            // });
            handleToast();
          } else {
            throw new Error("Failed to create user!");
          }
        }
      }
    } catch (error) {
      console.log(error);
      setbtntext("Submit");
      setdis(false);
    }
  };

  return (
    <div className="p-5 md:p-10 min-h-screen bg-[#09090B]">
      {/* <Link href={"/"} className='inline-block mb-10'><p className='w-fit flex items-center gap-2  px-2 rounded-full hover:bg-[#18181B] text-white'><IoMdArrowBack /><span>Back To Home</span></p></Link> */}
      {/* <h1 className="text-2xl mb-5 md:mb-10 font-bold text-center text-white">Add A Member</h1>    */}
      <div className="flex justify-center items-center">
        {/* <form className="flex flex-col gap-2 items-start" action="" onSubmit={handleSubmit}>
            <input required onChange={handleChange} name='name' value={formData.name} className="px-4 py-2 rounded-md border-2 border-zinc-700" type="text" placeholder="Enter Name..." />
            <input required id='phone' onChange={handleChange} name='phone' value={formData.phone} className="px-4 py-2 rounded-md border-2 border-zinc-700"  type="number" placeholder="Enter Contact Number"/>
            <input required id="age" onChange={handleChange} name='age' value={formData.age} className="px-4 py-2 rounded-md border-2 border-zinc-700" type="number" placeholder="Enter Age..." />
            <select onChange={handleChange} name='gender' value={formData.gender} className="w-full px-4 py-2 rounded-md border-2 border-zinc-700"  id="">
                <option value="Select Gender">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select onChange={handleChange} name='paid' value={formData.paid} className="w-full px-4 py-2 rounded-md border-2 border-zinc-700"  id="">
                <option value="Registration Fee Paid">Registration Fee Paid</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <button id='addBtn' className="px-4 py-2 rounded-md text-white bg-green-500">Submit</button>
        </form> */}
        <Card className=" w-full sm:[350px] md:w-[350px] bg-transparent text-white border-2 border-[#27272A] ">
          <CardHeader>
            <CardTitle className="mb-2">REGISTER</CardTitle>
            <CardDescription className="w-full flex justify-center">
              <div className="w-full sm:w-[300px]">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={logo}
                    alt="Image"
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="form" onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    className="border-2 border-[#27272A] bg-[#18181A] py-6"
                    type="text"
                    id="name"
                    required
                    placeholder="Enter Name"
                    onChange={handleChange}
                    name="name"
                    value={formData.name}
                    onKeyDown={preventEnterKey}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Contact No.</Label>
                  <Input
                    className="border-2 border-[#27272A] bg-[#18181A] py-6"
                    type="number"
                    id="phone"
                    required
                    placeholder="Enter Contact"
                    onChange={handleChange}
                    name="phone"
                    value={formData.phone}
                    onKeyDown={preventEnterKey}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    className="border-2 border-[#27272A] bg-[#18181A] py-6"
                    type="number"
                    id="age"
                    required
                    placeholder="Enter Age"
                    onChange={handleChange}
                    name="age"
                    value={formData.age}
                    onKeyDown={preventEnterKey}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Gender</Label>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "gender", value },
                      })
                    }
                    required
                  >
                    <SelectTrigger
                      className="border-2 border-[#27272A] bg-[#18181A] py-6"
                      id="framework"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5 items-center justify-center mt-2 mb-6">
                  <p className="text-white text-center">Please scan the QR below for Online payment:</p>
                <div className="w-full  sm:w-[200px]">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={qr}
                    alt="Image"
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Registration Fee Paid:</Label>
                  <Select
                    name="paid"
                    value={formData.paid}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "paid", value },
                      })
                    }
                  >
                    <SelectTrigger
                      className="border-2 border-[#27272A] bg-[#18181A] py-6"
                      id="framework"
                      required
                    >
                      <SelectValue placeholder="Select" required />
                    </SelectTrigger>
                    <SelectContent position="popper" required>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
  
                {formData.paid== "Yes" && (<div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Payment Method:</Label>
                  <Select
                    name="method"
                    value={formData.method}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "method", value },
                      })
                    }
                  >
                    <SelectTrigger
                      className="border-2 border-[#27272A] bg-[#18181A] py-6"
                      id="framework"
                      required
                    >
                      <SelectValue placeholder="Select" required />
                    </SelectTrigger>
                    <SelectContent position="popper" required>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>)}
                {formData.method == "Online" && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="transaction">Last 4 digits of your UPI Transaction ID:</Label>
                    <Input
                      className="border-2 border-[#27272A] bg-[#18181A] py-6"
                      type="number"
                      id="transaction"
                      placeholder="Enter here"
                      onChange={handleChange}
                      name="transaction"
                      value={formData.transaction}
                      onKeyDown={preventEnterKey}
                      required
                    />
                  </div>
                )}
              </div>
              {/* <Button id="addBtn">Update</Button> */}
              <div className="flex justify-between mt-5">
                <div></div>
                <Button
                  className="p-6"
                  id="addBtn"
                  disabled={dis}
                  // onClick={handleClick}
                >
                  {btntext}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
