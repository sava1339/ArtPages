import Button from "../modals/Buttons/Button";
import TextButton from "../modals/Buttons/TextButton";
import Input from "../modals/Input";
import Textarea from "../modals/Textarea";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import FileSelector from "../modals/FileSelector";
import { useState } from "react";
import { useCommunityes } from "../store/communityes";
import { useAuthUser } from "../store/authUser";
import { AUTH } from "../utils/consts";

function CreateCommunity() {
    const navigate = useNavigate();
    const [desc,setDesc] = useState<string>("");
    const [title,setTitle] = useState<string>("");
    const [avatar,setAvatar] = useState<File>();
    const {createCommunity} = useCommunityes();
    const {isAuth} = useAuthUser();
    const createCommunityHandler = async() =>{
        const titleFix = title.trim().replace(/\s/g, '_');
        if(!isAuth){
            alert("Вы не зарегистрированы");
            navigate(AUTH);
            return;
        }
        if(titleFix.length < 4){
            alert("Название сообщества слишком мало");
            return;
        }
        if(avatar==undefined){
            alert("Не выбрана аватарка сообщества");
            return;
        }
        await createCommunity(titleFix,desc,avatar);
        navigate("/community/"+title)
    }
    const onDescChangeHandler = (context:string) =>{
        setDesc(context);
    }
    const onAvatarChangeHandler = (file:File) =>{
        setAvatar(file);
    }
    const onTitleChangeHandler = (context:string) =>{
        setTitle(context);
    }
    return ( 
        <Layout>
            <div className="flex flex-col h-full w-[600px] text-regular">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-[24px]">Создание сообщества</p>
                    <Button action={()=>navigate(-1)} imgSize="sm" img="/close.svg" />
                </div>
                <p className="text-secondary">Название и описание сообщества поможет пользователям узнать о чём ваще сообщество</p>
                <div className="my-4 flex-1">
                    <Input 
                        onValueChange={onTitleChangeHandler} 
                        maxSymbols={24} 
                        placeholder="Название сообщества" 
                        isRequired
                        label="Название сообщества" 
                        englishOnly
                    />
                    <Textarea onValueChange={onDescChangeHandler} maxSymbols={500} placeholder="Описание сообщества" className="h-[200px]" label="Описание сообщества" />
                    <FileSelector onFileChange={onAvatarChangeHandler} label="Аватарка сообщества" />
                </div>
                <div className="flex gap-4 justify-end mb-4">
                    <TextButton action={()=>navigate(-1)} className="bg-main hover:bg-mainselect text-[14px]">Отмена</TextButton>
                    <TextButton action={createCommunityHandler} className="bg-button hover:bg-action text-[14px]">Создать</TextButton>
                </div>
            </div>
        </Layout>
     );
}

export default CreateCommunity;