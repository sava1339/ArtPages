import clsx from "clsx";

interface IAvatar{
    className?:string,
    children?:React.ReactNode,
    avatar:string,
    size?: string
}

function Avatar({
    className,
    children,
    avatar,
    size
}:IAvatar) {
    return ( 
        <div className={clsx("rounded-[50%] bg-white overflow-hidden",className,
            {
                "w-4 h-4":size == "xs",
                "w-6 h-6":size == "sm",
                "w-8 h-8":size == "md",
                "w-10 h-10":size == "lg",
                "w-12 h-12":size == "xl",
                "w-18 h-18":size == "2xl",
                "w-21 h-21":size == "3xl"
            }
        )}>
            <img className="" src={avatar} alt="" />
            {children}
        </div>
     );
}

export default Avatar;