import { useEffect, useRef, useState } from 'react';

interface IUseContextMenu {
    isOpen: boolean;
    switchOpen: () => void;
    ref: React.RefObject<HTMLDivElement | null>;
}

export const useContextMenu = ():IUseContextMenu =>{
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const switchOpen = () =>{
        setIsOpen(!isOpen);
    }
    useEffect(()=>{
            function HandleClickOutside(event:MouseEvent) {
                if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }
            if (isOpen) {
                document.addEventListener('mousedown', HandleClickOutside);
                return () => {
                    document.removeEventListener('mousedown', HandleClickOutside);
                };
            }
        },[isOpen])
    return{
        isOpen,
        switchOpen,
        ref
    }
}