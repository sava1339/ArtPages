import type { ISavePost } from '../interfaces/ISavePosts';
import type { IUseSavePosts } from '../store/savePosts';
import { useSavePosts } from '../store/savePosts';
import '../styles/save.css';

interface ISaveButton{
    id:string
}

function SaveButton({id}:ISaveButton) {
    const {savePosts,savePost,unsavePost} = useSavePosts((state:IUseSavePosts)=>state);
    const savePostArr = savePosts.filter((post:ISavePost) => post.postId === id);
    const isSavePost = savePostArr.length > 0;

    const Save = () =>{
        if(isSavePost){
            unsavePost(id);
        }else{
            savePost(id);
        }
    }
    return ( 
        <div onClick={(e)=>e.stopPropagation()}>
            <label className="label-save text-regular">
                <input 
                    className="hidden save"
                    checked={isSavePost}
                    onChange={Save}
                    type="checkbox"
                />
                <div className="group button-save border-[0.5px] border-secondary rounded-[20px] h-[26px] px-2 flex justify-center items-center gap-2 cursor-pointer">
                    <svg 
                        className="stroke-regular fill-none h-4 stroke-2 
                        group-hover:stroke-selected group-hover:fill-selected" 
                        viewBox="0 0 29.6 39.25"
                    >
                        <path d="M15.2,25.05l10.95,12.19c.72.8,1.95.23,1.95-.9V9.5c0-4.42-3.22-8-7.18-8h-12.23C4.72,1.5,1.5,5.08,1.5,9.5v26.98c0,1.11,1.19,1.69,1.92.92l11.78-12.35Z"/>
                    </svg>
                    <p className="text-[12px] font-bold">
                        Save
                    </p>
                </div>
            </label>
        </div>
     );
}

export default SaveButton;