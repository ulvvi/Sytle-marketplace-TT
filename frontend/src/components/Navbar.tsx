import { IconButton } from "./IconButton"

export function Navbar() {
    return (
        <>
        
            <nav className="h-16">
                <ul className="flex flex-row gap-2 items-center justify-between h-full px-4">
                    <li>
                        <IconButton iconSrc="/src/assets/icons/menuIcon.svg"></IconButton>
                    </li>
                    <li>
                        <div className="flex gap-2 items-center justify-center">
                            <img src="src/assets/icons/styleLogo.svg" alt="Logo" />
                            <div className="flex">
                                <span className="text-black font-bold ">
                                    STYLE
                                </span>
                            </div>
                        </div>
                    </li>
                    <div className="flex">
                        <li>
                            <IconButton iconSrc="/src/assets/icons/searchIcon.svg"></IconButton>
                        </li>
                        <li className="ml-2">
                            <IconButton iconSrc="/src/assets/icons/heartIcon.svg"></IconButton>
                        </li>
                        <li className="ml-2">
                            <IconButton iconSrc="/src/assets/icons/userIcon.svg"></IconButton>
                        </li>
                        <li className="ml-2">
                            <IconButton iconSrc="/src/assets/icons/walletIcon.svg"></IconButton>
                        </li>
                    </div>
                </ul>
            </nav>
        
        </>
    )
}