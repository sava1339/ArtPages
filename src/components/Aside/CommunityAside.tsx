import Aside from "./Aside";

function CommunityAside() {
    return ( 
        <Aside>
            <div className="flex flex-col gap-1 px-4">
                <p className="text-[18px] font-bold">CommunityName</p>
                <p className="text-[12px] font-bold">
                    Здесь какой то рандомный текст сообщества да да очень интересно
                </p>
                <p className="text-[12px] text-secondary">
                    Здесь какой то рандомный текст сообщества, но этого текста должно быть больше, ну прям очень много, чтобы текст ушел вниз и его было прям правда много ну нас трочки так 3 а ещё я сегодня работал вкусно поел и всё хорошо у меня в жизни
                </p>
                <div className="flex gap-1 items-center my-2">
                    <img className="h-4" src="/new.svg" alt="" />
                    <p className="text-[12px] text-secondary">Cоздано: 2 дек 2025г</p>
                </div>
                <div className="grid grid-cols-2 gap-y-6 my-2">
                    <div className="flex flex-col">
                        <p className="text-[14px] font-semibold">213</p>
                        <p className="text-secondary text-[12px]">Участников</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <p className="text-[14px] font-semibold">46</p>
                            <div className="h-1.5 w-1.5 bg-green-500 rounded-[999px] " />
                        </div>
                        <p className="text-secondary text-[12px]">Онлайн</p>
                    </div>
                </div>
            </div>
        </Aside>
     );
}

export default CommunityAside;