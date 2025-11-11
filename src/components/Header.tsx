import Button from '../modals/Buttons/Button';
import ProfileDrawer from '../modals/Drawers/ProfileDrawer';
import Search from '../modals/Search';
import { useContextMenu } from './hooks/useContextMenu';
import Avatar from '../modals/Avatar';

interface IHeader{
    ChatOpen:()=>void
}

function Header({ChatOpen}:IHeader) {
    const contextMenu = useContextMenu();
    const notificationCount = 12;
    const messagesCount = 6;
    return ( 
        <header className="w-[-webkit-fill-available] fixed py-2 px-4 border-b border-secondary bg-main z-40">
            <div className="flex justify-between items-center">
                <div className="flex gap-6 text-regular items-center">
                    <img className="cursor-pointer" src="/vite.svg" alt="" />
                </div>
                <Search/>
                <div className="relative flex gap-2  text-regular items-center">
                    <Button imgSize='xs2' img="/Chat.svg" action={ChatOpen}>
                        <div className="bg-red-500 absolute top-0 right-0 w-[18px] h-[18px] font-bold rounded-[50%] flex justify-center items-center">
                            <p className="text-[9px]">{messagesCount >= 99 ? "99+" : messagesCount}</p>
                        </div>
                    </Button>
                    <Button imgSize='xs2' img="/notification.svg" >
                        <div className="bg-red-500 absolute top-0 right-0 w-[18px] h-[18px] font-bold rounded-[50%] flex justify-center items-center">
                            <p className="text-[9px]">{notificationCount >= 99 ? "99+" : notificationCount}</p>
                        </div>
                    </Button>
                    <div ref={contextMenu.ref} className='relative'>
                        <div onClick={contextMenu.switchOpen} className='cursor-pointer'>
                            <Avatar avatar="/avatar.jpg" size="md" />
                        </div>
                        {contextMenu.isOpen && <ProfileDrawer drawerSwitch={contextMenu.switchOpen} />}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;