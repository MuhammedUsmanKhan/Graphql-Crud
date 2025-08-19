import { useUserStore } from "@/store/userStore/userStore";
import React from "react";
import { UserFormData, userFormSchema } from "../userInputCard/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DeleteModal = () => {
  const { deleteModalPopup, setDeleteModalPopup } = useUserStore();

  const { register, reset, handleSubmit } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
  });

  const handleCloseUpdatePopup = () => {
    setDeleteModalPopup(false);
  };

  const onSubmit = (formData: UserFormData) => {
    reset();
  };
  return (
    deleteModalPopup && (
      <div className="flex justify-center items-center absolute  top-0 w-full h-screen bg-black/70">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-8 space-y-4 items-center justify-center bg-white h-96 w-2xl  z-50 "
        >
          <div className="flex flex-col space-y-4 w-full">
            <button className="border p-2 flex-1" type="submit">
              Yes
            </button>
            <button
              className="border p-2 flex-1"
              onClick={handleCloseUpdatePopup}
            >
              No
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default DeleteModal;
