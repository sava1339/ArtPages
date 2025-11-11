import Avatar from "../modals/Avatar";
import SidebarButton from "../modals/Buttons/SidebarButton";
import { useCommunityes } from "../store/communityes";

interface IRecentCommunity{
    id:number
}

function RecentCommunity({id}:IRecentCommunity) {
    const {communityes} = useCommunityes((state)=>state);
    const curCommunity = communityes.filter(community => community.id === id)[0];
    return ( 
        <SidebarButton route={`/community/${curCommunity.title}`}>
            <Avatar avatar={curCommunity.img} size="md"/>
            <p className='text-ellipsis line-clamp-1'>{curCommunity.title}</p>
        </SidebarButton>
     );
}

export default RecentCommunity;