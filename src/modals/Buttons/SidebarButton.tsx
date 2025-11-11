import clsx from "clsx";
import { Link } from "react-router-dom";

interface ISidebarButton{
    className?:string,
    children?: React.ReactNode,
    route:string
}

function SidebarButton({
    className,
    children,
    route
}:ISidebarButton) {
    return ( 
        <Link to={route} className={clsx("cursor-pointer text-[14px] px-4 h-12 rounded hover:bg-mainselect flex items-center gap-2",className)}>
            {children}
        </Link>
     );
}

export default SidebarButton;