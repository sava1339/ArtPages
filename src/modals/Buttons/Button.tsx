import {clsx} from 'clsx';

interface IButton{
    className?:string,
    children?: React.ReactNode,
    action?:()=>void,
    img?:string,
    imgSize?:string,
    roundOff?:boolean
}

function Button({className,children,action,img,imgSize="md",roundOff}:IButton) {
    return ( 
        <div
        onClick={action} 
        className={clsx(
            "relative w-8 h-8 hover:bg-secondary flex justify-center cursor-pointer items-center select-none",
            {
                "rounded-[50%]": !roundOff
            }
            ,
            className
            )}>
                {img && 
                <img 
                    className={
                        clsx(
                        {
                            "h-8":imgSize == "md",
                            "h-7":imgSize == "sm",
                            "h-6":imgSize == "xs",
                            "h-5":imgSize == "xs1",
                            "h-4":imgSize == "xs2"
                        })
                    } 
                    src={img} 
                    alt="" 
                />
                }
                {children}
        </div>
     );
}

export default Button;