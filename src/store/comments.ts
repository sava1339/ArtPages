import { create } from "zustand";
import type { IComment } from "../interfaces/IComment";
import supabase from "../supabaseClient";
import { useUser } from "./users";

export interface IUseComments{
    comments:IComment[],
    addComments:(comment:IComment[])=>void,
    sendComment:(user_id:string,post_id:string,context:string)=>Promise<void>,
    removeComment:(id:string)=>void,
    fetchCommentsByPost: (post_id:string)=>Promise<void>,
    getCommentsByPost: (post_id:string)=>IComment[]
}

export const useComments = create<IUseComments>((set,get)=>({
    comments:[
        
    ],
    addComments: (comments) =>{
        set({
            comments:[
                ...comments,
                ...get().comments
            ]
        })
    },
    sendComment: async(user_id,post_id,context)=>{
        const cleanContext = context.trim();
        const {data,error} = await supabase
            .from("comment")
            .insert({
                user_id:user_id,
                post_id:post_id,
                context:cleanContext
            })
            .select();
        if(error) throw error;
        get().addComments(data);
    },
    removeComment: (id)=>{
        const newCommentList = get().comments.filter(comment=>comment.id !=id);
        set({
            comments:newCommentList
        })
    },
    fetchCommentsByPost: async(post_id)=>{
        if(get().comments.some(comment => comment.post_id === post_id)){
            return;
        }
        const {data,error} = await supabase
            .from("comment")
            .select("*")
            .eq("post_id",post_id)
            .order("created_at", {ascending:false})
        if(error) throw error;
        const userIds = data.map((comment:IComment)=>comment.user_id);
        const uniqueUserIds = [...new Set(userIds)];
        await useUser.getState().fetchUsersByIds(uniqueUserIds);
        get().addComments(data);
    },
    getCommentsByPost: (post_id) =>{
        const comments = get().comments.filter(comment => comment.post_id === post_id);
        return comments;
    }
}))