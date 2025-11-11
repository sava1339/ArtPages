import {useEffect, useState} from 'react';
import "../styles/votes.css";
import { useVotePost } from '../store/votePost.ts';

interface IVoteSelector{
    initialVotes:number,
    id:number,
    view?:boolean
}

function VoteSelector({
    initialVotes, 
    id,
    view
}:IVoteSelector) {
    const [vote,setVote] = useState(0);
    const {votePosts,upvote,downvote,removeVote} = useVotePost((state)=>state);
    const postVoteArr = votePosts.filter(post => post.postId === id);
    const postVote:number = postVoteArr.length > 0 ? postVoteArr[0].vote : 0;

    useEffect(()=>{
        setVote(postVote);
    },[votePosts])
    
    const Vote = (element:React.ChangeEvent<HTMLInputElement>) =>{
        const value = element.target.value;
        if(value == "1"){
            upvote(id);
        }else{
            downvote(id);
        }
    }
    const DoubleVote = (element:React.MouseEvent<HTMLInputElement>)=>{
        if(element.target instanceof HTMLInputElement && +element.target.value === postVote){
            element.target.checked = false;
            setVote(0);
            removeVote(id);
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
                    checked={postVote==1} 
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
            <p className="text-[12px] font-bold">{initialVotes+vote}</p>
            
            <label className="group relative button-vote w-6 h-6 rounded-[50%] cursor-pointer flex justify-center">
                <input 
                    checked={postVote==-1} 
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