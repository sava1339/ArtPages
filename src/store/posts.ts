import { create } from "zustand";
import type { IPost } from "../interfaces/IPost";
import { v4 } from "uuid";
import supabase from "../supabaseClient";
import { IGetPostType } from "../interfaces/IGetPostType";
import type { ICommunity } from "../interfaces/ICommunity";
import type { IUser } from "../interfaces/IUser";
import { useCommunityes } from './communityes';
import { useUser } from "./users";
import type { IFetchPost } from "../interfaces/IFetchPost";
import { useVotePost } from "./votePost";
import type { IVote } from "../interfaces/IVote";
import { get as getdb, set as setdb } from 'idb-keyval';
import { useAuthUser } from "./authUser";

export interface IUsePosts{
    posts:IPost[],
    postLists:any[],
    deleteById:(id:string)=>Promise<void>,
    setVotes:(id:string,votes:number)=>void,
    addPost:(post:IPost)=>void,
    addPosts:(newPosts:IPost[])=>void,
    createPost:(title:string,desc:string,userId:number|string,communityId:number|string,image?:File)=>Promise<void>,
    getPosts:(getPostType:IGetPostType,value?:string)=>void,
    getPostsAll:()=>Promise<IFetchPost[]>,
    getPostsByCommunityId:(community_id:string)=>Promise<IFetchPost[]>,
    getPostsWithImages:(posts:IFetchPost[])=>Promise<IFetchPost[]>,
    getPostsByIds:(ids:string[])=>Promise<void>
}

export const usePosts = create<IUsePosts>((set,get)=>({
    posts:[],
    postLists:[],
    
    addPost:(post)=>set((state)=>({
        posts:[...state.posts,post]
    })),
    deleteById: async(id) => {
        if(useAuthUser.getState().userData?.id !== get().posts.filter(post => post.id === id)[0].user_id){
            return;
        }
        const {error} = await supabase.rpc("delete_post_and_file",{
            post_id_to_delete:id
        })
        if(error) throw error;
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
                const image = await getdb(post.post_file_path);
                if(image!=null){
                    return {
                        ...post,
                        post_file:image
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
                    await setdb(post.post_file_path,dataURL);
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
                userList = await useUser.getState().getUsersWithAvatar(userList);
                communityList = await useCommunityes.getState().getCommunityesWithFiles(communityList);
                get().addPosts(postList);
                useCommunityes.getState().addCommunityes(communityList);
                useUser.getState().addUsers(userList);
                useVotePost.getState().setVotes(voteList);
                return;
            }
            case IGetPostType.byCommunityId:{
                if(!value) return;
                const data = await get().getPostsByCommunityId(value)
                data.forEach(item => {
                    const { community, votes, user, ...post } = item;
                    postList.push(post as IPost);

                    userList.push(user);
                    votes.map((vote:IVote)=>{
                        voteList.push(vote);
                    })
                });
                userList = await useUser.getState().getUsersWithAvatar(userList);
                get().addPosts(postList);
                useUser.getState().addUsers(userList);
                useVotePost.getState().setVotes(voteList);
                return;
            }
            default:
                return;
        }
    },
    getPostsByIds: async(ids)=>{
        const otherPostsIds = get().posts.map(post => post.id);
        const filteredIds = ids.filter(id => !otherPostsIds.includes(id));
        if(filteredIds.length === 0){
            return;
        };
        const {data,error} = await supabase
            .rpc("get_posts_byids",{
                post_ids:filteredIds
            })
        if(error) throw error;
        const flatData = data.map((post:any) => post.post_data);
        const postsWithFiles = await get().getPostsWithImages(flatData);
        get().addPosts(postsWithFiles);
    },
    getPostsByCommunityId: async(community_id)=>{
        const {data,error} = await supabase
            .rpc("get_community_posts",{
                page_limit: 10,
                page_offset: 0,
                community_id_param: community_id
            })
        if(error) throw error;
        const flatData = data.map((post:any) => post.post_data);
        const posts = await get().getPostsWithImages(flatData);
        return posts;
    },
    getPostsAll: async()=>{
        const {data,error} = await supabase
            .rpc("get_feed_posts",{
                page_limit: 10,
                page_offset: 0
            })
        if(error) throw error;
        const flatData = data.map((post:any) => post.post_data);
        const posts = await get().getPostsWithImages(flatData);
        return posts;
    }
}))