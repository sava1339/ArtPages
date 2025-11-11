import clsx from "clsx";
import { useState } from "react";

interface IInput{
    className?:string,
    label?:string,
    maxSymbols?:number,
    placeholder?:string
}

function Input({
    className,
    label="",
    maxSymbols,
    placeholder
}:IInput) {
    const [value,setValue] = useState("");
    const changeValueHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setValue(e.target.value);
    }
    return ( 

        <label className="flex flex-col gap-2">
            {label}
            <div className="flex gap-2 flex-col justify-end">
                <input 
                    className={clsx("bg-mainselect px-6 py-3 text-[18px] rounded-2xl border-mainselect border focus:border-white",
                        className
                    )}
                    value={value}
                    onChange={(e)=>changeValueHandler(e)}
                    placeholder={placeholder}
                    maxLength={maxSymbols}
                    type="text" 
                />
                {maxSymbols && <p className="text-secondary text-right mr-4">{maxSymbols-value.length}</p>}
            </div>
        </label>
     );
}

export default Input;