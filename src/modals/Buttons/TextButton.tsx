import {clsx} from 'clsx';

interface ITextButton{
    className?:string,
    children?:React.ReactNode,
    action?:()=>void,
    padding?:string
}

function TextButton({
    className, 
    children, 
    action, 
    padding
}:ITextButton) {
    return (
        <div onClick={(e)=>e.stopPropagation()}>
            <div 
            onClick={action} 
            className={clsx(
                'rounded-[999px] text-[10px] cursor-pointer text-regular',
                className,
                {
                    "p-0":padding == "none",
                    "px-2 py-1": !padding
                }
            )}>
                {children}
            </div>
        </div>
     );
}

export default TextButton;