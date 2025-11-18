import { v4 } from "uuid";
import type { ICommunity } from "../interfaces/ICommunity";
import supabase from "../supabaseClient";

export const getCommunityesWithFiles = async(communityes:ICommunity[])=>{
    const communityesWithFiles:ICommunity[] = await Promise.all(
        communityes.map(async(community:ICommunity)=>{
            if(localStorage.getItem(community.avatar_file_path)!=null){
                return {
                    ...community,
                    avatar_file:localStorage.getItem(community.avatar_file_path)
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
                localStorage.setItem(community.avatar_file_path,dataURL);
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
}

export const getCommunityAll = async():Promise<ICommunity[]>=>{
    const {data,error} = await supabase
        .from("community")
        .select("*");
    if(error) throw error;
    const communityesWithFiles = await getCommunityesWithFiles(data);
    return communityesWithFiles;
}
export const getCommunityByTitle = async(title:string):Promise<ICommunity>=>{
    const {data,error} = await supabase
        .from("community")
        .select("*")
        .eq("title",title);
    if(error) throw error;
    const communityesWithFiles = await getCommunityesWithFiles(data);
    return communityesWithFiles[0];
}
export const getCommunityById = async(id:string):Promise<ICommunity>=>{
    const {data,error} = await supabase
        .from("community")
        .select("*")
        .eq("id",id);
    if(error) throw error;
    const communityesWithFiles = await getCommunityesWithFiles(data);
    return communityesWithFiles[0];
}
export const createCommunity = async(title:string,desc:string,avatar:File)=>{
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