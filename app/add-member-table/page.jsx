"use client"
import React from 'react'
import { toast } from 'react-toastify';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    
      const handleSubmit = async(e) => {
        e.preventDefault();


        try {

            const phone = document.getElementById("phone").value
            const age = document.getElementById("age").value
            console.log(process.env.NEXT_PUBLIC_API_URL)
            if(phone.length<10 || age<0){
                    alert("Contact No. or Age Invalid!")
            }
            else{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`,{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(formData)
                })
                if(res.ok){
                    router.push("/table");
                    router.refresh();
                    toast.success("Member Added, Redirecting please wait......",{
                        closeOnClick:true,
                        draggable:true,
                        theme:"dark"
                    })
            }else{
                throw new Error("Failed to create user!")
            }
            }
        } catch (error) {
            console.log(error)
        }
      };
  return (
    <div className="p-5 md:p-10 h-screen">
    <Link href={"/"}><p className='w-fit mb-10 px-2 rounded-full hover:bg-slate-300'>Back To Home</p></Link>
    <h1 className="text-2xl mb-5 md:mb-10 font-bold text-center">Add A Member</h1>   
    <div className="flex justify-center items-center">
        <form className="flex flex-col gap-2 items-start" action="" onSubmit={handleSubmit}>
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
            <button className="px-4 py-2 rounded-md text-white bg-green-500">Submit</button>
        </form>
    </div>
    </div>
  )
}

export default page