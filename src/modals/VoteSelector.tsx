import "../styles/votes.css";
import { useVotePost } from '../store/votePost.ts';
import type { IVote } from '../interfaces/IVote.ts';
import { useAuthUser } from '../store/authUser.ts';
import { useNavigate } from "react-router-dom";
import { AUTH } from "../utils/consts.ts";

interface IVoteSelector{
    id:string,
    view?:boolean
}

function VoteSelector({
    id,
    view
}:IVoteSelector) {
    const {votePosts,vote} = useVotePost();
    const navigate = useNavigate();
    const {userData} = useAuthUser();
    const postVote:IVote|undefined = votePosts.filter(vote => vote.post_id === id && vote.user_id.toString() === userData?.id)[0];
    const curInitialVotes = 
        votePosts.filter((vote:IVote)=>vote.post_id===id && vote.user_id != userData?.id && vote.vote == true).length - 
        votePosts.filter((vote:IVote)=>vote.post_id===id && vote.user_id != userData?.id && vote.vote == false).length
    const Vote = (element:React.ChangeEvent<HTMLInputElement>) =>{
        if(!userData){
            navigate(AUTH);
            return;
        }
        const value = element.target.value;
        if(value == "1"){
            vote(id,userData?.id,true,postVote?.id);
        }else{
            vote(id,userData?.id,false,postVote?.id);
        }
    }
    const DoubleVote = (element:React.MouseEvent<HTMLInputElement>)=>{
        if(element.target instanceof HTMLInputElement && (element.target.value === "1" ? true : false) === postVote?.vote){
            if(!userData){
                navigate(AUTH);
                return;
            }
            element.target.checked = false;
            vote(id,userData?.id,null,postVote?.id);
        }
    }
    return ( 
    <div>
        <div 
            onClick={(e)=>e.stopPropagation()}
            className="vote-selector text-regular rounded-[20px] border-[0.5px] border-secondary flex gap-1 h-[26px] items-center"
        >
            <label className="group relative button-vote w-6 h-6 cursor-pointer flex justify-center">
                <input 
                    checked={postVote?.vote===true} 
                    onChange={(e)=>Vote(e)} 
                    onClick={(e:React.MouseEvent<HTMLInputElement>)=>DoubleVote(e)} 
                    className='vote_increase hidden' 
                    name={"count"+(view && "view")+id} 
                    value="1" 
                    type="radio" 
                />
                <span className="z-2">+</span>
                <div className="opacity-0 absolute w-full rounded-[50%] z-1 h-full top-0 left-0 bg-black group-hover:opacity-40"></div>
            </label>
            <p className="text-[12px] font-bold">{curInitialVotes+(postVote?.vote == null  ? 0 : postVote?.vote ? 1 : -1)}</p>
            
            <label className="group relative button-vote w-6 h-6 rounded-[50%] cursor-pointer flex justify-center">
                <input 
                    checked={postVote?.vote===false} 
                    onChange={(e)=>Vote(e)} 
                    onClick={(e)=>DoubleVote(e)} 
                    className='vote_decrease hidden' 
                    name={"count"+(view && "view")+id} 
                    value="-1" 
                    type="radio" 
                />
                <span className="z-2">-</span>
                <div className="opacity-0 absolute w-full rounded-[50%] z-1 h-full top-0 left-0 bg-black group-hover:opacity-40"></div>
            </label>
        </div>
    </div> 
    );
}

export default VoteSelector;