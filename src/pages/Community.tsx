import { usePosts } from "../store/posts.ts";
import { useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import TextButton from "../modals/Buttons/TextButton";
import Avatar from "../modals/Avatar";
import CommunityAside from "../components/Aside/CommunityAside.tsx";
import { useCommunityes } from "../store/communityes.ts";
import Layout from "../layouts/Layout.tsx";
import type { ICommunity } from "../interfaces/ICommunity.ts";
import { IGetCommunityType } from "../interfaces/IGetCommunityType.ts";
import { IGetPostType } from "../interfaces/IGetPostType.ts";
import { useAuthUser } from "../store/authUser.ts";
import { AUTH } from "../utils/consts.ts";
import { useSubCommunityes } from "../store/subCommunityes.ts";


function Commutnity() {
    const location = useLocation();
    const navigate = useNavigate();
    const [com,setCom] = useState<ICommunity | null>(null);
    const [isLoading,setIsLoading] = useState(true);
    const {posts,fetchPosts} = usePosts();
    const {fetchCommunity} = useCommunityes();
    const filteredPosts = posts.filter(post => post.community_id === com?.id);
    const {isAuth,userData} = useAuthUser();
    const {addSubCommunity,subCommunity,removeSubCommunity} = useSubCommunityes();
    const isSub = subCommunity.some(community => community.community_id == com?.id);

    useEffect(()=>{
        window.scrollTo(0, 0);
        const getData = async()=>{
            const community:ICommunity|null = await fetchCommunity(IGetCommunityType.byTitle,location.pathname.split('/')[2]);
            if(community === null) alert("Произошла ошибка");
            fetchPosts(IGetPostType.byCommunityId,community?.id);
            setCom(community);
            setIsLoading(false);
        }
        getData();
    },[location.pathname])
    const subCommunityHandler = ()=>{
        if(!isAuth || !userData){
            navigate(AUTH);
            return;
        }
        if(!com) return;
        addSubCommunity(com.id,userData.id);
    }
    const unsubCommunityHandler = ()=>{
        if(!isAuth || !userData){
            navigate(AUTH);
            return;
        }
        if(!com) return;
        removeSubCommunity(com.id,userData.id)
    }
    return (
        <Layout>
            {isLoading || com === null ? null
            : <div>
                <div className="flex flex-col">
                    <div className="h-32 w-full rounded-xl bg-cover bg-center bg-[url(/Header.jpg)] ">

                    </div>
                    <div className="flex relative justify-end text-regular py-4 px-4">
                        <div className="absolute -top-10 left-8 flex gap-3 items-end">
                            <Avatar className="border-6 border-solid box-border border-main outline-0" avatar={com.avatar_file || "/avatar.svg"} size="3xl"/>
                            <h1 className="font-bold text-[21px]">{com.title}</h1>
                        </div>
                        <div className="flex gap-3 items-center">
                            <TextButton action={()=>navigate(`${location.pathname}/createpost`)} className="flex gap-2 items-center border-[0.5px] py-1.5 border-secondary hover:border-regular">
                                <img className="h-4" src="/edit.svg" alt="" />
                                <p>Новый пост</p>
                            </TextButton>
                            <TextButton padding="none" className="flex gap-2 p-1.5 items-center justify-center border-[0.5px] border-secondary hover:border-regular">
                                <img className="h-4 w-4" src="/notification.svg" alt="" />
                            </TextButton>
                            {!isSub ? <TextButton action={subCommunityHandler} className="flex gap-2 items-center py-1.5 bg-button hover:bg-action">
                                <p>Подписаться</p>
                            </TextButton>
                            :<TextButton action={unsubCommunityHandler} className="flex gap-2 items-center border-[0.5px] py-1.5 border-secondary hover:border-regular">
                                <p>Подписаны</p>
                            </TextButton>
                            }
                            <TextButton padding="none" className="flex gap-2 p-1.5 items-center justify-center border-[0.5px] border-secondary hover:border-regular">
                                <img className="h-4 w-4 rotate-90" src="/more.svg" alt="" />
                            </TextButton>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex w-[732px] flex-col gap-4 text-regular">
                        {filteredPosts.map((post)=>( 
                                <div key={post.id} className="border-t border-secondary">
                                    <Post data={post} />
                                </div>
                            ))}
                    </div>
                    <CommunityAside title={com.title} desc={com.desc} />
                </div>
            </div>
            }
        </Layout>
     );
}

export default Commutnity;