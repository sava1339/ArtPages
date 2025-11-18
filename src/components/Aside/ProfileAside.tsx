import TextButton from "../../modals/Buttons/TextButton";
import Aside from "./Aside";

interface IProfileAside{
    nickname:string,
    bio:string,
    created_at:string
}

function ProfileAside({nickname,bio}:IProfileAside) {
    return ( 
        <Aside>
            <div className="flex flex-col gap-3 px-4">
                <p className="text-[18px] font-bold">{nickname}</p>
                <div className="flex gap-2 flex-wrap">
                    <TextButton className="bg-main hover:bg-mainselect flex gap-2 px-4 py-2 w-fit">
                        <img className="h-4" src="/share.svg" alt="" />
                        <p>Поделится</p>
                    </TextButton>
                    <TextButton className="bg-button hover:bg-action flex gap-2 px-4 py-2 w-fit">
                        <img className="h-4" src="/new.svg" alt="" />
                        <p>Подписаться</p>
                    </TextButton>
                    <TextButton className="bg-main hover:bg-mainselect flex gap-2 px-4 py-2 w-fit">
                        <img className="h-4" src="/Chat.svg" alt="" />
                        <p>Сообщение</p>
                    </TextButton>
                </div>
                <p className="text-[14px] text-secondary font-semibold">13 followers</p>
                <p className="text-[12px] text-secondary">{bio}</p>
                <div className="grid grid-cols-2 gap-y-6 my-2">
                    <div className="flex flex-col">
                        <p className="text-[14px] font-semibold">2000</p>
                        <p className="text-secondary text-[12px]">Очки</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[14px] font-semibold">13</p>
                        <p className="text-secondary text-[12px]">Вклад</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[14px] font-semibold">1г</p>
                        <p className="text-secondary text-[12px]">Возраст аккаунта</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[14px] font-semibold">Сообщества</p>
                        <p className="text-secondary text-[12px]">Активность в &gt;</p>
                    </div>
                </div>
                <p className="text-[14px] text-secondary">ССЫЛКИ</p>
                <div className="flex gap-2">
                    <TextButton className="bg-mainselect flex gap-2 items-center">
                        <img className="h-3" src="/link.svg" alt="" />
                        Twitter
                    </TextButton>
                    <TextButton className="bg-mainselect flex gap-2 items-center">
                        <img className="h-3" src="/link.svg" alt="" />
                        VK
                    </TextButton>
                    <TextButton className="bg-mainselect flex gap-2 items-center">
                        <img className="h-3" src="/link.svg" alt="" />
                        Instagram
                    </TextButton>
                </div>
            </div>
        </Aside>
     );
}

export default ProfileAside;