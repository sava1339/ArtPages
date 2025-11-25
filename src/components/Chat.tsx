import { useEffect, useState } from "react";
import {clsx} from 'clsx';
import Button from '../modals/Buttons/Button';
import { useContextMenu } from "./hooks/useContextMenu";
import ChatDrawer from "../modals/Drawers/ChatDrawer";
import MessageField from "../modals/MessageField";
import Avatar from "../modals/Avatar";
import { useMessages } from "../store/messages";
import ChatMessage from "./ChatMessage";
import ChatGroup from "./ChatGroup";
import { useChatRooms } from "../store/chatRooms";

interface IChatEl{
    ChatOpen:()=>void
}

function Chat({ChatOpen}:IChatEl) {
    const [isMinimize,setIsMinimize] = useState(false);
    const {messages} = useMessages();
    const {chatRooms} = useChatRooms();
    const contextMenu = useContextMenu();
    const messagesCount = 99;
    return ( 
        <div 
        className={
            clsx("bg-main border-l border-r border-t border-secondary rounded-t-2xl fixed right-10 bottom-0 text-regular z-30",
                {
                    "w-[200px]":isMinimize,
                    "w-[700px] h-[500px]":!isMinimize
                }
            )
            }>
            {!isMinimize ?
                <div className="flex h-full">
                    <div className="w-[300px] border-r border-secondary pt-4">
                        <div className="flex items-center justify-between px-4 mb-4">
                            <div className="flex gap-4">
                                <img className="h-8" src="/vite.svg" alt="" />
                                <p className="text-[21px] font-bold">Чаты</p>
                            </div>
                            <div className="flex gap-1">
                                <Button imgSize="xs2" img="check.svg"/>
                                <Button imgSize="xs2" img="newchat.svg" />
                                <div className="relative">
                                    <div ref={contextMenu.ref}>
                                        {contextMenu.isOpen && <ChatDrawer/>}
                                        <Button action={contextMenu.switchOpen} roundOff={true} className="flex gap-2 w-fit items-center rounded-2xl px-2">
                                            <img className="h-4" src="/settings.svg" alt="" />
                                            <img className="h-4" src="/minimize.svg" alt="" />
                                        </Button>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center px-4 py-3 hover:bg-mainselect cursor-pointer">
                                <div className="flex gap-2">
                                    <img className="w-6" src="/reply.svg" alt="" />
                                    <p className="text-[18px]">Ответы</p>
                                </div>
                                <img className="w-3 scale-[-1]" src="/next.svg" alt="" />
                            </div>
                            <div>
                                {chatRooms.map(room => (
                                    <ChatGroup room={room} key={room.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 pt-4">
                        <div className="flex justify-between border-b border-secondary pl-3 pr-6 pb-2">
                            <div className="flex gap-2 items-center">
                                <Avatar avatar="/avatar.jpg" size="md" />
                                <p className="text-[16px] font-bold text-secondary">Username</p>
                            </div>
                            <div className="flex gap-1 items-center">
                                <Button imgSize="xs1" img="/settingsalt.svg" />
                                <Button imgSize="xs2" action={()=>setIsMinimize(true)} img="/minimize.svg" />
                                <Button imgSize="xs" action={ChatOpen} img="/close.svg" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            {
                                messages.map(message=>(
                                    <ChatMessage key={message.id} message={message} />
                                ))
                            }
                        </div>
                        <div className="px-2 py-2">
                            <MessageField textareaPlaceholder="Сообщение" selected noresize />
                        </div>
                    </div>
                </div>
            :
            <div onClick={()=>setIsMinimize(false)} className="px-4 py-2 flex justify-between cursor-pointer">
                <div className=" flex items-center gap-2">
                    <p className="text-[21px] font-bold">Чаты</p>
                    <div className="bg-red-500 w-7 h-7 font-bold rounded-[50%] flex justify-center items-center">
                        <p className="text-[12px]">{messagesCount >= 99 ? "99+" : messagesCount}</p>
                    </div>
                </div>
                <Button action={ChatOpen} img="/close.svg" />
            </div>
            }
        </div>
     );
}

export default Chat;