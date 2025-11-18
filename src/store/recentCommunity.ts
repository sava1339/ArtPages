import { create } from "zustand";

interface IUseRecentCommunity{
    recentCommunity:string[],
    addRecentCommunity:(id:string)=>void
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