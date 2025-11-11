import { usePosts } from "../store/posts";
import {useLocation} from 'react-router-dom';
import { useEffect } from "react";
import SocialAside from "../components/Aside/SocialAside";
import Post from '../components/Post';
import TopScroll from '../components/TopScroll';
import type { IPost } from '../interfaces/IPost';
import { usePostBlackList } from '../store/postBlackList';
import Layout from '../layouts/Layout';

function Main() {
    const {posts} = usePosts((state)=>state);
    const {postBlackList} = usePostBlackList((state)=>state);
    const location = useLocation();
    const filterPosts = postBlackList.length > 0 ? 
            posts.filter((post:IPost)=>
                !postBlackList.some(postBL => postBL === post.id)
            ) 
            : posts;
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[location.pathname])
    return ( 
        <>
            <Layout>
                {location.pathname == "/popular" && <TopScroll posts={posts}/>}
                <div className="flex">
                    <div className="flex w-[732px] flex-col justify-center items-center gap-4">
                        {filterPosts.map((post:IPost)=>( 
                            <div key={post.id} className="border-t border-secondary">
                                <Post data={post} />
                            </div>
                        ))}
                    </div>
                    <SocialAside/>
                </div>
            </Layout>
        </>
    );
}

export default Main;