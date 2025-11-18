import {useState} from 'react';
import "../styles/innershadow.css";
import type { IPost } from '../interfaces/IPost';
import TopScrollPost from './TopScrollPost';

interface ITopScroll{
    posts:IPost[]
}

function TopScroll({posts}:ITopScroll) {
    const [topScroll,setTopScroll] = useState(0);
    return ( 
        <div className="relative  my-4 w-[1048px] text-regular">
            {(topScroll/18)*-1 < (posts.length-4) ? 
                <div 
                    onClick={()=>setTopScroll(topScroll-18)} 
                    className="absolute flex justify-center items-center -right-4 w-8 h-8 absolute-center-y rounded-[50%] opacity-50 cursor-pointer bg-main z-10">
                        <img className='h-5 scale-[-1]' src="/next.svg" alt="" />
                </div> 
                : 
                null
            }
            {topScroll != 0 ? 
                <div 
                    onClick={()=>setTopScroll(topScroll+18)} 
                    className="absolute flex justify-center items-center -left-4 w-8 h-8 absolute-center-y rounded-[50%] opacity-50 cursor-pointer bg-main z-10">
                        <img className='h-5' src="/next.svg" alt="" />
                </div> 
                : 
                null
            }
            <div className=" overflow-x-hidden">
                <div style={{transform:`translateX(${topScroll}rem)`}} className="flex gap-4 transition-transform">
                    {posts.map((post)=>(
                        <TopScrollPost key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
     );
}

export default TopScroll;