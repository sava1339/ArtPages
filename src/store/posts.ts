import { create } from "zustand";
import type { IPost } from "../interfaces/IPost";

export interface IUsePosts{
    posts:IPost[],
    deleteById:(id:number)=>void,
    setVotes:(id:number,votes:number)=>void,
    addPost:(communityId:number,userId:number,img:string)=>void
}

export const usePosts = create<IUsePosts>((set,get)=>({
    posts:[
        {
            id:1,
            communityId:1,
            userId:1,
            img:"/post.jpg",
            votes:4,
            date:1761415069632
        },
        {
            id:2,
            communityId:2,
            userId:1,
            img:"/postt.jpg",
            votes:28,
            date:1761015009632
        },
        {
            id:3,
            communityId:3,
            userId:1,
            img:"/post1.jpg",
            votes:4,
            date:1761415069644
        },
        {
            id:4,
            communityId:2,
            userId:1,
            img:"/post2.jpg",
            votes:42,
            date:1761065009632
        },
        {
            id:5,
            communityId:1,
            userId:1,
            img:"/post3.jpg",
            votes:109,
            date:1761015019632
        },
        {
            id:6,
            communityId:4,
            userId:1,
            img:"/post4.jpg",
            votes:99,
            date:1761015009632
        },
    ],
    addPost:(communityId,userId,img)=>{
        const newPost = {
            id:Date.now(),
            communityId:communityId,
            userId:userId,
            img:img,
            votes:0,
            date:Date.now()
        }
        set({
            posts:[...get().posts,newPost]
        })
    },
    deleteById: (id) => {
        const newPosts = get().posts.filter(p => p.id !== id);
        set({ posts: newPosts });
    },
    setVotes: (id,votes) => set((state) => ({
        posts: state.posts.map(post =>
        post.id === id 
            ? { ...post, votes: votes }
            : post
        )
    }))
}))