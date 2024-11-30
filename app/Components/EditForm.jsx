"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
import { useToast } from "@/hooks/use-toast"


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

const EditForm = ({ data }) => {
  const router = useRouter();

  const { toast } = useToast()

  const [btntext, setbtntext] = useState("Update");
  const [dis, setdis] = useState(false);

  const [formData, setFormData] = useState({
    newName: data.name,
    newAge: data.age,
    newNumber: data.phone,
    newGender: data.gender,
    newPaid: data.paid,
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
    setdis(true)
  };

  function handleToast(){
    toast({
      title: "Updated Member Successfully",
      description: "Cheers!",
      className: 'z-[100] bg-blue-500 border-none',
      duration: 3000,
    })
  }

  function handleError(){
    toast({
      title: "Another user with this exact name already exists!",
      description: "Please try again.",
      variant:"destructive",
      className: 'z-[100] bg-red-500 text-white',
      duration: 3000,
    })
  }

  function handleContact(){
    toast({
      title: "Contact No. or Age Invalid!",
      description: "Please check.",
      variant:"destructive",
      className: 'z-[100] bg-yellow-500 text-black',
      duration: 3000,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClick();

    try {
      const phone = document.getElementById("phone").value;
      const age = document.getElementById("age").value;

      if (phone.length < 10 || age < 0 || age == "") {
        // alert("Contact No. or Age Invalid!");
        handleContact();
        setbtntext("Update");
        setdis(false);
      } else {
        
        // Check if a user with the new name already exists, excluding the current user
        const checkRes = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/api/users?name=${encodeURIComponent(formData.newName)}`
        );
        const existingUsers = await checkRes.json();

        const normalizeName = (name) =>
          name.toLowerCase().replace(/[\s._]/g, "");

        // Filter the results to see if a normalized match exists, excluding the current user's name
        const exactMatch = existingUsers.some(
          (user) =>
            user._id !== data._id &&
            normalizeName(user.name) === normalizeName(formData.newName)
        );


        if (exactMatch) {
          // toast.warn("Another user with this exact name already exists!", {
          //   closeOnClick: true,
          //   draggable: true,
          //   theme: "dark",
          //   autoClose: 3000,
          // });
          handleError();
          setbtntext("Update");
          setdis(false);
        } else {
          // Proceed with updating the user
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${data._id}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          if (res.ok) {
            router.push("/");
            router.refresh();
            // document.getElementById("addBtn").setAttribute("disabled", true);
            // document.getElementById("addBtn").classList.add("disabled");
            // setdis(true);
            // toast.info("Updated Member Successfully", {
            //   closeOnClick: true,
            //   draggable: true,
            //   theme: "dark",
            //   autoClose: 3000,
            // });
            handleToast();
          } else {
            throw new Error("Failed to update user!");
        //     setbtntext("Update");
        // setdis(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setbtntext("Update");
        setdis(false);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-[#09090B]">
      <h1 className="text-lg md:text-2xl mb-5 md:mb-10 font-medium text-center text-white">
        You are editing <b className="uppercase">{data.name}'s</b> information
      </h1>
      <div className="flex justify-center items-center">
        {/* <form className="flex flex-col gap-2 items-start" action="" onSubmit={handleSubmit}>
            <small>Name:</small><input onChange={handleChange} name='newName' value={formData.newName} className="px-4 py-2 rounded-md border-2 border-zinc-700" type="text" placeholder="Enter Name..." />
            <small>Contact:</small><input id='phone' onChange={handleChange} name='newNumber' value={formData.newNumber} className="px-4 py-2 rounded-md border-2 border-zinc-700" type="number" placeholder="Enter Contact Number"/>
            <small>Age:</small><input id='age' onChange={handleChange} name='newAge' value={formData.newAge} className="px-4 py-2 rounded-md border-2 border-zinc-700" type="number" placeholder="Enter Age..." />
            <small>Gender:</small><select onChange={handleChange} name='newGender' value={formData.newGender} className="w-full px-4 py-2 rounded-md border-2 border-zinc-700"  id="">
                <option value="Select Gender">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <small>Registration Fee Paid:</small><select onChange={handleChange} name='newPaid' value={formData.newPaid} className="w-full px-4 py-2 rounded-md border-2 border-zinc-700"  id="">
                <option value="Registration Fee Paid">Registration Fee Paid</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <button id="addBtn"  className="px-4 py-2 rounded-md text-white bg-green-500">Submit</button>
        </form> */}
        <Card className=" w-full sm:[350px] md:w-[350px] bg-transparent text-white border-2 border-[#27272A] ">
          <CardHeader>
            <CardTitle>EDIT FORM</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    className="border-2 border-[#27272A] bg-[#18181A] py-6"
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                    name="newName"
                    value={formData.newName}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Contact No.</Label>
                  <Input
                    className="border-2 border-[#27272A] bg-[#18181A] py-6"
                    type="number"
                    id="phone"
                    placeholder="Enter Contact"
                    onChange={handleChange}
                    name="newNumber"
                    value={formData.newNumber}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    className="border-2 border-[#27272A] bg-[#18181A] py-6"
                    type="number"
                    id="age"
                    placeholder="Enter Age"
                    onChange={handleChange}
                    name="newAge"
                    value={formData.newAge}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Gender</Label>
                  <Select
                    name="newGender"
                    value={formData.newGender}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "newGender", value },
                      })
                    }
                  >
                    <SelectTrigger
                      className="border-2 border-[#27272A] bg-[#18181A] py-6"
                      id="framework"
                    >
                      <SelectValue placeholder="Select Gender" />
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
                    name="newPaid"
                    value={formData.newPaid}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "newPaid", value },
                      })
                    }
                  >
                    <SelectTrigger
                      className="border-2 border-[#27272A] bg-[#18181A] py-6"
                      id="framework"
                    >
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

export default EditForm;
