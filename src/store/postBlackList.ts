import { create } from "zustand";

export interface IUsePostBlackList{
    postBlackList:string[],
    addPostInBL:(id:string)=>void
}

export const usePostBlackList = create<IUsePostBlackList>((set)=>({
    postBlackList:[],
    addPostInBL:(id)=>set((state)=>({
        postBlackList:[...state.postBlackList,id]
    }))
}))