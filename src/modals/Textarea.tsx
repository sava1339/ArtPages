import clsx from "clsx";
import { useState } from "react";

interface IInput{
    className?:string,
    label?:string
    maxSymbols?:number
    placeholder?:string
}

function Textarea({
    className,
    label="",
    maxSymbols,
    placeholder
}:IInput) {
    const [value,setValue] = useState("");
    const changeValueHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setValue(e.target.value);
    }
    return ( 

        <label className="flex flex-col gap-2">
            {label}
            <div className="flex gap-2 flex-col justify-end">
                <textarea 
                    className={clsx("bg-mainselect px-6 py-3 text-[18px] rounded-2xl resize-none border-mainselect border focus:border-white",
                        className
                    )}
                    value={value}
                    onChange={(e)=>changeValueHandler(e)}
                    placeholder={placeholder}
                    maxLength={maxSymbols}
                />
                {maxSymbols && <p className="text-secondary text-right mr-4">{maxSymbols-value.length}</p>}
            </div>
        </label>
     );
}

export default Textarea;