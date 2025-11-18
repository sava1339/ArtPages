import type { ICommunity } from "../interfaces/ICommunity";
import type { IPost } from "../interfaces/IPost";
import Avatar from "../modals/Avatar";
import { useCommunityes } from "../store/communityes";

interface ITopScrollPost{
    post:IPost
}

function TopScrollPost({post}:ITopScrollPost) {
    const {communityes} = useCommunityes();
    const curCommunity:ICommunity|undefined = communityes.filter((community)=>community.id == post.community_id)[0];
    return ( 
        <div className="relative cursor-pointer">
            <div className="absolute bottom-0 p-2 z-1">
                <h2 className="text-[18px] font-bold text-ellipsis line-clamp-1">{post.title}</h2>
                <p className=" text-ellipsis line-clamp-1">{post.desc}</p>
                <div className="flex items-center gap-1">
                    <Avatar size="sm" avatar={curCommunity.avatar_file} />
                    <p className="text-[12px]">{curCommunity.title}</p>
                    <p className="text-secondary text-[12px]">и более</p>
                </div>
            </div>
            <div className="inner-shadow absolute top-0 left-0 w-full h-full rounded-xl"></div>
            <div 
                className="w-64 h-48 bg-cover bg-center rounded-xl" 
                style={{backgroundImage:`url(${post.post_file})`}} 
            ></div>
        </div>
     );
}

export default TopScrollPost;