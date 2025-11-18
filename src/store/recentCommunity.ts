import { create } from "zustand";
import {set as setdb, get as getdb} from 'idb-keyval';
import { useAuthUser } from "./authUser";
import { useCommunityes } from "./communityes";

interface IUseRecentCommunity{
    recentCommunity:string[],
    addRecentCommunity:(id:string)=>void,
    getRecentCommunityes:()=>void
}

export const useRecentCommunity = create<IUseRecentCommunity>((set,get)=>({
    recentCommunity:[],
    addRecentCommunity:async(id)=>{
        const newRecentCommunityList = get().recentCommunity.filter(recentCommunity=> recentCommunity != id);
        const idsArray = {
            userid: useAuthUser.getState().userData?.id,
            ids: [id,...newRecentCommunityList]
        }
        await setdb(`recentCommunity_${idsArray.userid}`,JSON.stringify(idsArray.ids));
        set({
            recentCommunity:[id,...newRecentCommunityList]
        })
    },
    getRecentCommunityes: async()=>{
        const recentCommunityesJson = await getdb(`recentCommunity_${useAuthUser.getState().userData?.id}`);
        const recentCommunityes = await JSON.parse(recentCommunityesJson);
        await useCommunityes.getState().getCommunityesByIds(recentCommunityes);
        set({
            recentCommunity: recentCommunityes
        })
    }
}))