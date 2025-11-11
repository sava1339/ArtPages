import { create } from "zustand";
import type { IComment } from "../interfaces/IComment";

export interface IUseComments{
    comments:IComment[],
    addComment:(userId:number,postId:number,context:string)=>void,
    removeComment:(id:number)=>void
}

export const useComments = create<IUseComments>((set,get)=>({
    comments:[
        {
            id:1,
            userId:1,
            postId:1,
            context:"Hello",
            date:Date.now()
        }
    ],
    addComment: (userId,postId,context)=>(set((state)=>({
        comments:[
            {
                id:Date.now(),
                userId:userId,
                postId:postId,
                context:context,
                date:Date.now()
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