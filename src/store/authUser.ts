import { create } from "zustand";
import type { IUser } from "../interfaces/IUser";
import type { Session } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import supabase from "../supabaseClient";
import { v4 } from "uuid";
import { useUser } from "./users";

interface IUseAuthUser{
    isAuth:boolean,
    userData:IUser|null,
    session:Session|null,
    signUp:(email:string,nickname:string,login:string,password:string,bio:string,avatar:File)=>Promise<void>,
    signIn:(email:string,password:string)=>Promise<void>,
    signOut:()=>Promise<void>,
    auth:()=>Promise<void>,
    generateJWT:(password:string)=>Promise<string>,
}

export const useAuthUser = create<IUseAuthUser>((set,get)=>({
    isAuth:false,
    userData:null,
    session:null,

    signUp: async(email,nickname,login,password,bio,avatar)=>{
        const hashPassword = await get().generateJWT(password);
        const filename = v4()+".jpg";
        const {data:signup,error:signupError} = await supabase.auth.signUp({
            email:email,
            password:password
        })
        if(signupError) throw signupError;
        const { error:uploadError } = await supabase.storage
            .from('avatar_images')
            .upload(filename, avatar);
        if (uploadError){
            throw uploadError;
        };
        const {error} = await supabase
            .from("user")
            .insert(
            {
                id:signup.user?.id,
                email:email,
                nickname:nickname,
                login:login,
                password:hashPassword,
                bio:bio,
                avatar_file_path:filename,
            }
        );
        if(error) throw error;
    },
    signOut:async()=>{
        await supabase.auth.signOut();
        set({
            userData:null,
            isAuth:false,
            session:null
        })
    },
    auth:async()=>{
        const {data:authData,error:authError} = await supabase.auth
            .getSession();
        if(authError || !authData.session) return;
        const {data:userData,error:userError} = await supabase
            .from("user")
            .select("*")
            .eq("id",authData.session?.user.id)
            .single();
        if(userError) throw userError
        const userDataWithAvatar = await useUser.getState().getUsersWithAvatar([userData]);
        set({
            userData:userDataWithAvatar[0],
            isAuth:true,
            session:authData.session
        })
        return;
    },
    generateJWT:  async(password)=>{
        const hashPassword:string = await bcrypt.hash(password,12);
        return hashPassword;
    },
    signIn: async(email:string,password:string)=>{
        const {data:user,error:userError} = await supabase
            .from("user")
            .select("*")
            .eq("email",email)
            .single();
        if(userError) throw userError;
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) throw new Error("Пароль не верный");
        const {data:authData,error:authError} = await supabase.auth.signInWithPassword({
            email:email,
            password:password
        })
        if(authError) throw authError;
        set({
            userData:user,
            isAuth:true,
            session:authData.session
        })
    }
}))