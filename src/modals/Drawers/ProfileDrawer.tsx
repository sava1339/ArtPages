import { Link, useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import { useAuthUser } from "../../store/authUser";

interface IProfileDrawer{
    drawerSwitch:()=>void
}

function ProfileDrawer({drawerSwitch}:IProfileDrawer) {
    const navigate = useNavigate();
    const {signOut} = useAuthUser();
    const signOutHandler = async() =>{
        await signOut();
        navigate(0)
    }
    return ( 
        <Drawer gap="none">
            <Link onClick={drawerSwitch} to="/user/Cutieguy" className="px-3 py-4 flex gap-2 items-center cursor-pointer select-none active:bg-mainselect">
                <div className="rounded-[50%] w-8 h-8 bg-white">
                    <img className="rounded-[50%]" src="/avatar.jpg" alt="" />
                </div>
                <div className="flex flex-col">
                    <p>View Profile</p>
                    <p className="text-[9px] text-secondary">UserName</p>
                </div>
            </Link>
            <div className="px-3 py-4 flex gap-2 items-center cursor-pointer select-none active:bg-mainselect">
                <div className="w-8 h-8 flex justify-center items-center">
                    <img className="h-5" src="/edit.svg" alt="" />
                </div>
                <p>Изменить профиль</p>
            </div>
            <div onClick={signOutHandler} className="px-3 py-4 flex gap-2 items-center cursor-pointer select-none active:bg-mainselect">
                <div className="w-8 h-8 flex justify-center items-center">
                    <img className="h-5" src="/exit.svg" alt="" />
                </div>
                <p>Выйти</p>
            </div>
            <div className="px-3 py-4 flex gap-2 items-center cursor-pointer select-none active:bg-mainselect">
                <div className="w-8 h-8 flex justify-center items-center">
                    <img className="h-5" src="/settingsalt.svg" alt="" />
                </div>
                <p>Настройки</p>
            </div>
        </Drawer>
     );
}

export default ProfileDrawer;