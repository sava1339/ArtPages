import type { IChatRoom } from "./IChatRoom";
import type { IRoomMember } from "./IRoomMember";

export interface IFetchRooms extends IChatRoom{
    room_members:IRoomMember[],
}