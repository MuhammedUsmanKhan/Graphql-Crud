import { create } from "zustand";

type UserStore = {
  age: number;
  fname:string;
  lname:string;
  married:boolean;
  setAge: (age:number) => void;
  setFname: (Fname:string) => void;
  setLname: (Lname:string) => void;
  setMarried: (Married:boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  age: 0,
  fname:'',
  lname:'',
  married:false,
  setAge: (age) => {
    set((state) => ({age}));
  },
  setFname: (fname) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // set((state) => ({  state.firstName:firstName }));
    set((state)=>({fname}))
  },
  setLname: (lname) => {
    // set((state) => ({ count: state.count - 1 }));
     set((state)=>({lname}))
  },
  setMarried(married) {
      set((state)=>({married}))
  },
}));
