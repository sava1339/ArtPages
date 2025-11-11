import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import VoteSelector from "../modals/VoteSelector";
import SaveButton from "../modals/SaveButton";
import PostDrawer from '../modals/Drawers/PostDrawer';
import { useSelectedPost } from '../store/selectedPost';
import TextButton from '../modals/Buttons/TextButton';
import { useContextMenu } from './hooks/useContextMenu';
import Avatar from '../modals/Avatar';
import { useRecentPosts } from '../store/recentPosts';
import { useCommunityes } from '../store/communityes';
import { Link } from "react-router-dom";
import type { IPost } from '../interfaces/IPost';
import { useSubCommunityes } from '../store/subCommunityes';

interface IPostEl{
    data:IPost
}

function Post({data}:IPostEl) {
    dayjs.extend(relativeTime);
    const lastUpdate = dayjs(data.date);
    const {selectPost} = useSelectedPost((state)=>state);
    const contextMenu = useContextMenu();
    const {communityes} = useCommunityes((state)=>state);
    const curCommunity = communityes.filter((community) => community.id === data.communityId)[0];
    const {addRecent} = useRecentPosts((state)=>state);
    const {subCommunity,addSubCommunity} = useSubCommunityes((state)=>state);
    const isSub = subCommunity.some(community => community.communityId == data.communityId);
    const postClickHandler = () =>{
        selectPost(data);
        addRecent(data.id);
    }
    const subCommunityHandler = ()=>{
        addSubCommunity(data.communityId);
    }
    return ( 
    <>
        <div onClick={postClickHandler} className="flex flex-col text-regular p-2 w-[700px] hover:bg-mainselect rounded-xl mt-2 cursor-pointer">
            <div className="flex justify-between items-center">
                <Link onClick={(e)=>e.stopPropagation()} to={`/community/${curCommunity.title}`} className="flex gap-1 items-center text-[10px]">
                    <Avatar className="mr-1" avatar={curCommunity.img} size="sm" />
                    <p className=" font-bold  cursor-pointer hover:text-action">{curCommunity.title}</p>
                    <p>•</p>
                    <p className="text-secondary">{lastUpdate.fromNow()}</p>
                </Link>
                <div onClick={(e)=>e.stopPropagation()} className="flex gap-1 items-center">
                    {!isSub && <TextButton action={subCommunityHandler} className="bg-button hover:bg-action">Подписаться</TextButton>}
                    <div className='relative w-6 h-6 rounded-[50%] flex justify-center hover:bg-secondary'>
                        <div ref={contextMenu.ref}>
                            {contextMenu.isOpen && <PostDrawer id={data.id} />}
                        </div>
                        <img onClick={contextMenu.switchOpen} className='w-6 rotate-90 cursor-pointer' src="/more.svg" alt="" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <h2 className=" font-bold my-2">Новый супер крутой мега пост!</h2>
                <div 
                className="w-full ring-[0.5px] ring-secondary h-[500px] flex justify-center relative overflow-hidden rounded-4xl"
                >
                    <img src={data.img} className="h-full absolute z-10" alt="" />
                    <div style={{backgroundImage:`url(${data.img})`}} className="bg-center bg-cover blur-2xl top-0 left-0 w-full h-full" />
                </div>
            </div>
            <div className="flex mt-3 gap-2 items-center">
                <VoteSelector initialVotes={data.votes} id={data.id} />
                <SaveButton id={data.id} />
                <TextButton action={postClickHandler} className="rounded-[999px] flex items-center gap-2 border-[0.5px] border-secondary hover:bg-secondary h-[26px]">
                    <img className='h-4' src="/Chat.svg" alt="" />
                    <p className='text-[12px] font-semibold'>230</p>
                </TextButton>
                <TextButton className="rounded-[999px] flex items-center gap-2 border-[0.5px] border-secondary hover:bg-secondary h-[26px]">
                    <img className='h-4' src="/share.svg" alt="" />
                    <p className='text-[12px] font-semibold'>Поделится</p>
                </TextButton>
            </div>
        </div>
    </> 
    );
}

export default Post;