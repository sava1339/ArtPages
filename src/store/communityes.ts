import { create } from "zustand";
import type { ICommunity } from "../interfaces/ICommunity";
import { IGetCommunityType } from "../interfaces/IGetCommunityType";
import { useRecentCommunity } from "./recentCommunity";
import { get as getdb, set as setdb } from 'idb-keyval';
import supabase from "../supabaseClient";
import { v4 } from "uuid";

export interface IUseCommunityes{
    communityes:ICommunity[],
    addCommunityes:(communityes:ICommunity[])=>void,
    getCommunity:(getCommunityType:IGetCommunityType,value:any)=>Promise<ICommunity|null>,
    getCommunityesWithFiles:(communityes:ICommunity[])=>Promise<ICommunity[]>,
    getCommunityAll:()=>Promise<ICommunity[]>,
    getCommunityByTitle:(title:string)=>Promise<ICommunity>,
    getCommunityById:(id:string)=>Promise<ICommunity>,
    getCommunityesByIds:(ids:string[])=>Promise<void>,
    createCommunity:(title:string,desc:string,avatar:File)=>Promise<void>
}

export const useCommunityes = create<IUseCommunityes>((set,get)=>({
    communityes:[
        
    ],
    addCommunityes:(communityes)=>set((state)=>({
        communityes:[...state.communityes,...communityes]
    })),
    getCommunity: async(getCommunityType,value) =>{
        switch(getCommunityType){
            case IGetCommunityType.byTitle:{
                const match = get().communityes.filter(community => community.title === value);
                if(match.length > 0){
                    useRecentCommunity.getState().addRecentCommunity(match[0].id);
                    return match[0];
                }
                const community:ICommunity = await get().getCommunityByTitle(value);
                get().addCommunityes([community]);
                useRecentCommunity.getState().addRecentCommunity(community.id);
                return community;
            }
            case IGetCommunityType.byId:{
                const match = get().communityes.filter(community => community.id === value);
                if(match.length > 0){
                    useRecentCommunity.getState().addRecentCommunity(match[0].id);
                    return match[0];
                }
                const community:ICommunity = await get().getCommunityById(value);
                get().addCommunityes([community]);
                useRecentCommunity.getState().addRecentCommunity(community.id);
                return community;
            }
            default:{
                return null;
            }
        }
    },
    getCommunityesByIds:async(ids:string[])=>{
        const otherCommunityIds = get().communityes.map(community => community.id);
        const filteredIds = ids.filter(id => !otherCommunityIds.includes(id));
        if(filteredIds.length === 0){
            return;
        }
        const {data,error} =  await supabase
            .from("community")
            .select("*")
            .in('id',filteredIds);
        if(error) throw error;
        const communityesWithFiles = await get().getCommunityesWithFiles(data);
        get().addCommunityes(communityesWithFiles);
    },
    getCommunityesWithFiles: async(communityes)=>{
        const communityesWithFiles:ICommunity[] = await Promise.all(
            communityes.map(async(community:ICommunity)=>{
                const avatar = await getdb(community.avatar_file_path);
                if(avatar!=null){
                    return {
                        ...community,
                        avatar_file:avatar
                    }
                }
                try {
                    const {data:image,error:imageError} = await supabase.storage
                        .from("avatar_images")
                        .download(community.avatar_file_path);
                    if(imageError) throw imageError;
                    const dataURL:string = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.readAsDataURL(image);
                    });
                    await setdb(community.avatar_file_path,dataURL);
                    return {
                        ...community,
                        avatar_file:dataURL
                    }
                } catch (error) {
                    console.log("communityImagesFetchError:"+error)
                }
            })
        ) as ICommunity[];
        return communityesWithFiles;
    },
    getCommunityAll: async()=>{
        const {data,error} = await supabase
            .from("community")
            .select("*");
        if(error) throw error;
        const communityesWithFiles = await get().getCommunityesWithFiles(data);
        return communityesWithFiles;
    },
    getCommunityByTitle: async(title)=>{
        const {data,error} = await supabase
            .from("community")
            .select("*")
            .eq("title",title);
        if(error) throw error;
        const communityesWithFiles = await get().getCommunityesWithFiles(data);
        return communityesWithFiles[0];
    },
    getCommunityById: async(id)=>{
        const {data,error} = await supabase
            .from("community")
            .select("*")
            .eq("id",id);
        if(error) throw error;
        const communityesWithFiles = await get().getCommunityesWithFiles(data);
        return communityesWithFiles[0];
    },
    createCommunity: async(title,desc,avatar)=>{
        const filename = v4()+".jpg";
        const uploadImage = async()=>{
            const { error } = await supabase.storage
                .from('avatar_images')
                .upload(filename, avatar);
            if (error) throw error;
        }
        const createCommunity = async()=>{
            const { error } = await supabase
                .from('community')
                .insert([
                { 
                    title:title,
                    desc:desc,
                    avatar_file_path:filename
                }
                ]);
            if (error) throw error;
        }
        uploadImage();
        createCommunity();
    }
}))