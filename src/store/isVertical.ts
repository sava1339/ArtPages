import { create } from "zustand"

export interface IUseIsVertical{
    isVertical:boolean,
    verticalToggle:()=>void
}

export const useIsVertical = create<IUseIsVertical>((set,get)=>({
    isVertical:false,
    verticalToggle: ()=>set({isVertical: !get().isVertical})
}))