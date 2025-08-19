import { useUserStore } from "@/store/userStore/userStore";
import React from "react";
import { UserFormData, userFormSchema } from "../userInputCard/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const UpdateModal = () => {
  const { updateModalPopup, setUpdateModalPopup } = useUserStore();

  const { register, reset, handleSubmit } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
  });

  const handleCloseUpdatePopup = () => {
    setUpdateModalPopup(false);
  };

  const onSubmit = (formData: UserFormData) => {
    reset();
  };
  return (
    updateModalPopup && (
      <div className="flex justify-center items-center absolute  top-0 w-full h-screen bg-black/70">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-8 space-y-4 items-center justify-center bg-white h-96 w-2xl  z-50 "
        >
          <div className="w-full space-y-4 ">
            <div className="flex space-x-4">
              <label className="w-32">Enter First Name</label>
              <input
                {...register("firstName")}
                type="text"
                className="flex-1 p-2 border outline-0"
              />
            </div>
            <div className="flex space-x-4">
              <label className="w-32">Enter Last Name</label>
              <input
                {...register("firstName")}
                type="text"
                className="flex-1 p-2 border outline-0"
              />
            </div>
            <div className="flex space-x-4">
              <label className="w-32">Enter Age</label>
              <input
                {...register("age", { valueAsNumber: true })}
                type="number"
                className="flex-1 p-2 border outline-0"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <button className="border p-2 flex-1" type="submit">
              Update
            </button>
            <button
              className="border p-2 flex-1"
              onClick={handleCloseUpdatePopup}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default UpdateModal;
