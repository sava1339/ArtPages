import supabase from '../supabaseClient';
import type { IUser } from '../interfaces/IUser';

export const getUsersWithAvatar = async(users:IUser[])=>{
    const usersWithFiles:IUser[] = await Promise.all(
        users.map(async(user)=>{
            if(localStorage.getItem(user.avatar_file_path)!=null){
                return {
                    ...user,
                    avatar_file:localStorage.getItem(user.avatar_file_path)
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
                localStorage.setItem(user.avatar_file_path,dataURL);
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
}

export const getUsersByLogin = async(login:string):Promise<IUser>=>{
    const {data,error}= await supabase
        .from("user")
        .select("*")
        .eq("login",login)
    if(error) throw error;
    const userArr = await getUsersWithAvatar(data);
    return userArr[0];
}

export const getUsersById = async(id:string):Promise<IUser>=>{
    const {data,error}= await supabase
        .from("user")
        .select("*")
        .eq("id",id)
    if(error) throw error;
    const userArr = await getUsersWithAvatar(data);
    return userArr[0];
}


