import { create } from "zustand";
import type { IRoomMember } from "../interfaces/IRoomMember";

interface IUseRoomMembers{
    roomMembers:IRoomMember[]
    getRoomMembersByRoom: (room_id:string) => Promise<void>
    addRoomMembers: (roomMembers:IRoomMember[])=>void
}

export const useRoomMemebers = create<IUseRoomMembers>((set,get)=>({
    roomMembers:[],
    getRoomMembersByRoom: async(room_id)=>{

    },
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