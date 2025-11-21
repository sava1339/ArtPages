import clsx from "clsx";
import { useState } from "react";

interface IInput{
    className?:string,
    label?:string,
    maxSymbols?:number,
    placeholder?:string,
    password?:boolean,
    isRequired?:boolean,
    englishOnly?:boolean,
    onValueChange?:(content:string)=>void,
}

function Input({
    className,
    label="",
    maxSymbols,
    placeholder,
    password=false,
    isRequired=false,
    englishOnly=false,
    onValueChange
}:IInput) {
    const [value,setValue] = useState("");
    const changeValueHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if(!englishOnly){
            setValue(e.target.value);
            if(onValueChange){
                onValueChange(e.target.value);
            }
        }else{
            const inputValue = e.target.value;
            const englishOnly = inputValue.replace(/[^a-zA-Z\s_\-]/g, '');
            setValue(englishOnly);
            if(onValueChange){
                onValueChange(englishOnly);
            }
        }
        
    }
    return ( 

        <label className="flex flex-col gap-2">
            <p>
                {label} {isRequired && <span className=" text-red-500">*</span>}
            </p>
            <div className="flex gap-2 flex-col justify-end">
                <input 
                    className={clsx("bg-mainselect px-6 py-3 text-[18px] rounded-2xl border-mainselect border focus:border-white",
                        className
                    )}
                    value={value}
                    onChange={(e)=>changeValueHandler(e)}
                    placeholder={placeholder}
                    maxLength={maxSymbols}
                    type={password ? "password" : "text"} 
                />
                {maxSymbols && <p className="text-secondary text-right mr-4">{maxSymbols-value.length}</p>}
            </div>
        </label>
     );
}

export default Input;