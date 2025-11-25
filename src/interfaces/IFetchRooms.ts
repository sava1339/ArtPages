import type { IChatRoom } from "./IChatRoom";
import type { IRoomMember } from "./IRoomMember";

export interface IFetchRooms{
    chat_room:IChatRoom,
    members_count:number,
    room_member:IRoomMember
}