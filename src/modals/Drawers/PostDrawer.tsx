import { useNavigate } from "react-router-dom";
import { usePostBlackList } from "../../store/postBlackList";
import { usePosts } from "../../store/posts";
import Drawer from "./Drawer";
import { useAuthUser } from "../../store/authUser";
import type { IPost } from "../../interfaces/IPost";

interface IPostDrawer{
    id:string,
}

function PostDrawer({id}:IPostDrawer) {
    const navigate = useNavigate();
    const {addPostInBL} = usePostBlackList((state)=>state);
    const {deleteById} = usePosts((state)=>state);
    const {posts} = usePosts();
    const curPost:IPost = posts.filter(post => post.id === id)[0];
    const {isAuth,userData} = useAuthUser();
    const isAdmin = userData?.id === curPost.user_id;
    const reportPost = ()=>{
        alert("Жалоба успешно отправлена!");
        addPostInBL(id);
    }
    const hidePost = ()=>{
        addPostInBL(id);
    }
    const deletePost = async()=>{
        await deleteById(id);
        navigate(0);
    }
    return ( 
        <Drawer className="text-secondary">
            <div className="group cursor-pointer flex gap-2 items-center px-6">
                <img className="h-4 pl-0.5" src="/notification.svg" alt="" />
                <p className="group-hover:text-regular">Подписаться на посты</p>
            </div>
            <div onClick={hidePost} className="group cursor-pointer flex gap-2 items-center px-6">
                <img className="h-4" src="/hide.svg" alt="" />
                <p className="group-hover:text-regular">Показывать меньше таких постов</p>
            </div>
            <div onClick={hidePost} className="group cursor-pointer flex gap-2 items-center px-6">
                <img className="h-4" src="/hide.svg" alt="" />
                <p className="group-hover:text-regular">Скрыть</p>
            </div>
            {isAdmin && <div className="group cursor-pointer flex gap-2 items-center px-6">
                <img className="h-4" src="/edit.svg" alt="" />
                <p className="group-hover:text-regular">Редактировать</p>
            </div>}
            {isAdmin && <div onClick={deletePost} className="group cursor-pointer flex gap-2 items-center px-6">
                <img className="h-4" src="/delete.svg" alt="" />
                <p className="group-hover:text-regular">Удалить</p>
            </div>}
            <div onClick={reportPost} className="group cursor-pointer flex gap-2 items-center px-6">
                <img className="h-4" src="/report.svg" alt="" />
                <p className="group-hover:text-regular">Пожаловаться</p>
            </div>
        </Drawer>
     );
}

export default PostDrawer;