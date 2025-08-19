"use client";

import React from "react";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Create_User } from "@/graphql/user/mutation";
import { useUserStore } from "@/store/userStore/userStore";
import { GET_ALL_USERS } from "@/graphql/user/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserFormData, userFormSchema } from "./schema";

const UserInputCard = () => {
  //one way is like this and other is more better like destructuring.
  // const fname = useUserStore((state) => state.fname);
  // const lname = useUserStore((state) => state.lname);
  // const age = useUserStore((state) => state.age);
  // const married = useUserStore((state) => state.married);

  // const { fname, lname, age, married, setAge, setFname, setLname, setMarried } =
  //   useUserStore();

  const [createUser, { loading: isUserLoading }] = useMutation(Create_User, {
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
  });

  const onSubmit = (formData: UserFormData) => {
    const { firstName, lastName, age, married } = formData;

    console.log(formData);

    console.log({
      user: {
        fname: firstName,
        lname: lastName,
        age,
        married,
      },
    });
    createUser({
      variables: {
        input: {
          fname: firstName,
          lname: lastName,
          age,
          married,
        },
      },
    });

    reset();
  };

  return (
    <div className="flex flex-col w-screen h-96 space-y-8 items-center justify-center ">
      <div className="text-3xl">Enter User Detail Form</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-baseline space-y-4 rounded-3xl p-4 w-xl border-2 border-cyan-600"
      >
        <div className="flex space-x-4 w-full ">
          <label htmlFor="fname" className="flex text-lg w-28">
            First Name
          </label>
          <input
            {...register("firstName")}
            type="text"
            id="fname"
            className="flex-1 border rounded-sm p-1"
          />
        </div>
        <div className="flex w-full space-x-4">
          <label htmlFor="lname" className="flex text-lg w-28">
            Last Name
          </label>
          <input
            {...register("lastName")}
            type="text"
            id="lname"
            className="flex-1 border rounded-sm p-1"
          />
        </div>
        <div className="flex w-full space-x-4">
          <label htmlFor="age" className="flex text-lg w-28">
            Age
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            type="number"
            id="age"
            className="flex-1 border rounded-sm p-1"
          />
        </div>
        <div className="flex w-full space-x-4 ">
          <label htmlFor="married" className="flex text-lg w-28">
            Married
          </label>
          <select
            {...register("married", {
              setValueAs: (v) => v === "true", // convert string -> boolean
            })}
            id="married"
            className="flex-1 border rounded-sm p-1"
          >
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </select>
        </div>
        <button
          className="border-2 border-amber-600 w-full p-2 cursor-pointer"
          type="submit"
        >
          {isUserLoading ? "Submit...." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserInputCard;
