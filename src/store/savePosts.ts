import { create } from "zustand";
import type { ISavePost } from "../interfaces/ISavePosts";

export interface IUseSavePosts{
    savePosts:ISavePost[],
    savePost:(id:string)=>void,
    unsavePost:(id:string)=>void
}

export const useSavePosts = create<IUseSavePosts>((set,get)=>({
    savePosts:[
        {
            id:"1",
            postId:"1"
        }
    ],
    savePost: (id)=> set((state)=>({
        savePosts: [...state.savePosts,
            {
                id:Date.now().toString(),
                postId:id,
            }
        ]
    })),
    unsavePost: (id)=>{
        const newSaveList = get().savePosts.filter(save => save.postId != id);
        set({savePosts:newSaveList});
    }
}))