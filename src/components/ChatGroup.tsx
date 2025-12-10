import type { IChatRoom } from "../interfaces/IChatRoom";
import Avatar from "../modals/Avatar";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useChatRooms } from "../store/chatRooms";
import { useEffect, useState } from "react";
import { useAuthUser } from "../store/authUser";
import { useUser } from "../store/users";
import Spinner from "./Spinner";
import { useMessages } from "../store/messages";
import type { IMessage } from "../interfaces/IMessage";

interface IChatGroup{
    room:IChatRoom
}

function ChatGroup({room}:IChatGroup) {
    dayjs.extend(relativeTime);
    const {selectRoom,updateImageNTitle} = useChatRooms();
    const {userData} = useAuthUser();
    const {getUserById} = useUser();
    const {getLastMessageByRoom,messages} = useMessages();

    const [isLoading,setIsLoading] = useState(true);
    const [lastMessage,setLastMessage] = useState<IMessage>();
    const lastUpdate = dayjs(lastMessage?.created_at);
    const selectRoomHandler = () => {
        selectRoom(room.id);
    }
    useEffect(()=>{
        const getData = async()=> {
            if(room.members_count == 2 && !room.avatar && userData){
                const chatMateUUID = room.member_uuids.find(uuid => uuid !== userData.id);
                if(!chatMateUUID){
                    return;
                };
                const mateUser = await getUserById(chatMateUUID);
                updateImageNTitle(room.id,mateUser.avatar_file,mateUser.nickname)
                setLastMessage(getLastMessageByRoom(room.id));
            }
            setIsLoading(false);
        }
        getData();
    },[])
    useEffect(()=>{
        setLastMessage(getLastMessageByRoom(room.id));
    },[messages])
    return ( 
        <>
            {!isLoading && lastMessage ? <div onClick={selectRoomHandler} className="px-4 py-3 flex gap-4 hover:bg-mainselect cursor-pointer">
                <Avatar avatar={room.avatar || ""} size="xl" />
                <div className="flex flex-col gap-2 flex-1">
                    <div className="flex justify-between items-center">
                        <p className="text-[16px]">{room.name}</p>
                        <p className="text-[12px] text-secondary">{lastUpdate.fromNow()}</p>
                    </div>
                    <p className=" line-clamp-1 text-[16px] text-secondary">
                        {lastMessage?.context}
                    </p>
                </div>
            </div> : <Spinner/>}
        </>
     );
}

export default ChatGroup;