import type { IComment } from "../interfaces/IComment";
import Avatar from "../modals/Avatar";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface ICommentEl{
    comment:IComment
}

function Comment({comment}:ICommentEl) {
    dayjs.extend(relativeTime);
    const lastUpdate = dayjs(comment.date);
    return ( 
        <div className='flex gap-2'>
            <Avatar className="cursor-pointer mr-1" avatar="/vite.svg" size="md" />
            <div className='flex flex-col gap-2 flex-1'>
                <div className='flex gap-1 text-regular text-[12px]'>
                    <p className="font-bold cursor-pointer hover:underline">User</p>
                    <p>•</p>
                    <p className="text-secondary">{lastUpdate.fromNow()}</p>
                </div>
                <p className='text-secondary'>
                    {comment.context}
                </p>
            </div>
        </div>
     );
}

export default Comment;