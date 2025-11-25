import { create } from "zustand";
import type { IChatRoom } from "../interfaces/IChatRoom";
import supabase from "../supabaseClient";
import type { IFetchRooms } from "../interfaces/IFetchRooms";
import type { IRoomMember } from "../interfaces/IRoomMember";
import { useRoomMemebers } from "./roomMembers";

interface IUseChatRooms{
    chatRooms: IChatRoom[],
    selectRoomId: string|null, 
    fetchRoomsByUser: (user_id:string)=>Promise<void>,
    // createRoomWithOther: (name:string,user_id:string,other_user_id:string)=>Promise<void>,
    // createGroup: (name:string,user_id:string)=>Promise<void>,
    addChatRooms: (chatRooms:IChatRoom[]) => void,
    selectRoom:(room_id:string)=>void,
    getChatRoomById:(room_id:string)=> IChatRoom|undefined
}

export const useChatRooms = create<IUseChatRooms>((set,get)=>({
    chatRooms:[],
    selectRoomId: null,
    fetchRoomsByUser: async(user_id)=>{
        const {data,error} = await supabase
            .rpc("get_user_chat_rooms",{
                user_id:user_id
            })
        if(error) throw error;
        const flat_data:IFetchRooms[] = data.map((room:any) => room.room_data)
        const chatRoomList:IChatRoom[] = [];
        const roomMemberList:IRoomMember[] = [];
        flat_data.forEach(item =>{
            const {chat_room, members_count, room_member} = item;
            const chatRoom:IChatRoom = {
                ...chat_room,
                member_count:members_count
            }
            chatRoomList.push(chatRoom);
            roomMemberList.push(room_member);
        })
        get().addChatRooms(chatRoomList);
        useRoomMemebers.getState().addRoomMembers(roomMemberList);
    },
    // createRoomWithOther: async(name,user_id,other_user_id)=>{
    //     return;
    // },
    // createGroup: async(name,user_id)=>{
    //     return;
    // },
    addChatRooms:(chatRooms)=>{
        const uniqueRooms = Array.from(
            new Map(chatRooms.map(room => [room.id, room])).values()
        );
        const newMemberList = uniqueRooms.filter(room => !get().chatRooms.includes(room));
        const newChatRooms = newMemberList.filter(room => !get().chatRooms.includes(room));
        set({
            chatRooms:newChatRooms
        })
    },
    selectRoom:(room_id)=>{
        const isMatch = get().chatRooms.find(room => room.id === room_id) !== undefined;
        if(!isMatch){
            return;
        }
        set({
            selectRoomId:room_id
        })
    },
    getChatRoomById:(room_id)=>{
        const room = get().chatRooms.find(room => room.id === room_id);
        return room;
    }
}))