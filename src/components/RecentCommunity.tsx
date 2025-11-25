import Avatar from "../modals/Avatar";
import SidebarButton from "../modals/Buttons/SidebarButton";
import { useCommunityes } from "../store/communityes";

interface IRecentCommunity{
    id:string
}

function RecentCommunity({id}:IRecentCommunity) {
    const {getCommunityById} = useCommunityes((state)=>state);
    const curCommunity = getCommunityById(id);
    return ( 
        <>
            {curCommunity && <SidebarButton route={`/community/${curCommunity?.title}`}>
                <Avatar avatar={curCommunity?.avatar_file} size="md"/>
                <p className='text-ellipsis line-clamp-1'>{curCommunity?.title}</p>
            </SidebarButton>}
        </>
     );
}

export default RecentCommunity;