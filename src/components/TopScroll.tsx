import {useState} from 'react';
import "../styles/innershadow.css";
import type { IPost } from '../interfaces/IPost';

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
                        <div className="relative cursor-pointer" key={post.id}>
                            <div className="absolute bottom-0 p-2 z-1">
                                <h2 className="text-[18px] font-bold text-ellipsis line-clamp-1">Новый супер крутой мега пост!</h2>
                                <p className=" text-ellipsis line-clamp-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam molestiae voluptas nesciunt possimus nemo architecto voluptatum amet corrupti voluptates officia quasi fuga doloremque maxime, ab sit accusantium suscipit labore vel.</p>
                                <div className="flex items-center gap-1">
                                    <img className="h-6" src="/vite.svg" alt="" />
                                    <p className="text-[12px]">PublicName</p>
                                    <p className="text-secondary text-[12px]">and more</p>
                                </div>
                            </div>
                            <div className="inner-shadow absolute top-0 left-0 w-full h-full rounded-xl"></div>
                            <div 
                            className="w-64 h-48 bg-cover bg-center rounded-xl" 
                            style={{backgroundImage:`url(${post.img})`}} 
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}

export default TopScroll;