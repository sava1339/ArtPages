import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import Button from "../modals/Buttons/Button";
import TextButton from "../modals/Buttons/TextButton";
import Input from "../modals/Input";
import Textarea from "../modals/Textarea";
import clsx from "clsx";
import { useEffect, useState } from "react";
import FileSelector from "../modals/FileSelector";
import type { ICommunity } from "../interfaces/ICommunity";
import Avatar from "../modals/Avatar";
import { IGetCommunityType } from "../interfaces/IGetCommunityType";
import { usePosts } from "../store/posts";
import { useAuthUser } from "../store/authUser";
import { useCommunityes } from "../store/communityes";

function CreatePost() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading,setIsLoading] = useState(true);
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [image,setImage] = useState<File>();
    const [com,setCom] = useState<ICommunity|null>(null);
    const {createPost} = usePosts();
    const {fetchCommunity} = useCommunityes();
    const {userData} = useAuthUser();
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    useEffect(()=>{
        const getData = async()=>{
            const community:ICommunity|null = await fetchCommunity(IGetCommunityType.byTitle,location.pathname.split('/')[2]);
            if(community === null) alert("Произошла ошибка");
            setCom(community);
            setIsLoading(false);
        }
        getData();
        if(!type){
            navigate(location.pathname+"?type=TEXT")
        }
    },[])
    const createPostHandler = async() =>{
        if(type==="MEDIA" && image==undefined || title.length < 4 || com == null || !userData){
            alert("Данные некоректны или не введены");
            return;
        }
        if(type === "MEDIA"){
            await createPost(title,desc,userData?.id,com.id,image);
            navigate("/community/"+com.title);
        }
        if(type === "TEXT"){
            await createPost(title,desc,userData?.id,com.id);
            navigate("/community/"+com.title);
        }
        navigate("/home");
    }
    return ( 
        <Layout>
            <div className="flex flex-col h-full w-[600px] text-regular">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-[24px]">Создание поста</p>
                    <Button action={()=>navigate("/home")} imgSize="sm" img="/close.svg" />
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <p className="text-[12px] font-semibold">
                        Выберите сообщество
                    </p>
                    {com === null || isLoading ? <TextButton className="bg-main hover:bg-mainselect flex gap-2 items-center w-fit">
                        <div className="h-6 w-6 bg-button rounded-[999px]" />
                        Выберите сообщество
                        <img className="h-4" src="/minimize.svg" alt="" />
                    </TextButton>
                    : <TextButton className="bg-main hover:bg-mainselect flex gap-2 items-center w-fit">
                        <Avatar size="sm" avatar={com.avatar_file || "/avatar.svg"} />
                        {com.title}
                        <img className="h-4" src="/minimize.svg" alt="" />
                    </TextButton>
                    }
                </div>
                <div className="flex gap-2 my-2">
                    <TextButton 
                        action={()=>navigate(location.pathname+"?type=TEXT")} 
                        className={clsx("bg-main hover:bg-mainselect text-[16px] px-4 border border-main",
                            {
                                "border-regular":type==="TEXT"
                            }
                        )}
                    >
                        Текст
                    </TextButton>
                    <TextButton 
                        action={()=>navigate(location.pathname+"?type=MEDIA")}
                        className={clsx("bg-main hover:bg-mainselect text-[16px] px-4 border border-main",
                            {
                                "border-regular":type==="MEDIA"
                            }
                        )}
                    >
                        Изображение/Видео
                    </TextButton>
                </div>
                <div className="flex-1 flex flex-col gap-3">
                    <Input 
                        onValueChange={(text)=>setTitle(text)} 
                        isRequired
                        maxSymbols={96} 
                        placeholder="Название поста" 
                        label="Название поста" 
                    />
                    {type==="MEDIA" && <FileSelector onFileChange={(file)=>setImage(file)} />}
                    <Textarea 
                        onValueChange={(text)=>setDesc(text)}
                        maxSymbols={500}
                        placeholder="Описание поста. Необязательно" 
                        className="h-[200px]" 
                        label="Описание поста" 
                    />
                </div>
                <div className="flex gap-4 justify-end my-4">
                    <TextButton action={()=>navigate("/home")} className="bg-main hover:bg-mainselect text-[14px]">Отмена</TextButton>
                    <TextButton action={createPostHandler} className="bg-button hover:bg-action text-[14px]">Готово</TextButton>
                </div>
            </div>
        </Layout>
    );
}

export default CreatePost;