import { create } from "zustand";
import type { IVote } from "../interfaces/IVote";
import supabase from "../supabaseClient";

export interface IUseVotePost{
    votePosts:IVote[],
    vote:(post_id:string,user_id:string,vote:boolean|null,vote_id:string|undefined)=>void,
    setVotes:(votes:IVote[])=> void,
}

export const useVotePost = create<IUseVotePost>((set,get)=>({
    votePosts:[
        
    ],
    vote: async(post_id,user_id,vote,vote_id)=>{
        const newVoteList = get().votePosts.filter(vote => (vote.post_id == post_id && vote.user_id != user_id) || vote.post_id != post_id);
        if(vote_id === undefined){
            const {data,error} = await supabase
                .from("post_vote")
                .insert([
                    {
                        post_id:post_id,
                        user_id:user_id,
                        vote:vote
                    }
                ])
                .select("id")
                .single();
            if(error) throw error;
            set({
                votePosts:[...newVoteList,
                    {
                        id:data.id,
                        post_id:post_id,
                        user_id:user_id,
                        vote:vote
                    }
                ]
            })
        }else{
            await supabase
                .from("post_vote")
                .update({
                        vote:vote
                    })
                .eq('id',vote_id)
            set({
                votePosts:[...newVoteList,
                    {
                        id:vote_id,
                        post_id:post_id,
                        user_id:user_id,
                        vote:vote
                    }
                ]
            })
        }
    },
    setVotes: (votes)=>{
        // const newVotes:IVote[] = get().votePosts.map(vote=>{
        //     if(!votes.some(newVote => newVote.id === vote.id)) return vote;
        // }) as IVote[];
        set({
            votePosts:[
                ...votes
            ]
        })
    }
}))