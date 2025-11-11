import { useState } from 'react';

function Search() {
    const [search,setSearch] = useState("");
    return ( 
        <div className="border h-8 flex border-secondary rounded-3xl px-1 py-1 max-w-[550px] w-full absolute absolute-center-x">
            <div className='text-[12px] flex-1 text-regular flex gap-2 items-center'>
                <img className='h-3 ml-3' src="/search.svg" alt="" />
                <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" placeholder='Find anything' className='flex-1' />
                {search != "" ?
                    <div onClick={()=>setSearch("")} className="w-6 h-6 rounded-[50%] hover:bg-secondary flex justify-center items-center cursor-pointer">
                        <img className='h-3' src="/abort.svg" alt=""/>
                    </div>
                    :
                    null
                }
            </div>
        </div>
     );
}

export default Search;