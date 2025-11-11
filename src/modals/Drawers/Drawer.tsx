import clsx from "clsx";

interface IDrawer{
    className?:string,
    children?:React.ReactNode,
    gap?:string
}

function Drawer({
    className,
    children,
    gap
}:IDrawer) {
    return ( 
        <div className={clsx(
                "absolute shadow-[0px_5px_10px_2px_rgba(0,0,0,0.4)] top-10 rounded-xl right-0 z-20 w-[300px] flex flex-col bg-main py-2 text-[14px]",
                className,
                {
                    "gap-4":!gap,
                    "gap-0":gap == "none"
                }
            )}>
            {children}
        </div>
     );
}

export default Drawer;