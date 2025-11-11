import { create } from "zustand";
import type { IVote } from "../interfaces/IVote";

export interface IUseVotePost{
    votePosts:IVote[],
    upvote:(id:number)=>void,
    downvote:(id:number)=>void,
    removeVote:(id:number)=>void,
}

export const useVotePost = create<IUseVotePost>((set,get)=>({
    votePosts:[
        {
            id:Date.now(),
            postId:1,
            vote:1
        }
    ],
    upvote: (id)=>{
        const newVoteList = get().votePosts.filter(vote => vote.postId != id);
        set({
            votePosts:[...newVoteList,
                {
                    id:Date.now(),
                    postId:id,
                    vote:1
                }
            ]
        })
    },
    downvote: (id)=>{
        const newVoteList = get().votePosts.filter(vote => vote.postId != id);
        set({
            votePosts:[...newVoteList,
                {
                    id:Date.now(),
                    postId:id,
                    vote:-1
                }
            ]
        })
    },
    removeVote: (id)=>{
        const newVoteList = get().votePosts.filter(vote => vote.postId != id);
        set({votePosts:newVoteList});
    }
}))