"use client";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "@/graphql/user/query";
// import { users } from "../../../constants";
// type props = {
//   fname: string;
//   lname: string;
//   age: number;
//   married: boolean;
// };

const UserDisplayCard = () => {
  // const { fname, lname, age, married } = props;

  const { data } = useQuery(GET_ALL_USERS);

  // useEffect(() => {

  // }, [data]);

  return (
    <div className="flex flex-wrap justify-center w-screen border gap-8">
      {data?.getAllUsers?.map((user: any) => {
        return (
          <div
            key={user.id}
            className="flex flex-col border-2 border-cyan-600 p-2 w-96 h-80 justify-between"
          >
            <div className="flex flex-col flex-1 justify-center items-center border border-amber-700 ">
              <div className="text-lg font-semibold">
                {user.fname} {user.lname}
              </div>
              {/* <div>{user.lname}</div> */}
              <div className="text-lg font-semibold">{user.age}</div>
              <div className="text-lg font-semibold">
                {user.married === true
                  ? `${user.fname + " " + user.lname} is Married`
                  : `${user.fname + " " + user.lname} is not Married`}
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 flex-1 border border-green-700 ">
              <button className="border p-2">Update</button>
              <button className="border p-2">Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserDisplayCard;
