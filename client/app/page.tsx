"use client"

import Image from "next/image";
import UserInputCard from "@/components/userInputCard/UserInputCard";
import { useState } from "react";
import UserDisplayCard from "@/components/userDisplayCard/UserDisplayCard";
import UpdateModal from "@/components/updateModal/UpdateModal";
export default function Home() {
  // const [fname, setFname] = useState<string>("");
  // const [lname, setLname] = useState<string>("");
  // const [married, setMarried] = useState<boolean>(false);
  // const [age, setAge] = useState<number>(0);

  return (
    <div className="flex flex-col w-screen">
      <UserInputCard   />
      <UserDisplayCard />
    </div>
  );
}
