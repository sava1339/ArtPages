import { usePosts } from "../store/posts";
import {useLocation} from 'react-router-dom';
import { useEffect, useState } from "react";
import SocialAside from "../components/Aside/SocialAside";
import Post from '../components/Post';
import TopScroll from '../components/TopScroll';
import type { IPost } from '../interfaces/IPost';
import { usePostBlackList } from '../store/postBlackList';
import Layout from '../layouts/Layout';
import { IGetPostType } from "../interfaces/IGetPostType";
import Spinner from "../components/Spinner";

function Main() {
    const {posts,fetchPosts} = usePosts();
    const {postBlackList} = usePostBlackList();
    const [isLoading,setIsLoading] = useState(true);
    const location = useLocation();
    const [filterPosts,setFilterPosts] = useState<IPost[]>();
    useEffect(()=>{
        const filterPostList = postBlackList.length > 0 ? 
            posts.filter((post:IPost)=>
                !postBlackList.some(postBL => postBL === post.id)
            ) 
            : posts;
        setFilterPosts(filterPostList);
    },[posts])
    useEffect(()=>{
        window.scrollTo(0, 0);
        if(posts.length > 0){
            setIsLoading(false);
        }
        const getData = async() =>{
            fetchPosts(IGetPostType.all);
            setIsLoading(false);
        }
        getData();
    },[location.pathname])
    return ( 
        <>
            <Layout>
                {location.pathname == "/popular" && <TopScroll posts={posts}/>}
                <div className="flex">
                    <div className="flex w-[732px] flex-col justify-center items-center gap-4">
                        {!isLoading && filterPosts ? filterPosts.map((post:IPost)=>( 
                            <div key={post.id} className="border-t border-secondary">
                                <Post data={post} />
                            </div>
                        )) 
                        : <Spinner/>}
                    </div>
                    <SocialAside/>
                </div>
            </Layout>
        </>
    );
}

export default Main;