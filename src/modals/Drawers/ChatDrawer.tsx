import Drawer from "./Drawer";
import TextButton from "../Buttons/TextButton";

function ChatDrawer() {
    return ( 
        <Drawer gap="none" className="items-end text-regular">
            <label className="px-4 py-3 flex justify-between gap-8 w-full active:bg-mainselect">
                <p>Каналы</p>
                <input type="checkbox"/>
            </label>
            <label className="px-4 py-3 flex justify-between gap-8 w-full active:bg-mainselect">
                <p>Групповые чаты</p>
                <input type="checkbox"/>
            </label>
            <label className="px-4 py-3 flex justify-between gap-8 w-full active:bg-mainselect">
                <p>Личные чаты</p>
                <input type="checkbox"/>
            </label>
            <TextButton className="w-fit mx-4 mt-2">
                Применить
            </TextButton>
        </Drawer>
     );
}

export default ChatDrawer;