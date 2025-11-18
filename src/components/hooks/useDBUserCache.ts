import { getUsersById, getUsersByLogin } from "../../Controllers/userController";
import { IGetUserType } from "../../interfaces/IGetUserType";
import type { IUser } from "../../interfaces/IUser";
import { useUser } from "../../store/users"

export const useDBUserCache = ()=>{
    const {users,addUser} = useUser((state)=>state);

    const getUser = async(getUserType:IGetUserType,value:string):Promise<IUser|null>=>{
        switch(getUserType){
            case IGetUserType.byId:{
                const match = users.filter(user=>user.id===value);
                if(match.length>0){
                    return match[0];
                }
                const user:IUser = await getUsersById(value);
                addUser(user);
                return user;
            }
            case IGetUserType.byLogin:{
                const match = users.filter(user=>user.login===value);
                if(match.length>0){
                    return match[0];
                }
                const user:IUser = await getUsersByLogin(value);
                addUser(user);
                return user;
            }
            default:{
                return null;
            }
        }
    }
    return{
        getUser
    }
}