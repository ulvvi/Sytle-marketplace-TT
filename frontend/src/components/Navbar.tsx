import { Link, useNavigate } from "react-router"
import { IconButton } from "./IconButton"
import { InputText } from "./InputText"
<<<<<<< Feature/Front/Thiago/SignUpIntegration
import type { ReactNode } from "react"
import { useAuth } from '../contexts/AuthContext'
=======
import { useContext, useEffect, useState, type ReactNode } from "react"
import { UserContext } from "../contexts/UserProvider"
import { CartContext } from "../contexts/CartProvider"
>>>>>>> main

export function Navbar() {

    const iconSearchBar: ReactNode = <img src="/src/assets/icons/searchIcon.svg" className="filter-[invert(46%)_sepia(8%)_saturate(595%)_hue-rotate(182deg)_brightness(93%)_contrast(89%)]"/>
    const { user, isLogged, login } = useContext(UserContext)
    const { cart } = useContext(CartContext)
    
    //variaveis de teste enquanto a tela de login não está integrada
    const email = "josesoares@gmail.com"
    const password = "teste"

    const formatUserName = (firstName:string | null, lastName:string | null) => {
        
        if(firstName && lastName){
        const firstNameWords = firstName.trim().split(/\s+/);

        //verificando se o primeiro nome é composto ou nao
        return firstNameWords.length > 1 ? `${firstNameWords[0][0].toUpperCase()}${firstNameWords[1][0].toUpperCase()}` 
        : `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
        } else {
            return ""
        }
    }

    const {signOut} = useAuth();
    const navigate = useNavigate();

    const handleOut = () => {
        signOut();
        navigate('/signIn')
    };

    return (
        <>
        
            <nav className="h-16">
                <ul className="flex flex-row gap-2 items-center justify-between h-full mx-auto px-4 lg:max-w-342">
                    <li className="lg:hidden">
                        <IconButton iconSrc="/src/assets/icons/menuIcon.svg"></IconButton>
                    </li>
                    <li>
                        <Link to='/Home' className="flex gap-2 items-center justify-center">
                            
                            <img src="/src/assets/icons/styleLogo.svg" alt="Logo" />
                            <div className="flex">
                                <span className="text-black font-bold text-[20px]">
                                    STYLE
                                </span>
                            </div>
                        </Link>
                    </li>
                    <div className="hidden gap-8 font-semibold text-primary/80 text-[0.875rem] lg:flex">
                        <li className="cursor-pointer hover:text-primary" >
                            <Link to="#" >New In</Link>
                        </li>
                        <li className="cursor-pointer hover:text-primary" >
                            <Link to="#" >Women</Link>
                        </li>
                        <li className="cursor-pointer hover:text-primary" >
                            <Link to="#" >Men</Link>
                        </li>
                        <li className="cursor-pointer hover:text-primary" >
                            <Link to="/Sales" >Sale</Link>
                        </li>
                    </div>
                    <li className="hidden w-md max-w-md h-10 lg:inline-block ">
                        <InputText texto="Search for products..." icone={iconSearchBar} inputClassName="w-[348px] max-w-[348px] !bg-[#F3F4F6]/50" textClassName="text-[length:0.875rem] placeholder:text-tertiary"/>
                    </li>

                    <div className="flex">
                        <li className="lg:hidden">
<<<<<<< Feature/Front/Thiago/SignUpIntegration
                            <IconButton iconSrc="/src/assets/icons/searchIcon.svg" onClick={handleOut}></IconButton>
=======
                            <IconButton iconSrc="/src/assets/icons/searchIcon.svg"></IconButton>
                           
>>>>>>> main
                        </li>
                        <li className="ml-2">
                            <IconButton iconSrc="/src/assets/icons/heartIcon.svg" onClick={()=>login(email, password)}></IconButton>
                        </li>
                        <li className="ml-2">
                            <IconButton link="/Profile" buttonType="profile" isLogged={isLogged} profileInitials={isLogged ? formatUserName(user!.firstName.toString(), user!.lastName.toString()) : ""} iconSrc="/src/assets/icons/userIcon.svg"></IconButton>
                        </li>
                        <li className="ml-2">
                            <IconButton link="/Cart" isLogged={isLogged} buttonType="cart" cartItems={cart?.cartQuantity ?? 0} iconSrc="/src/assets/icons/cartIcon.svg"></IconButton>
                        </li>
                    </div>
                </ul>
            </nav>
        
        </>
    )
}