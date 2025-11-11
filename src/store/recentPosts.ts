import { create } from "zustand";
import type { IRecentPost } from "../interfaces/IRecentPost";

export interface IUseRecentPosts{
    recentPosts:IRecentPost[],
    addRecent:(id:number)=>void,
    removeRecent:(id:number)=>void,
    cleanRecent:()=>void
}

export const useRecentPosts = create<IUseRecentPosts>((set,get)=>({
    recentPosts:[
        
    ],
    addRecent: (id)=>{
        const newRecentList = get().recentPosts.filter(recent => recent.postId != id);
        set({
            recentPosts:[...newRecentList,
                {
                    id:Date.now(),
                    postId:id
                }
            ]
        })
    },
    removeRecent: (id)=>{
        const newRecentList = get().recentPosts.filter(recent => recent.postId != id);
        set({recentPosts:newRecentList});
    },
    cleanRecent: ()=>set({recentPosts:[]})
}))