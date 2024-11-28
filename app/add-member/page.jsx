"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { IoMdArrowBack } from "react-icons/io";

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

const page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        gender:"",
        paid:""
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    


      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const phone = document.getElementById("phone").value;
            const age = document.getElementById("age").value;
    
            if (phone.length < 10 || age < 0) {
                alert("Contact No. or Age Invalid!");
            } else {
                // Check if the exact user already exists
                const checkRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?name=${encodeURIComponent(formData.name)}`);
                const existingUser = await checkRes.json();
    
                // Normalize names by removing spaces, punctuation, and making them lowercase
                const normalizeName = (name) => name.toLowerCase().replace(/[\s._]/g, '');
    
                // Filter the results to see if a normalized match exists
                const exactMatch = existingUser.some(user => 
                    normalizeName(user.name) === normalizeName(formData.name)
                );
    
                if (exactMatch) {
                    toast.error("User with this exact name already exists!", {
                        closeOnClick: true,
                        draggable: true,
                        theme: "dark",
                        autoClose: 3000,
                    });
                } else {
                    // Proceed with adding the new user
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    });
                    
                    if (res.ok) {
                        router.push("/");
                        router.refresh();
                        document.getElementById("addBtn").setAttribute("disabled",true);                        
                        document.getElementById("addBtn").classList.add("disabled");                        
                        toast.success("Member Added Successfully", {
                            closeOnClick: true,
                            draggable: true,
                            theme: "dark",
                            autoClose: 3000,
                        });

                    } else {
                        throw new Error("Failed to create user!");
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    
  return (
    <div className="p-5 md:p-10 min-h-screen bg-[#09090B]">
    <Link href={"/"} className='inline-block mb-10'><p className='w-fit flex items-center gap-2  px-2 rounded-full hover:bg-[#18181B] text-white'><IoMdArrowBack /><span>Back To Home</span></p></Link>
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
            <CardTitle>ADD A MEMBER</CardTitle>
            <CardDescription>
              
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    className="border-2 border-[#27272A] bg-[#18181A]"
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                    name='name' value={formData.name}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Contact No.</Label>
                  <Input
                    className="border-2 border-[#27272A] bg-[#18181A]"
                    type="number"
                    id="phone"
                    placeholder="Enter Contact"
                    onChange={handleChange}
                    name='phone' value={formData.phone}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    className="border-2 border-[#27272A] bg-[#18181A]"
                    type="number"
                    id="age"
                    placeholder="Enter age"
                    onChange={handleChange}
                    name='age' value={formData.age}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Gender</Label>
                  <Select  name="gender" value={formData.gender}
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "gender", value },
                    })
                  }
                  >
                    <SelectTrigger className="border-2 border-[#27272A] bg-[#18181A]" id="framework">
                      <SelectValue
                        placeholder="Select"
                      />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Registration Fee Paid:</Label>
                  <Select
                    name='paid' value={formData.paid}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "paid", value },
                      })
                    }
                  >
                    <SelectTrigger className="border-2 border-[#27272A] bg-[#18181A]" id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* <Button id="addBtn">Update</Button> */}
              <div className="flex justify-between mt-5">
        <div></div>
        <Button id="addBtn">Submit</Button>
      </div>
            </form>
          </CardContent>
        </Card>
    </div>
    </div>
  )
}

export default page