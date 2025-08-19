import { z } from "zod";


export const userFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  age: z.number().min(1, "Age must be positive"),
  married:z.boolean()
//   projectFiles: z.array(FileSchema).optional(),
})

export type UserFormData = z.infer<typeof userFormSchema>;


// export const FileSchema = z.object({
//   name: z.string(),
//   type: z.string().refine((type) => !type.includes("application/x-msdownload"), {
//     message: "Executable (exe, dll, etc.) files are not allowed",
//   }),
//   size: z.number().max(50 * 1024 * 1024, "File size must be less than 50MB"),
// });

// export type ValidFile = z.infer<typeof FileSchema>;
// fname, lname, age, married


// custom funtion to compare two different field values
// .refine(
//   (data) => data.amount <= data.total_amount,
//   {
//     message: "Amount cannot be greater than total amount",
//     path: ["amount"]
//   }
// );
