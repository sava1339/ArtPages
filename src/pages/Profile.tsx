import ProfileAside from "../components/Aside/ProfileAside";
import Post from "../components/Post";
import Avatar from "../modals/Avatar";
import TextButton from "../modals/Buttons/TextButton";
import type { IPost } from "../interfaces/IPost";
import { useSavePosts } from "../store/savePosts";
import { useVotePost } from "../store/votePost";
import { usePosts } from "../store/posts";
import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { IGetUserType } from "../interfaces/IGetUserType";
import type { IUser } from "../interfaces/IUser";
import { useUser } from "../store/users";
import { useAuthUser } from "../store/authUser";
import Spinner from "../components/Spinner";


function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const {posts} = usePosts();
    const {votePosts} = useVotePost();
    const {savePosts} = useSavePosts();
    const [isLoading,setIsLoading] = useState(true);
    const [curUser,setCurUser] = useState<IUser>();
    const [isMyProfile,setIsMyProfile] = useState(false); 
    const {userData,isAuth} = useAuthUser();
    const [curPosts,setCurPosts] = useState<IPost[]|null>(null);
    const {fetchUser} = useUser();

    useEffect(()=>{
        const getData = async()=>{
            const user:IUser|null = await fetchUser(IGetUserType.byLogin,location.pathname.split("/")[2]);
            if(user==null){
                navigate("/home");
                return;
            };
            setCurPosts(
                posts.filter(post => post.user_id === user.id)
            )
            setCurUser(user);
            setIsLoading(false);
        }
        getData();
    },[]);
    useEffect(()=>{
        if(isAuth && userData && curUser?.id === userData.id){
            setIsMyProfile(true)
        }
    },[isAuth,curUser]);
    
    const savePostList = posts.filter((post:IPost) => 
        savePosts.some(save => save.post_id === post.id)
    )
    const downvotePostList = posts.filter((post:IPost) => 
        votePosts.some(vote => vote.post_id === post.id && vote.vote === false)
    )
    const upvotePostList = posts.filter((post:IPost) => 
        votePosts.some(vote => vote.post_id === post.id && vote.vote === true)
    )
    const [sortType,setSortType] = useState("Просмотр");
    return ( 
        <Layout>
            {!isLoading && curUser ? <div className="flex">
                <div className="flex w-[732px] flex-col gap-4 text-regular">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-3 ml-8 items-center">
                            <Avatar avatar={curUser.avatar_file} size="xl"/>
                            <div className="flex flex-col gap-1">
                                <h1 className="font-bold text-[21px]">{curUser.nickname}</h1>
                                <p className="text-secondary text-[12px]">{curUser.login}</p>
                            </div>
                        </div>
                        {isMyProfile && <div className="flex gap-4">
                            <TextButton action={()=>setSortType("Просмотр")} className="bg-main hover:bg-mainselect hover:underline px-4 text-[14px]">Просмотр</TextButton>
                            <TextButton action={()=>setSortType("Посты")} className="bg-main hover:bg-mainselect hover:underline px-4 text-[14px]">Посты</TextButton>
                            <TextButton action={()=>setSortType("Комментарии")} className="bg-main hover:bg-mainselect hover:underline px-4 text-[14px]">Комментарии</TextButton>
                            <TextButton action={()=>setSortType("Сохранённое")} className="bg-main hover:bg-mainselect hover:underline px-4 text-[14px]">Сохранённое</TextButton>
                            <TextButton action={()=>setSortType("Лайкнутое")} className="bg-main hover:bg-mainselect hover:underline px-4 text-[14px]">Лайкнутое</TextButton>
                            <TextButton action={()=>setSortType("Дизлайкнутое")} className="bg-main hover:bg-mainselect hover:underline px-4 text-[14px]">Дизлайкнутое</TextButton>
                        </div>}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        {sortType === "Просмотр" && curPosts?.map((post)=>( 
                            <div key={post.id} className="border-t border-secondary">
                                <Post data={post} />
                            </div>
                        ))}
                        {sortType === "Сохранённое" && savePostList.map((post)=>(
                            <div key={post.id} className="border-t border-secondary">
                                <Post data={post} />
                            </div>
                        ))}
                        {sortType === "Лайкнутое" && upvotePostList.map((post)=>(
                            <div key={post.id} className="border-t border-secondary">
                                <Post data={post} />
                            </div>
                        ))}
                        {sortType === "Дизлайкнутое" && downvotePostList.map((post)=>(
                            <div key={post.id} className="border-t border-secondary">
                                <Post data={post} />
                            </div>
                        ))}
                    </div>
                </div>
                <ProfileAside nickname={curUser.nickname} bio={curUser.bio} created_at={curUser.created_at} />
            </div>
            : <Spinner/>}
        </Layout>
     );
}

export default Profile;