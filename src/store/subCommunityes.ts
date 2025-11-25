import { create } from "zustand";
import type { ISubCommunity } from "../interfaces/ISubCommunity";
import supabase from "../supabaseClient";
import { useCommunityes } from "./communityes";

export interface IUseSubCommunityes{
    subCommunity:ISubCommunity[],
    toggleFav:(subCommunityData:ISubCommunity,is_favorite:boolean)=>void,
    addSubCommunity:(community_id:string,user_id:string)=>void,
    removeSubCommunity:(community_id:string,user_id:string)=>void,
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
        const isMatch = get().subCommunity.some(community => community.community_id === community_id)
        if(isMatch) return;
        const {data,error} = await supabase
            .from("community_subscription")
            .insert({
                community_id:community_id,
                user_id:user_id
            })
            .select();
        if(error) throw error;
        set({
            subCommunity: [...get().subCommunity,
                {
                    id:data[0].id,
                    community_id:community_id,
                    user_id:user_id,
                    is_favorite:false
                }
            ]
        })
        
    },
    getSubCommunity:async(user_id)=>{
        if(get().subCommunity.length > 0){
            return;
        }
        const {data,error} = await supabase
            .from('community_subscription')
            .select("id,community_id,user_id,is_favorite")
            .eq("user_id",user_id)
        if(error) throw error;
        const communityIds = data.map(subCommunity => subCommunity.community_id);
        await useCommunityes.getState().fetchCommunityesByIds(communityIds);
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
    removeSubCommunity: async(community_id,user_id)=>{
        const newSub = get().subCommunity.filter(community => community.community_id != community_id);
        const {error} = await supabase
            .from("community_subscription")
            .delete()
            .eq("user_id",user_id)
            .eq("community_id",community_id)
        if(error) throw error;
        set({subCommunity:newSub});
    }
}))