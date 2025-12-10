import { create } from "zustand";
import type { IRoomMember } from "../interfaces/IRoomMember";

interface IUseRoomMembers{
    roomMembers:IRoomMember[]
    addRoomMembers: (roomMembers:IRoomMember[])=>void
}

export const useRoomMemebers = create<IUseRoomMembers>((set,get)=>({
    roomMembers:[],
    addRoomMembers:(roomMembers)=>{
        const uniqueMembers = Array.from(
            new Map(roomMembers.map(member => [member.id, member])).values()
        );
        const newMemberList = uniqueMembers.filter(member => !get().roomMembers.includes(member));
        const newRoomMembers = newMemberList.filter(member => !get().roomMembers.includes(member));
        set({
            roomMembers:newRoomMembers
        })
    }
}))