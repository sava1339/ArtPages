import { create } from "zustand";
import type { ICommunity } from "../interfaces/ICommunity";

export interface IUseCommunityes{
    communityes:ICommunity[],
    addCommunityes:(communityes:ICommunity[])=>void
}

export const useCommunityes = create<IUseCommunityes>((set)=>({
    communityes:[
        
    ],
    addCommunityes:(communityes)=>set((state)=>({
        communityes:[...state.communityes,...communityes]
    }))
}))