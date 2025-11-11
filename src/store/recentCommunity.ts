import { create } from "zustand";

interface IUseRecentCommunity{
    recentCommunity:number[],
    addRecentCommunity:(id:number)=>void
}

export const useRecentCommunity = create<IUseRecentCommunity>((set,get)=>({
    recentCommunity:[],
    addRecentCommunity:(id)=>{
        const newRecentCommunityList = get().recentCommunity.filter(recentCommunity=>recentCommunity!=id);
        set({
            recentCommunity:[id,...newRecentCommunityList]
        })
    }
}))