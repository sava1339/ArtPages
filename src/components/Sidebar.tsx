import {clsx} from 'clsx'
import SidebarButton from '../modals/Buttons/SidebarButton';
import CommunityButton from '../modals/Buttons/CommunityButton';
import { useSubCommunityes } from '../store/subCommunityes';
import { useRecentCommunity } from '../store/recentCommunity';
import RecentCommunity from './RecentCommunity';
import { useIsSidebarExpand } from '../store/isSidebarExpand';


function Sidebar() {
    const {subCommunity} = useSubCommunityes((state)=> state);
    const {recentCommunity} = useRecentCommunity((state)=>state);
    const {isSidebarExpand,toggleSidebar} = useIsSidebarExpand((state)=>state);
    const sortedCommunities = [...subCommunity].sort((a, b) => 
        Number(b.isFav) - Number(a.isFav)
    );
    return ( 
        <div
            className={clsx(
                "border-r border-secondary bg-main z-10 top-12 left-0 px-6 pt-6 w-[280px] fixed h-[calc(100vh-48px)] transition-transform",
                {
                    "-translate-x-70":!isSidebarExpand
                }
            )}
        >
            <div onClick={toggleSidebar} className="absolute flex justify-center items-center w-8 h-8 border border-secondary -right-4 bg-main rounded-[50%] cursor-pointer hover:border-regular">
                <img className='w-4' src="/sidebar.svg" alt="" />
            </div>
            <nav className="flex flex-col text-regular px-2">
                <SidebarButton route="/home">
                    Главная
                </SidebarButton>
                <SidebarButton route="/popular">
                    Популярное
                </SidebarButton>
                <div className="w-full border-t border-secondary my-4"/>
                {recentCommunity.length > 0 && <details open className='group cursor-pointer select-none'>
                    <summary className='text-[14px] flex gap-2 items-center  px-4 py-2 rounded justify-between text-secondary list-none hover:bg-mainselect'>
                        <p>НЕДАВНЕЕ</p>
                        <img className='h-4 transition-transform group-open:rotate-180' src="/minimize.svg" alt="" />
                    </summary>
                    <ul>
                        {recentCommunity.map((recent:number)=>(
                            <RecentCommunity key={recent} id={recent} />
                        ))}
                    </ul>
                </details>}
                <details open className='group cursor-pointer select-none'>
                    <summary className='text-[14px] flex gap-2 items-center  px-4 py-2 rounded justify-between text-secondary list-none hover:bg-mainselect'>
                        <p>СООБЩЕСТВА</p>
                        <img className='h-4 transition-transform group-open:rotate-180' src="/minimize.svg" alt="" />
                    </summary>
                    <ul>
                        <SidebarButton route='/createcommunity'>
                            <img className='h-6' src="/new.svg" alt="" />
                            <p>Создать сообщество</p>
                        </SidebarButton>
                        <SidebarButton route='#'>
                            <img className='h-6' src="/settingsalt.svg" alt="" />
                            <p>Менеджер сообществ</p>
                        </SidebarButton>
                        {sortedCommunities.map((community)=>(
                            <CommunityButton data={community} key={community.id} />
                        ))}
                    </ul>
                </details>
            </nav>
        </div>
     );
}

export default Sidebar;