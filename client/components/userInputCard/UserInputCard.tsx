"use client";


import React from "react";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Create_User } from "@/graphql/user/mutation";


type props = {
  setFname: (fname: string) => void;
  setLname: (lname: string) => void;
  setAge: (age: number) => void;
  setMarried: (married: boolean) => void;
  // setMarried: (married: boolean) => void;
};

const UserInputCard = (props: props) => {
  const { setFname, setLname, setAge, setMarried } = props;

const {} = useMutation(Create_User)

  return (
    <div className="flex flex-col w-screen h-96 space-y-8 items-center justify-center ">
      <div className="text-3xl">Enter User Detail Form</div>
      <div className="flex flex-col items-baseline space-y-4 rounded-3xl p-4 w-xl border-2 border-cyan-600">
        <div className="flex space-x-4 w-full ">
          <label htmlFor="fname" className="flex text-lg w-28">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            name="fname"
            className="flex-1 border rounded-sm p-1"
            onChange={(e) => {
              console.log({ fname: e.target.value });
              setFname(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full space-x-4">
          <label htmlFor="lname" className="flex text-lg w-28">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            name="lname"
            className="flex-1 border rounded-sm p-1"
            onChange={(e) => {
              console.log({ lname: e.target.value });
              setLname(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full space-x-4">
          <label htmlFor="age" className="flex text-lg w-28">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className="flex-1 border rounded-sm p-1"
            onChange={(e) => {
              console.log({ age: e.target.value });
              setAge(Number(e.target.value));
            }}
          />
        </div>
        <div className="flex w-full space-x-4 ">
          <label htmlFor="married" className="flex text-lg w-28">
            Married
          </label>
          <select
            id="married"
            name="married"
            className="flex-1 border rounded-sm p-1"
            onChange={(e) => {
              console.log({ married: e.target.value });
              setMarried(e.target.value === "true");
            }}
          >
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </select>
        </div>
        <button className="border-2 border-amber-600 w-full p-2 cursor-pointer" onClick={()=>{

        }}>Create User</button>
      </div>
    </div>
  );
};

export default UserInputCard;
