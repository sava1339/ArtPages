import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelectedPost } from "../store/selectedPost";
import VoteSelector from "../modals/VoteSelector";
import SaveButton from "../modals/SaveButton";
import MessageField from '../modals/MessageField';
import TextButton from '../modals/Buttons/TextButton';
import { useEffect, useState } from 'react';
import {clsx} from 'clsx';
import Comment from './Comment';
import Button from '../modals/Buttons/Button';
import { useIsVertical } from '../store/isVertical';
import Avatar from '../modals/Avatar';
import { useCommunityes } from '../store/communityes';
import type { IPost } from '../interfaces/IPost';
import type { IUseIsVertical } from '../store/isVertical';
import type { IUseCommunityes } from '../store/communityes';
import type { ICommunity } from '../interfaces/ICommunity';
import type { IUseSelectedPost } from '../store/selectedPost';
import { useComments } from '../store/comments';
import { useUser } from '../store/users';

interface IPostView{
    data:IPost
}

function PostView({data}:IPostView) {
    dayjs.extend(relativeTime);
    const [isMoreContent,setIsMoreContent] = useState(true);
    const {isVertical,verticalToggle} = useIsVertical((state:IUseIsVertical)=>state);
    const {communityes} = useCommunityes((state:IUseCommunityes)=>state);
    const {comments,sendComment,getCommentsByPost} = useComments((state)=>state);
    const {users} = useUser();
    const curUser = users.filter(user=> user.id === data.user_id)[0];
    const filterComments = comments.filter(comment=>comment.post_id === data.id);
    const curCommunity = communityes.filter((community:ICommunity) => community.id === data.community_id)[0];
    const {deselect} = useSelectedPost((state:IUseSelectedPost)=>state);
    const lastUpdate = dayjs(data.created_at);
    const sendCommentHandler = (userId:string,context:string) =>{
        sendComment(userId,data.id,context);
    }
    useEffect(()=>{
        getCommentsByPost(data.id);
    },[])
    return ( 
        <div className="fixed top-0 h-screen z-40 w-screen">
            <div className="absolute absolute-center-x text-regular bg-main z-20 h-screen overflow-y-scroll w-[1000px] py-4 px-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center text-[12px]">
                        <Avatar className="cursor-pointer mr-1" avatar={curCommunity.avatar_file} size="md" />
                        <div className='flex flex-col'>
                            <div className='flex gap-1'>
                                <p className="font-bold text-[12px]">{curCommunity.title}</p>
                                <p>•</p>
                                <p className="text-secondary">{lastUpdate.fromNow()}</p>
                            </div>
                            <p className=" text-[10px] text-secondary">{curUser.login}</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <Button imgSize='xs2' action={verticalToggle} img="/rotate.svg" />
                        <Button img="/close.svg" imgSize="xs1" action={deselect} />
                    </div>
                </div>
                <div 
                    className={clsx(
                        'flex gap-8',
                        {
                            "flex-col":isVertical,
                            "mt-4":!isVertical
                        }
                    )}
                >
                    <div className='flex flex-col gap-8'>
                        {
                        isVertical && 
                        <h2 className='font-bold text-[21px] text-regular'>{data.title}</h2>
                        }
                        {data.post_file && <div 
                            className={
                                clsx(
                                    "h-[600px]  flex justify-center items-center relative overflow-hidden",
                                    {
                                        "w-[500px]":!isVertical,
                                        "w-full":isVertical
                                    }
                                )}
                        >
                            <img src={data.post_file} className="absolute z-10 h-full" alt="" />
                            <div style={{backgroundImage:`url(${data.post_file})`}} className="bg-center bg-cover blur-2xl top-0 left-0 w-full h-full" />
                        </div>}
                    </div>
                    <div className='flex-1 gap-2 flex flex-col'>
                        {
                        !isVertical && 
                        <h2 className='font-bold text-[21px] text-regular'>{data.title}</h2>
                        }
                        <p 
                        className={
                            clsx('text-secondary',
                            {
                                "line-clamp-1 text-ellipsis":!isMoreContent
                            })
                        }>
                            {data.desc}
                        </p>
                        <TextButton 
                            action={()=>setIsMoreContent(!isMoreContent)} 
                            className="w-fit bg-main hover:bg-mainselect text-regular"
                        >
                            {isMoreContent ? "Уменьшить" : "Больше..."}
                        </TextButton>
                        <div className='flex gap-2 mt-4'>
                            <VoteSelector id={data.id} view />
                            <SaveButton id={data.id} />
                            <TextButton className="rounded-[999px] flex items-center gap-2 border-[0.5px] border-secondary hover:bg-secondary h-[26px]">
                                <img className='h-4' src="/Chat.svg" alt="" />
                                <p className='text-[12px] font-semibold'>{data.comment_count}</p>
                            </TextButton>
                            <TextButton className="rounded-[999px] flex items-center gap-2 border-[0.5px] border-secondary hover:bg-secondary h-[26px]">
                                <img className='h-4' src="/share.svg" alt="" />
                                <p className='text-[12px] font-semibold'>Поделится</p>
                            </TextButton>
                        </div>
                        <MessageField send={sendCommentHandler} placeholder="Присоеденись к обсуждению!" />
                        <div className='flex flex-col gap-2'>
                            {filterComments.map(comment=>(
                                <Comment comment={comment} key={comment.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black opacity-40 h-full w-full"></div>
        </div>
     );
}

export default PostView;