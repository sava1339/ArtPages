import { create } from "zustand";
import type { IUser } from "../interfaces/IUser";

interface IUseUser{
    user:IUser|null,
    isAuth:boolean,
    setUser:(user:IUser)=>void,
    logout:()=>void
}

export const useUser = create<IUseUser>((set)=>({
    user:{
        id:1,
        avatar:"/avatar.svg",
        nickname:"Petrushka",
        bio:"Frontend developer, FURRY ARTIST, Rimworld modder",
        signDate:Date.now()
    },
    isAuth:true,
    setUser:(user) => set({
        user:user,
        isAuth:true
    }),
    logout:()=>set({
        user:null,
        isAuth:false
    }),
}))