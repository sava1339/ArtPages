import {create} from 'zustand';
import type { IPost } from '../interfaces/IPost';

export interface IUseSelectedPost{
    selectedPost:IPost|null,
    selectPost:(post:IPost)=>void,
    deselect:()=>void
}

export const useSelectedPost = create<IUseSelectedPost>((set)=>({
    selectedPost:null,
    selectPost: (post) => set({selectedPost:post}),
    deselect: () => set({selectedPost: null})
}))