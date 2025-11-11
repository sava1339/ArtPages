import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import Button from "../modals/Buttons/Button";
import TextButton from "../modals/Buttons/TextButton";
import Input from "../modals/Input";
import Textarea from "../modals/Textarea";
import clsx from "clsx";
import { useEffect } from "react";
import FileSelector from "../modals/FileSelector";
import { useCommunityes } from "../store/communityes";
import type { ICommunity } from "../interfaces/ICommunity";
import Avatar from "../modals/Avatar";

function CreatePost() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const {communityes} = useCommunityes();
    const curCommunity:ICommunity|undefined = communityes.filter(community=>community.title===location.pathname.split("/")[2])[0];
    const type = params.get("type");
    useEffect(()=>{
        if(!type){
            navigate(location.pathname+"?type=TEXT")
        }
        console.log(curCommunity)
    },[])
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
                    {curCommunity === undefined ? <TextButton className="bg-main hover:bg-mainselect flex gap-2 items-center w-fit">
                        <div className="h-6 w-6 bg-button rounded-[999px]" />
                        Выберите сообщество
                        <img className="h-4" src="/minimize.svg" alt="" />
                    </TextButton>
                    :
                    <TextButton className="bg-main hover:bg-mainselect flex gap-2 items-center w-fit">
                        <Avatar size="sm" avatar={curCommunity.img} />
                        {curCommunity.title}
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
                <div className="flex-1">
                    <Input maxSymbols={24} placeholder="Название поста" label="Название поста" />
                    {type==="TEXT" && <Textarea maxSymbols={500} placeholder="Описание поста" className="h-[200px]" label="Описание поста" />}
                    {type==="MEDIA" && <FileSelector/>}
                </div>
                <div className="flex gap-4 justify-end my-4">
                    <TextButton action={()=>navigate("/home")} className="bg-main hover:bg-mainselect text-[14px]">Отмена</TextButton>
                    <TextButton className="bg-button hover:bg-action text-[14px]">Готово</TextButton>
                </div>
            </div>
        </Layout>
    );
}

export default CreatePost;