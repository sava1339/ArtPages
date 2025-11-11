import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { usePosts } from '../store/posts';
import type { IUsePosts } from '../store/posts';
import type { IPost } from '../interfaces/IPost';
import type { IRecentPost } from '../interfaces/IRecentPost';

interface IRecentPostEl{
    data:IRecentPost
}

function RecentPost({data}:IRecentPostEl) {
    dayjs.extend(relativeTime);
    const {posts} = usePosts((state:IUsePosts)=>state);
    const recentData = posts.filter((post:IPost) => post.id == data.postId)[0];
    const lastUpdate = dayjs(recentData.date);
    return ( 
        <div className="flex justify-between gap-4 mx-3">
            <div className="flex flex-col flex-1 gap-2">
                <div className="flex items-center gap-1">
                    <img className='w-6 cursor-pointer' src="/vite.svg" alt="" />
                    <p className='text-[12px] hover:underline cursor-pointer'>PublicName</p>
                    <p>•</p>
                    <p className='text-[12px]'>{lastUpdate.fromNow()}</p>
                </div>
                <p className="text-ellipsis line-clamp-2 text-[12px] font-bold cursor-pointer hover:underline">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus autem quam corporis, odio ullam fugiat similique pariatur aperiam exercitationem vitae incidunt, aspernatur commodi ab reprehenderit ipsa quis perferendis? Beatae, accusamus!
                </p>
                <div className="flex items-center gap-1 text-[12px]">
                    <p>{recentData.votes} рейтинг</p>
                    <p>•</p>
                    <p>1к комментариев</p>
                </div>
            </div>
            <div style={{backgroundImage:`url(${recentData.img})`}} className='w-20 h-20 rounded-xl bg-center bg-cover cursor-pointer'></div>
        </div>
     );
}

export default RecentPost;