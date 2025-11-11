import Aside from "./Aside";
import { useRecentPosts } from '../../store/recentPosts';
import RecentPost from '../RecentPost';
import type { IUseRecentPosts } from "../../store/recentPosts";
import type { IRecentPost } from "../../interfaces/IRecentPost";

function SocialAside() {
    const {recentPosts,cleanRecent} = useRecentPosts((state:IUseRecentPosts)=>state);
    return ( 
        <Aside>
            <div className="flex justify-between px-3 items-center">
                <p className="text-secondary text-[12px]">ПОСЛЕДНИЕ ПОСТЫ</p>
                <p onClick={cleanRecent} className="text-action cursor-pointer text-[12px]">Очистить</p>
            </div>
            <div className="mt-4">
                {recentPosts.length > 0 ? recentPosts.map((post:IRecentPost)=>(
                    <div key={post.id} className=" border-secondary py-2 not-last:border-b">
                        <RecentPost data={post} />
                    </div>
                ))
                :
                <p className='text-center text-secondary py-8'>Кажется здесь пока ничего нет!</p>
                }
            </div>
        </Aside>
     );
}

export default SocialAside;