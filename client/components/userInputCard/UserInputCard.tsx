"use client";

// import React, { useState } from "react";

type props = {
  setFname: (fname: string) => void;
  setLname: (lname: string) => void;
  setAge: (age: number) => void;
  // setMarried: (married: boolean) => void;
};

const UserInputCard = (props: props) => {
  const { setFname, setLname, setAge } = props;
  return (
    <div className="flex flex-col bg-amber-300">
      <div>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="fname"
          onChange={(e) => {
            // console.log(e);
            setFname(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          id="lname"
          name="lname"
          onChange={(e) => {
            setLname(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          onChange={(e) => {
            setAge(Number(e.target.value));
          }}
        />
      </div>
      <div>
        <label htmlFor="married">Married</label>
        <select
          id="married"
          name="married"
          // onChange={(e) => {
          //     setMarried(e.target.value === "true");
          // }}
        >
          <option value={"true"}>Yes</option>
          <option value={"false"}>No</option>
        </select>
      </div>
      <button>Create User</button>
    </div>
  );
};

export default UserInputCard;
