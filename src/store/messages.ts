import { create } from "zustand";
import type { IMessage } from "../interfaces/IMessage";

interface IUseMessages{
    messages: IMessage[]
    getMessagesByRoom: (room_id:string) => Promise<void>,
    addMessages: (messages:IMessage[]) =>void
}

export const useMessages = create<IUseMessages>((set,get)=>({
    messages:[],
    getMessagesByRoom:async(room_id)=>{

    },
    addMessages: (messages)=>{
        const uniqueMessages = Array.from(
            new Map(messages.map(message => [message.id, message])).values()
        );
        const newMessageList = uniqueMessages.filter(message => !get().messages.includes(message));
        const newMessages = newMessageList.filter(message => !get().messages.includes(message));
        set({
            messages:newMessages
        })
    }
}))