import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import Button from "../modals/Buttons/Button";
import Input from "../modals/Input";
import TextButton from "../modals/Buttons/TextButton";
import { useEffect, useState } from "react";
import Textarea from "../modals/Textarea";
import FileSelector from "../modals/FileSelector";
import { useAuthUser } from "../store/authUser";
import Spinner from "../components/Spinner";
import { HOME_ROUTE } from "../utils/consts";

function Authentification() {
    const navigate = useNavigate();
    const location = useLocation();
    const [nickname,setNickname] = useState("");
    const [login,setLogin] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [password,setPassword] = useState("");
    const [repeatPassword,setRepeatPassword] = useState("");
    const [bio,setBio] = useState("");
    const [email,setEmail] = useState("");
    const {signIn,signUp} = useAuthUser();
    const [avatar,setAvatar] = useState<File|null>(null);
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
        useEffect(()=>{
            if(!type){
                navigate(location.pathname+"?type=signup")
            }
        },[])
    const auth = async() =>{
        setIsLoading(true);
        if(type==="signup"){
            const loginFix = login.trim().replace(/\s/g, '_');
            if(
                loginFix.length > 4 &&
                password.length > 6 &&
                password === repeatPassword &&
                avatar &&
                email.includes("@") 
            ){
                const nicknameFix = nickname.trim() === "" ? loginFix : nickname.trim();
                await signUp(email,nicknameFix,loginFix,password,bio,avatar);
                navigate(HOME_ROUTE);
            }else{
                alert("Введены некорректные данные");
            }
        }else{
            if(
                email.includes("@") &&
                password.length > 6
            ){
                await signIn(email,password);
                navigate(HOME_ROUTE);
            }else{
                alert("Введены некорректные данные");
            }
        }
        setIsLoading(false)
    }
    return ( 
        <Layout>
            {!isLoading ? <div className="w-[600px] flex flex-col text-regular gap-2">
                <div className="flex justify-between">
                    <h2 className="font-semibold text-[21px]">
                        {type === "signup" ? "Регистрация" : "Вход"}
                    </h2>
                    <Button action={()=>navigate("/home")} imgSize="sm" img="/close.svg" />
                </div>
                <Input 
                    onValueChange={(text)=>setEmail(text)}
                    isRequired
                    placeholder="Почта" 
                    label="Почта"
                />
                <Input 
                    onValueChange={(text)=>setPassword(text)} 
                    isRequired
                    password 
                    placeholder="Пароль" 
                    label="Пароль"
                />
                {type === "signup" && <Input 
                    onValueChange={(text)=>setRepeatPassword(text)} 
                    isRequired
                    password 
                    placeholder="Повторите пароль" 
                    label="Повторите пароль"
                />}
                {type === "signup" && password != repeatPassword && <p className="text-red-500">
                    Пароли не совпадают
                </p>}
                {type === "signup" && <Input 
                    onValueChange={(text)=>setLogin(text)} 
                    isRequired
                    placeholder="Логин" 
                    label="Логин"
                    englishOnly
                    maxSymbols={48}
                />}
                {type === "signup" && <Input 
                    onValueChange={(text)=>setNickname(text)}
                    placeholder={login.trim() === "" ? "Никнейм" : login.trim()} 
                    label="Никнейм" 
                    maxSymbols={48}
                />}
                {type === "signup" && <FileSelector 
                    label="Аватарка" 
                    onFileChange={(f)=>setAvatar(f)} 
                />}
                {type === "signup" && <Textarea 
                    onValueChange={(text)=>setBio(text)} 
                    label="О себе" 
                    placeholder="Расскажите о себе" 
                    maxSymbols={500} 
                />}
                <div className="flex justify-between">
                    {type === "signup" ? <Link 
                        className="text-secondary hover:text-regular" 
                        to={location.pathname+"?type=login"}
                    >
                            Уже есть аккаунт? Войти
                    </Link>
                    : <Link 
                        className="text-secondary hover:text-regular" 
                        to={location.pathname+"?type=signup"}
                    >
                            Нет аккаунта? Зарегистрироваться
                    </Link>
                    }
                    <div className="flex gap-4 justify-end mb-4">
                        <TextButton action={()=>navigate("/home")} className="bg-main hover:bg-mainselect text-[14px]">Отмена</TextButton>
                        <TextButton action={auth} className="bg-button hover:bg-action text-[14px]">
                            {type === "signup" ? "Зарегистрироваться"
                                : "Войти"
                            }
                        </TextButton>
                    </div>
                </div>
            </div> : <Spinner/>}
        </Layout>
     );
}

export default Authentification;