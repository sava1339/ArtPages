import Button from "../modals/Buttons/Button";
import TextButton from "../modals/Buttons/TextButton";
import Input from "../modals/Input";
import Textarea from "../modals/Textarea";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";

function CreateCommunity() {
    const navigate = useNavigate();
    return ( 
        <Layout>
            <div className="flex flex-col h-full w-[600px] text-regular">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-[24px]">Создание сообщества</p>
                    <Button action={()=>navigate(-1)} imgSize="sm" img="/close.svg" />
                </div>
                <p className="text-secondary">Название и описание сообщества поможет пользователям узнать о чём ваще сообщество</p>
                <div className="mt-4 flex-1">
                    <Input maxSymbols={24} placeholder="Название сообщества" label="Название сообщества" />
                    <Textarea maxSymbols={500} placeholder="Описание сообщества" className="h-[200px]" label="Описание сообщества" />
                </div>
                <div className="flex gap-4 justify-end mb-4">
                    <TextButton action={()=>navigate(-1)} className="bg-main hover:bg-mainselect text-[14px]">Отмена</TextButton>
                    <TextButton className="bg-button hover:bg-action text-[14px]">Создать</TextButton>
                </div>
            </div>
        </Layout>
     );
}

export default CreateCommunity;