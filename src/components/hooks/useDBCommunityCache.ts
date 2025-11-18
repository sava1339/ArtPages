import { useCommunityes } from "../../store/communityes";
import { useRecentCommunity } from "../../store/recentCommunity";
import type { ICommunity } from "../../interfaces/ICommunity";
import { getCommunityById, getCommunityByTitle } from "../../Controllers/communityController";
import { IGetCommunityType } from "../../interfaces/IGetCommunityType";

export const useDBCommunityCache = () =>{
    const {addRecentCommunity} = useRecentCommunity((state)=>state);
    const {communityes,addCommunityes} = useCommunityes((state)=>state);

    const getCommunity = async(getCommunityType:IGetCommunityType,value:string):Promise<ICommunity|null> =>{
        switch(getCommunityType){
            case IGetCommunityType.byTitle:{
                const match = communityes.filter(community => community.title === value);
                if(match.length > 0){
                    addRecentCommunity(match[0].id);
                    return match[0];
                }
                const community:ICommunity = await getCommunityByTitle(value);
                addCommunityes([community]);
                addRecentCommunity(community.id);
                return community;
            }
            case IGetCommunityType.byId:{
                const match = communityes.filter(community => community.id === value);
                if(match.length > 0){
                    addRecentCommunity(match[0].id);
                    return match[0];
                }
                const community:ICommunity = await getCommunityById(value);
                addCommunityes([community]);
                addRecentCommunity(community.id);
                return community;
            }
            default:{
                return null;
            }
        }
    }
    return{
        getCommunity
    }
}