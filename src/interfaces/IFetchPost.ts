import { IPost } from './IPost';
import { ICommunity } from './ICommunity';
import { IUser } from './IUser';
export interface IFetchPost extends IPost{
    community:ICommunity,
    user:IUser
}