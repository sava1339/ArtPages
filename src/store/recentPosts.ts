import { create } from "zustand";
import {set as setdb, get as getdb,del} from 'idb-keyval';
import { useAuthUser } from "./authUser";
import { usePosts } from "./posts";

export interface IUseRecentPosts{
    recentPosts:string[],
    addRecent:(id:string)=>Promise<void>,
    removeRecent:(id:string)=>void,
    cleanRecent:()=>Promise<void>,
    getRecentPosts:()=>Promise<void>
}

export const useRecentPosts = create<IUseRecentPosts>((set,get)=>({
    recentPosts:[
        
    ],
    addRecent: async(id)=>{
        const newRecentList = get().recentPosts.filter(recent => recent != id);
        const idsArray = {
            userid: useAuthUser.getState().userData?.id,
            ids: [id,...newRecentList]
        }
        await setdb(`recentPost_${idsArray.userid}`,JSON.stringify(idsArray.ids));
        set({
            recentPosts:[...newRecentList,
                id
            ]
        })
    },
    removeRecent: (id)=>{
        const newRecentList = get().recentPosts.filter(recent => recent != id);
        set({recentPosts:newRecentList});
    },
    cleanRecent: async()=>{
        await del(`recentPost_${useAuthUser.getState().userData?.id}`);
        set({
            recentPosts:[]
        })
    },
    getRecentPosts: async()=>{
        const recentPostsJSON = await getdb(`recentPost_${useAuthUser.getState().userData?.id}`);
        if(!recentPostsJSON){
            return;
        }
        const recentPosts:string[] = await JSON.parse(recentPostsJSON);
        await usePosts.getState().getPostsByIds(recentPosts);
        const existRecentPosts = recentPosts.filter(recentPost => usePosts.getState().posts.some(post => post.id === recentPost));
        await setdb(`recentPost_${useAuthUser.getState().userData?.id}`,JSON.stringify(existRecentPosts));
        set({
            recentPosts: recentPosts
        })
    }
}))