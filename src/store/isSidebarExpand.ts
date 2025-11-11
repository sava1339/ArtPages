import { create } from "zustand";

interface IUseSidebarExpand{
    isSidebarExpand:boolean,
    toggleSidebar:()=>void
}

export const useIsSidebarExpand = create<IUseSidebarExpand>((set)=>({
    isSidebarExpand:true,
    toggleSidebar:()=>set((state)=>({
        isSidebarExpand: !(state.isSidebarExpand)
    }))
}))