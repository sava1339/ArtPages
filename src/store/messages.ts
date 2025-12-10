import { create } from "zustand";
import type { IMessage } from "../interfaces/IMessage";
import supabase from "../supabaseClient";

interface IUseMessages{
    messages: IMessage[],
    subscriptions: Map<string,any>,
    fetchMessagesByRoom: (room_id:string) => Promise<void>,
    addMessages: (messages:IMessage[]) =>void,
    subscribeToRoom: (room_id:string) => void,
    sendMessage: (room_id:string,user_id:string,context:string) => void,
    getLastMessageByRoom: (room_id:string) => IMessage | undefined
}

export const useMessages = create<IUseMessages>((set,get)=>({
    messages:[],
    subscriptions: new Map(),
    fetchMessagesByRoom:async(room_id)=>{
        const roomIsMatch = get().messages.some(message => message.room_id === room_id);
        if(roomIsMatch){
            return;
        }
        const {data:messages,error} = await supabase
            .from("message")
            .select("*")
            .eq("room_id",room_id)
        if(error) throw error;
        set({
            messages:[...get().messages,...messages]
        })
    },
    addMessages: (messages)=>{
        const uniqueMessages = Array.from(
            new Map(messages.map(message => [message.id, message])).values()
        );
        const newMessageList = uniqueMessages.filter(message => !get().messages.includes(message));
        const newMessages = newMessageList.filter(message => !get().messages.includes(message));
        set({
            messages:[...get().messages, ...newMessages]
        })
    },
    subscribeToRoom: (room_id)=>{
        if(get().subscriptions.has(room_id)){
            get().subscriptions.get(room_id).unsubscribe();
        }
        const subscription = supabase
            .channel(`room:${room_id}`)
            .on(
                'postgres_changes',
                {
                event: '*',
                schema: 'public',
                table: 'message',
                // filter: `room_id=eq.${room_id}`
                },
                (payload) => {
                    const data = payload.new as IMessage;
                    get().addMessages([data]);
                }
            )
            .subscribe();
        get().subscriptions.set(room_id, subscription);
    },
    sendMessage: async(room_id,user_id,context) => {
        const {error} = await supabase
            .from("message")
            .insert([
                {
                    room_id:room_id,
                    user_id:user_id,
                    context:context
                }
            ])
        if(error) throw error;
    },
    getLastMessageByRoom: (room_id) =>{
        const messageList = get().messages;
        for(let i = messageList.length - 1; i >= 0;i--){
            if(messageList[i].room_id === room_id){
                return messageList[i];
            }
        }
    }
}))