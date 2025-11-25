import type { IChatRoom } from "../interfaces/IChatRoom";
import Avatar from "../modals/Avatar";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMessages } from "../store/messages";
import { useRoomMemebers } from "../store/roomMembers";

interface IChatGroup{
    room:IChatRoom
}

function ChatGroup({room}:IChatGroup) {
    dayjs.extend(relativeTime);
    const lastUpdate = dayjs(room.created_at);
    const {messages} = useMessages();
    const {roomMembers} = useRoomMemebers();
    return ( 
        <>
            <div className="px-4 py-3 flex gap-4 hover:bg-mainselect cursor-pointer">
                <Avatar avatar="/avatar.jpg" size="xl" />
                <div className="flex flex-col gap-2 flex-1">
                    <div className="flex justify-between items-center">
                        <p className="text-[16px]">{room.name}</p>
                        <p className="text-[12px] text-secondary">3 Окт</p>
                    </div>
                    <p className=" line-clamp-1 text-[16px] text-secondary">You: Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nihil enim quisquam nostrum minima id, reiciendis odit! Repellat doloremque libero obcaecati blanditiis quaerat dolorem maxime accusamus! Aliquam dicta debitis quae.</p>
                </div>
            </div>
        </>
     );
}

export default ChatGroup;