import { useState, useRef, useEffect } from "react";
import Button from "./Buttons/Button";
import TextButton from "./Buttons/TextButton";
import clsx from "clsx";

interface IMessageField{
    placeholder?:string,
    selected?:boolean,
    textareaPlaceholder?:string,
    noresize?:boolean,
    send:(userId: string, context: string) => void
}

function MessageField({
    placeholder,
    selected,
    textareaPlaceholder,
    noresize,
    send
}:IMessageField) {
    const [textValue,setTextValue] = useState('');
    const [isSelected,setIsSelected] = useState(selected ? true : false);
    const fieldRef = useRef<HTMLTextAreaElement>(null);
    const HandleInputClick = () => {
        setIsSelected(true);
        setTimeout(()=>{
            fieldRef.current?.focus();
        },0)
    }
    const textCencel = ()=>{
        setIsSelected(false);
        setTextValue('');
    }
    useEffect(() => {
        if (fieldRef.current) {
        fieldRef.current.style.height = `${fieldRef.current.scrollHeight}px`;
        }
    }, [textValue,isSelected]);
    const sendMessage = () =>{
        send("1",textValue);
        setTextValue("");
        setIsSelected(false);
    }
    return ( 
        <div className="bg-main border border-secondary text-regular w-full rounded-3xl my-4 px-4 py-3">
            {isSelected ?
                <div>
                    <textarea 
                        placeholder={textareaPlaceholder} 
                        onChange={(e)=>setTextValue(e.target.value)}
                        value={textValue}
                        ref={fieldRef} 
                        className={clsx("w-full text-[14px]",
                            {
                                "resize-none h-6 max-h-42":noresize
                            }
                        )}
                    />
                    <div className="flex justify-between">
                        <div>
                            <Button imgSize="xs2" img="image.svg" />
                        </div>
                        <div className="flex items-end gap-2">
                            <TextButton action={textCencel} className="bg-main hover:bg-mainselect">Отмена</TextButton>
                            <TextButton action={sendMessage} className="bg-button hover:bg-action">Отправить</TextButton>
                        </div>
                    </div>
                </div>
                :
                <input className="w-full" placeholder={placeholder} onSelect={HandleInputClick} type="text" />
            }
        </div>
     );
}

export default MessageField;