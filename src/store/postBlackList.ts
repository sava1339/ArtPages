import { create } from "zustand";

export interface IUsePostBlackList{
    postBlackList:number[],
    addPostInBL:(id:number)=>void
}

export const usePostBlackList = create<IUsePostBlackList>((set)=>({
    postBlackList:[],
    addPostInBL:(id)=>set((state)=>({
        postBlackList:[...state.postBlackList,id]
    }))
}))