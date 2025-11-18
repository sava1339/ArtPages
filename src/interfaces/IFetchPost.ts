import type { ICommunity } from "./ICommunity";
import type { IPost } from "./IPost";
import type { IUser } from "./IUser";

export interface IFetchPost extends IPost{
    community:ICommunity,
    user:IUser
}