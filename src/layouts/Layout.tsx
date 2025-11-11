import clsx from "clsx";
import { useIsSidebarExpand } from "../store/isSidebarExpand";

interface ILayout{
    children:React.ReactNode
}

function Layout({children}:ILayout) {
    const {isSidebarExpand} = useIsSidebarExpand((state)=>state);
    return ( 
        <main className="flex justify-center">
                    <div className={clsx(
                        "mx-4 px-4 transition-transform",
                        {
                            "translate-x-40":isSidebarExpand
                        }
                    )}>
                        <div className="mt-16">
                            {children}
                        </div>
                    </div>
        </main>
     );
}

export default Layout;