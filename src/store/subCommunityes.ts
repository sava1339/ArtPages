import { create } from "zustand";
import type { ISubCommunity } from "../interfaces/ISubCommunity";

export interface IUseSubCommunityes{
    subCommunity:ISubCommunity[],
    toggleFav:(id:number)=>void,
    addSubCommunity:(id:number)=>void,
    removeSubCommunity:(id:number)=>void
}

export const useSubCommunityes = create<IUseSubCommunityes>((set,get)=>({
    subCommunity:[
        {
            id:1,
            communityId:1,
            isFav: false
        },
        {
            id:2,
            communityId:2,
            isFav: true
        }
    ],
    toggleFav: (id)=> set((state) => ({
        subCommunity: state.subCommunity.map(community =>
        community.id === id 
            ? { ...community, isFav: !community.isFav }
            : community
        )
    })),
    addSubCommunity: (id)=> set((state)=>({
        subCommunity: [...state.subCommunity,
            {
                id:Date.now(),
                communityId:id,
                isFav:false
            }
        ]
    })),
    removeSubCommunity: (id)=>{
        const newSub = get().subCommunity.filter(community => community.communityId != id);
        set({subCommunity:newSub});
    }
}))