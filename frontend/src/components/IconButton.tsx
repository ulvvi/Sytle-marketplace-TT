interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconSrc: string;
    iconSize?: string;
    alt?: string;
}

export function IconButton({iconSrc, iconSize = "w-4 h-4", alt, ...props}: IconButtonProps) {
    return (
        <>
            <button className="h-10 w-10 p-3 rounded-[10px] hover:bg-[#F3F4F6]" {...props}>
                <img src={iconSrc} alt={alt}></img>
            </button>
        </>
    )
}