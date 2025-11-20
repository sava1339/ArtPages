import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { usePosts } from '../store/posts';
import type { IRecentPost } from '../interfaces/IRecentPost';
import Avatar from '../modals/Avatar';
import { useCommunityes } from '../store/communityes';
import type { ICommunity } from '../interfaces/ICommunity';
import type { IPost } from '../interfaces/IPost';
import { useVotePost } from '../store/votePost';

interface IRecentPostEl{
    data:IRecentPost
}

function RecentPost({data}:IRecentPostEl) {
    dayjs.extend(relativeTime);
    const {posts} = usePosts();
    const {communityes} = useCommunityes();
    const recentData:IPost|undefined = posts.filter((post) => post.id == data.postId)[0];
    const curCommunity:ICommunity|undefined = communityes.filter((community)=>community.id == recentData.community_id)[0];
    const lastUpdate = dayjs(recentData.created_at);
    const {votePosts} = useVotePost();
    const votes = 
            votePosts.filter((vote)=>+vote.post_id === +recentData.id && vote.vote == true).length - 
            votePosts.filter((vote)=>+vote.post_id === +recentData.id && vote.vote == false).length
    return ( 
        <div className="flex justify-between gap-4 mx-3">
            <div className="flex flex-col flex-1 gap-2">
                <div className="flex items-center gap-2">
                    <Avatar size='sm' avatar={curCommunity.avatar_file} />
                    <p className='text-[10px] hover:underline cursor-pointer'>{curCommunity.title}</p>
                    <p className='text-[10px]'>•</p>
                    <p className='text-[10px]'>{lastUpdate.fromNow()}</p>
                </div>
                <p className="text-ellipsis line-clamp-2 text-[12px] font-bold cursor-pointer hover:underline">
                    {recentData.title}
                </p>
                <div className="flex items-center gap-2 text-[12px]">
                    <p>{votes} рейтинг</p>
                    <p className='text-[10px]'>•</p>
                    <p>{recentData.comment_count} комментариев</p>
                </div>
            </div>
            <div style={{backgroundImage:`url(${recentData.post_file})`}} className='w-20 h-20 rounded-xl bg-center bg-cover cursor-pointer'></div>
        </div>
     );
}

export default RecentPost;