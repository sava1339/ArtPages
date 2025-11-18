import { create } from "zustand";
import type { IPost } from "../interfaces/IPost";
import { v4 } from "uuid";
import supabase from "../supabaseClient";
import { IGetPostType } from "../interfaces/IGetPostType";
import type { ICommunity } from "../interfaces/ICommunity";
import type { IUser } from "../interfaces/IUser";
import { getUsersWithAvatar } from "../Controllers/userController";
import { getCommunityesWithFiles } from "../Controllers/communityController";
import { useCommunityes } from './communityes';
import { useUser } from "./users";
import type { IFetchPost } from "../interfaces/IFetchPost";
import { useVotePost } from "./votePost";
import type { IVote } from "../interfaces/IVote";

export interface IUsePosts{
    posts:IPost[],
    postLists:any[],
    deleteById:(id:string)=>void,
    setVotes:(id:string,votes:number)=>void,
    addPost:(post:IPost)=>void,
    addPosts:(newPosts:IPost[])=>void,
    createPost:(title:string,desc:string,userId:number|string,communityId:number|string,image?:File)=>void,
    getPosts:(getPostType:IGetPostType,value?:string)=>void,
    getPostsAll:()=>Promise<IFetchPost[]>,
    getPostsWithImages:(posts:IFetchPost[])=>Promise<IFetchPost[]>
}

export const usePosts = create<IUsePosts>((set,get)=>({
    posts:[],
    postLists:[],
    
    addPost:(post)=>set((state)=>({
        posts:[...state.posts,post]
    })),
    deleteById: (id) => {
        const newPosts = get().posts.filter(p => p.id !== id);
        set({ posts: newPosts });
    },
    addPosts: (newPosts)=> {
        const newPostList:IPost[] = [];
        newPosts.map(post=>{
            const isMatch = get().posts.some(p => p.id === post.id);
            if(!isMatch) newPostList.push(post);
        })
        set({
            posts:[...get().posts,...newPostList]
        })
    },
    setVotes: (id,votes) => set((state) => ({
        posts: state.posts.map(post =>
        post.id === id 
            ? { ...post, votes: votes }
            : post
        )
    })),
    createPost: async(title,desc,userId,communityId,image) =>{
        const filename = v4()+".jpg";
        const uploadImage = async()=>{
            if(image){
                const {error} = await supabase.storage
                    .from("post_images")
                    .upload(filename,image);
                if(error) throw error;
            }
        }
        const createPost = async()=>{
            const {error} = await supabase
                .from("post")
                .insert([
                    {
                        title:title,
                        post_file_path:(image ? filename : null),
                        desc:desc,
                        community_id:communityId,
                        user_id:userId
                    }
                ]) 
            if(error) throw error;
        }
        uploadImage();
        createPost();
    },
    getPostsWithImages: async(posts)=>{
        const postsWithImages:IFetchPost[] = await Promise.all(
            posts.map(async(post)=>{
                if(post.post_file_path === null){
                    return post;
                }
                if(localStorage.getItem(post.post_file_path)!=null){
                    return {
                        ...post,
                        post_file:localStorage.getItem(post.post_file_path)
                    }
                }
                try {
                    const {data:image,error} = await supabase.storage
                        .from("post_images")
                        .download(post.post_file_path);
                    if(error) throw error;
                    const dataURL:string = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.readAsDataURL(image);
                    });
                    localStorage.setItem(post.post_file_path,dataURL);
                    return{
                        ...post,
                        post_file:dataURL
                    }
                } catch (error) {
                    console.log("postImagesFetchError:"+error)
                }
            })
        ) as IFetchPost[];
        return postsWithImages;
    },
    getPosts: async(getPostType:IGetPostType,value?:string)=>{
        const postList: IPost[] = [];
        let communityList:ICommunity[] = [];
        let userList:IUser[] = [];
        let voteList:IVote[] = [];
        switch (getPostType) {
            case IGetPostType.all:{
                const data = await get().getPostsAll();
                data.forEach(item => {
                    const { community, votes, user, ...post } = item;
                    postList.push(post as IPost);

                    communityList.push(community);
                    userList.push(user);
                    votes.map((vote:IVote)=>{
                        voteList.push(vote);
                    })
                });
                userList = await getUsersWithAvatar(userList);
                communityList = await getCommunityesWithFiles(communityList);
                get().addPosts(postList);
                useCommunityes.getState().addCommunityes(communityList);
                useUser.getState().addUsers(userList);
                useVotePost.getState().setVotes(voteList);
                return;
            }
            default:
                return;
        }
    },
    getPostsAll: async()=>{
        const {data,error} = await supabase
            .rpc("get_feed_posts",{
                page_limit: 10,
                page_offset: 0
            })
        if(error) throw error;
        const flatData = data.map((post:any) => post.post_data)
        const users = await get().getPostsWithImages(flatData);
        return users;
    }
}))