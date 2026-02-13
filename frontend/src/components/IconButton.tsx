interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconSrc: string;
    iconSize?: string;
    alt?: string;
    buttonType?: "default" | "profile" | "cart";
    cartItems?: number;
    isLogged?: boolean;
}

export function IconButton({iconSrc, iconSize = "w-4 h-4", alt, buttonType = "default", cartItems = 0, isLogged, ...props}: IconButtonProps) {
    return (
        <>
            <button className={`${buttonType === "profile" && isLogged ? "p-0" : "p-3 hover:bg-[#F3F4F6]"} h-10 w-10 rounded-[10px] relative`} {...props}>
                <img src={iconSrc} alt={alt} className={`${buttonType === "profile" && isLogged ? "hidden" : "block"}`}/>
                <div className={`${buttonType === "profile" && isLogged ? "block" : "hidden"} h-10 w-10 flex items-center justify-center rounded-full  bg-[#F3F4F6]`}>
                    <span className="text-[0.875rem] font-semibold">JD</span>
                </div>
                <div className={`${buttonType === "cart" && cartItems > 0 ? "block" : "hidden"} w-5 h-5 absolute flex items-center justify-center -top-2 -right-2 rounded-full bg-primary`}>
                    <span className="text-secondary text-[0.75rem] text-center align-middle">{cartItems}</span>
                </div>
            </button>
        </>
    )
}