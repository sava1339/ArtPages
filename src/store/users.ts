import { create } from "zustand";
import type { IUser } from "../interfaces/IUser";
import { IGetUserType } from "../interfaces/IGetUserType";
import supabase from "../supabaseClient";
import { get as getdb, set as setdb } from 'idb-keyval';

interface IUseUser{
    users:IUser[],
    addUser:(user:IUser)=>void,
    addUsers:(users:IUser[])=>void,
    fetchUser:(getUserType:IGetUserType,value:string)=>Promise<IUser|null>,
    getUsersWithAvatar:(users:IUser[])=>Promise<IUser[]>,
    fetchUsersByLogin:(login:string)=>Promise<IUser>,
    fetchUsersById:(id:string)=>Promise<IUser>
    fetchUsersByIds:(ids:string[])=>Promise<void>,
    getUserById:(user_id:string)=>IUser|undefined;
}

export const useUser = create<IUseUser>((set,get)=>({
    users:[],
    addUser:(user) => set((state)=>({
        users:[
            ...state.users,
            user
        ]
    })),
    addUsers:(users) => set((state)=>({
        users:[
            ...state.users,
            ...users
        ]
    })),
    fetchUsersByIds: async(ids)=>{
        const otherUsers = get().users.map(user => user.id);
        const filteredIds = ids.filter(id => !otherUsers.includes(id));
        if(filteredIds.length === 0){
            return;
        }
        const {data,error} = await supabase
            .from("user")
            .select("*")
            .in("id",filteredIds);
        if(error) throw error;
        const usersWithFiles = await get().getUsersWithAvatar(data);
        get().addUsers(usersWithFiles);
    },
    fetchUser: async(getUserType,value)=>{
        switch(getUserType){
            case IGetUserType.byId:{
                const match = get().users.filter(user=>user.id===value);
                if(match.length>0){
                    return match[0];
                }
                const user:IUser = await get().fetchUsersById(value);
                get().addUser(user);
                return user;
            }
            case IGetUserType.byLogin:{
                const match = get().users.filter(user=>user.login===value);
                if(match.length>0){
                    return match[0];
                }
                const user:IUser = await get().fetchUsersByLogin(value);
                get().addUser(user);
                return user;
            }
            default:{
                return null;
            }
        }
    },
    getUsersWithAvatar: async(users)=>{
        const usersWithFiles:IUser[] = await Promise.all(
            users.map(async(user)=>{
                const avatar = await getdb(user.avatar_file_path);
                if(avatar!=null){
                    return {
                        ...user,
                        avatar_file:avatar
                    }
                }
                try {
                    const {data:image,error} = await supabase.storage
                        .from("avatar_images")
                        .download(user.avatar_file_path)
                    if(error) throw error;
                    const dataURL:string = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.readAsDataURL(image);
                    });
                    await setdb(user.avatar_file_path,dataURL);
                    return {
                        ...user,
                        avatar_file:dataURL
                    }
                } catch (error) {
                    console.log("userImagesFetchError:"+error)
                }
            })
        ) as IUser[];
        return usersWithFiles;
    },
    fetchUsersByLogin: async(login)=>{
        const {data,error}= await supabase
            .from("user")
            .select("*")
            .eq("login",login)
        if(error) throw error;
        const userArr = await get().getUsersWithAvatar(data);
        return userArr[0];
    },
    fetchUsersById: async(id)=>{
        const {data,error}= await supabase
            .from("user")
            .select("*")
            .eq("id",id)
        if(error) throw error;
        const userArr = await get().getUsersWithAvatar(data);
        return userArr[0];
    },
    getUserById: (user_id) =>{
        const curUser = get().users.find(user => user.id === user_id);
        return curUser;
    }
}))