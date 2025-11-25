import type { IMessage } from "../interfaces/IMessage";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from "../modals/Avatar";
import { useUser } from "../store/users";

interface IChatMessage{
    message:IMessage
}

function ChatMessage({message}:IChatMessage) {
    dayjs.extend(relativeTime);
    const lastUpdate = dayjs(message.created_at);
    const {getUserById} = useUser();
    const curUser = getUserById(message.user_id)
    return ( 
        <>
            {curUser && <div className="flex gap-2 px-3 py-2">
                <Avatar avatar="/avatar.jpg" size="md" />
                <div className="flex flex-col gap-1 flex-1">
                    <div className="flex gap-1">
                        <p className="font-bold text-[14px]">{curUser.nickname}</p>
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