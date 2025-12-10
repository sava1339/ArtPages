import type { IMessage } from "../interfaces/IMessage";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from "../modals/Avatar";
import { useUser } from "../store/users";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import type { IUser } from "../interfaces/IUser";

interface IChatMessage{
    message:IMessage
}

function ChatMessage({message}:IChatMessage) {
    dayjs.extend(relativeTime);
    const lastUpdate = dayjs(message.created_at);
    const {getUserById} = useUser();
    const [curUser,setCurUser] = useState<IUser>();
    useEffect(()=>{
        const getData = async()=>{
            const user = await getUserById(message.user_id);
            setCurUser(user);
        }
        getData()
    },[])
    return ( 
        <>
            {curUser && <div className="flex gap-2 px-3 py-2">
                {curUser ? <Avatar avatar={curUser.avatar_file} size="md" /> : <Spinner/>}
                <div className="flex flex-col gap-1 flex-1">
                    <div className="flex gap-1">
                        {curUser && <p className="font-bold text-[14px]">{curUser.nickname}</p>}
                        <p className="text-secondary text-[12px]">{lastUpdate.fromNow()}</p>
                    </div>
                    <p className="text-[12px] text-secondary">
                        {message.context}
                    </p>
                </div>
            </div>}
        </>
     );
}

export default ChatMessage;