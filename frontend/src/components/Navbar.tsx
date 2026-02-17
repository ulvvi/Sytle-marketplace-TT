import { Link } from "react-router"
import { IconButton } from "./IconButton"
import { InputText } from "./InputText"
import type { ReactNode } from "react"

export function Navbar() {

    const iconSearchBar: ReactNode = <img src="/src/assets/icons/searchIcon.svg" className="filter-[invert(46%)_sepia(8%)_saturate(595%)_hue-rotate(182deg)_brightness(93%)_contrast(89%)]"/>

    return (
        <>
        
            <nav className="h-16">
                <ul className="flex flex-row gap-2 items-center justify-between h-full mx-auto px-4 lg:max-w-342">
                    <li className="lg:hidden">
                        <IconButton iconSrc="/src/assets/icons/menuIcon.svg"></IconButton>
                    </li>
                    <li>
                        <div className="flex gap-2 items-center justify-center">
                            <img src="src/assets/icons/styleLogo.svg" alt="Logo" />
                            <div className="flex">
                                <span className="text-black font-bold text-[20px]">
                                    STYLE
                                </span>
                            </div>
                        </div>
                    </li>
                    <div className="hidden gap-8 font-semibold text-primary/80 text-[0.875rem] lg:flex">
                        <li className="cursor-pointer hover:text-primary" >
                            <Link to="/" >New In</Link>
                        </li>
                        <li className="cursor-pointer hover:text-primary" >
                            <Link to="/" >Women</Link>
                        </li>
                        <li className="cursor-pointer hover:text-primary" >
                            <Link to="/" >Men</Link>
                        </li>
                        <li className="cursor-pointer hover:text-primary" >
                            <Link to="/" >Sale</Link>
                        </li>
                    </div>
                    <li className="hidden w-md max-w-md h-10 lg:inline-block ">
                        <InputText texto="Search for products..." icone={iconSearchBar} inputClassName="w-[348px] max-w-[348px] !bg-[#F3F4F6]/50" textClassName="text-[length:0.875rem] placeholder:text-tertiary"/>
                    </li>

                    <div className="flex">
                        <li className="lg:hidden">
                            <IconButton iconSrc="/src/assets/icons/searchIcon.svg"></IconButton>
                        </li>
                        <li className="ml-2">
                            <IconButton iconSrc="/src/assets/icons/heartIcon.svg"></IconButton>
                        </li>
                        <li className="ml-2">
                            <IconButton buttonType="profile" isLogged={true} iconSrc="/src/assets/icons/userIcon.svg"></IconButton>
                        </li>
                        <li className="ml-2">
                            <IconButton buttonType="cart" cartItems={2} iconSrc="/src/assets/icons/cartIcon.svg"></IconButton>
                        </li>
                    </div>
                </ul>
            </nav>
        
        </>
    )
}