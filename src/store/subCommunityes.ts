import { create } from "zustand";
import type { ISubCommunity } from "../interfaces/ISubCommunity";
import supabase from "../supabaseClient";
import { useCommunityes } from "./communityes";

export interface IUseSubCommunityes{
    subCommunity:ISubCommunity[],
    toggleFav:(subCommunityData:ISubCommunity,is_favorite:boolean)=>void,
    addSubCommunity:(community_id:string,user_id:string)=>void,
    removeSubCommunity:(id:string)=>void,
    getSubCommunity:(user_id:string)=>void,
    addSubCommunityes:(subCommunityes:ISubCommunity[])=>void
}

export const useSubCommunityes = create<IUseSubCommunityes>((set,get)=>({
    subCommunity:[
        
    ],
    toggleFav: async(subCommunityData,is_favorite)=> {
        await supabase
            .from("community_subscription")
            .update({is_favorite:!is_favorite})
            .eq("id",subCommunityData.id)
        set({
            subCommunity: get().subCommunity.map(community =>
                community.id === subCommunityData.id 
                    ? { ...community, is_favorite: !is_favorite }
                    : community
                )
        })
        
    },
    addSubCommunity: async(community_id,user_id)=> {
        const {data,error} = await supabase
            .from("community_subscription")
            .insert({
                community_id:community_id,
                user_id:user_id
            })
            .select();
        if(error) throw error;
        const subCommunity:any = data;
        set({
            subCommunity: [...get().subCommunity,
                {
                    id:subCommunity.id,
                    community_id:community_id,
                    user_id:user_id,
                    is_favorite:false
                }
            ]
        })
        
    },
    getSubCommunity:async(user_id)=>{
        const {data,error} = await supabase
            .from('community_subscription')
            .select("id,community_id,user_id,is_favorite")
            .eq("user_id",user_id)
        if(error) throw error;
        const communityIds = data.map(subCommunity => subCommunity.community_id);
        await useCommunityes.getState().getCommunityesByIds(communityIds);
        get().addSubCommunityes(data);
    },
    addSubCommunityes:(subCommunityes)=>{
        const filteredSubCommunityes = get().subCommunity.filter(subCommunity => subCommunityes.some(sc => sc.id !== subCommunity.id))
        set({
            subCommunity:[
                ...filteredSubCommunityes,
                ...subCommunityes
            ]
        })
    },
    removeSubCommunity: (id)=>{
        const newSub = get().subCommunity.filter(community => community.id != id);
        set({subCommunity:newSub});
    }
}))