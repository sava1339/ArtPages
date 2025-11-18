import { create } from "zustand";
import type { ISubCommunity } from "../interfaces/ISubCommunity";

export interface IUseSubCommunityes{
    subCommunity:ISubCommunity[],
    toggleFav:(id:string)=>void,
    addSubCommunity:(id:string)=>void,
    removeSubCommunity:(id:string)=>void
}

export const useSubCommunityes = create<IUseSubCommunityes>((set,get)=>({
    subCommunity:[
        {
            id:"1",
            communityId:"4",
            isFav: false
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
                id:Date.now().toString(),
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