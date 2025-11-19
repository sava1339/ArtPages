import { create } from "zustand";
import type { ISavePost } from "../interfaces/ISavePosts";
import supabase from "../supabaseClient";

export interface IUseSavePosts{
    savePosts:ISavePost[],
    savePost:(post_id:string,user_id:string)=>void,
    unsavePost:(post_id:string,user_id:string)=>void,
    getSaveByUser:(user_id:string)=>void
    setSavePosts:(save:ISavePost[])=>void
}

export const useSavePosts = create<IUseSavePosts>((set,get)=>({
    savePosts:[
        
    ],
    savePost: async(post_id,user_id)=>{
        const {data,error} = await supabase
            .from("saved_post")
            .insert({
                post_id:post_id,
                user_id:user_id
            })
            .select("id")
            .single();
        if(error) throw error;
        set({
            savePosts: [...get().savePosts,
                {
                    id:data?.id,
                    post_id:post_id,
                    user_id:user_id
                }
            ]
        })
    },
    getSaveByUser:async(user_id)=>{
        if(get().savePosts.length != 0 ) return;
        const {data} = await supabase
            .from("saved_post")
            .select("*")
            .eq("user_id",user_id);
        if(data) get().setSavePosts(data);
    },
    unsavePost: async(post_id,user_id)=>{
        const newSaveList = get().savePosts.filter(save => save.post_id != post_id && save.user_id != user_id);
        await supabase
            .from("saved_post")
            .delete()
            .eq("user_id",user_id)
            .eq("post_id",post_id);
        set({savePosts:newSaveList});
    },
    setSavePosts:(saves)=>{
        set({
            savePosts:[
                ...get().savePosts,
                ...saves
            ]
        })
    }
}))