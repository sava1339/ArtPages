
interface IAside{
    children:React.ReactNode
}

function Aside({children}:IAside) {
    return ( 
        <aside className="sticky w-[316px] text-regular h-fit rounded-2xl top-20 bg-aside py-4">
            {children}
        </aside>
     );
}

export default Aside;