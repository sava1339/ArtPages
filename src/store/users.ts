import { create } from "zustand";
import type { IUser } from "../interfaces/IUser";

interface IUseUser{
    users:IUser[],
    addUser:(user:IUser)=>void,
    addUsers:(users:IUser[])=>void
}

export const useUser = create<IUseUser>((set)=>({
    users:[],
    addUser:(user) => set((state)=>({
        users:[
            ...state.users,
            user
        ]
    })),
    addUsers:(users) => set((state)=>({
        users:[
            ...state.users,
            ...users
        ]
    }))
}))