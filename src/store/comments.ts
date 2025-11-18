import { create } from "zustand";
import type { IComment } from "../interfaces/IComment";

export interface IUseComments{
    comments:IComment[],
    addComment:(userId:string,postId:string,context:string)=>void,
    removeComment:(id:string)=>void
}

export const useComments = create<IUseComments>((set,get)=>({
    comments:[
        
    ],
    addComment: (userId,postId,context)=>(set((state)=>({
        comments:[
            {
                id:Date.now.toString(),
                userId:userId,
                postId:postId,
                context:context,
                date:Date.now.toString()
            },...state.comments
        ]
    }))),
    removeComment: (id)=>{
        const newCommentList = get().comments.filter(comment=>comment.id !=id);
        set({
            comments:newCommentList
        })
    }
}))