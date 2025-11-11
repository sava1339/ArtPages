import { create } from "zustand";
import type { ICommunity } from "../interfaces/ICommunity";

export interface IUseCommunityes{
    communityes:ICommunity[]
}

export const useCommunityes = create<IUseCommunityes>((set)=>({
    communityes:[
        {
            id:1,
            img: "/avatar.jpg",
            title: "Happy_Community",
        },
        {
            id:2,
            img: "/avatar.jpg",
            title: "Photography",
        },
        {
            id:3,
            img: "/avatar.jpg",
            title: "Biological",
        },
        {
            id:4,
            img: "/avatar.jpg",
            title: "Anime",
        },
    ]
}))