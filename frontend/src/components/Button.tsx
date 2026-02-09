interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    texto: string;
    link: string;
    color?: "default" | "white" | "red";
    buttonClassName?: string;
    textClassName?: string;
    iconSrc?: string;
    iconAlt?: string;
    iconPos?: "left" | "right"
}

export function Button({ texto, link, color = "default", buttonClassName, textClassName, iconSrc, iconAlt, iconPos="right", ...props }: ButtonProps) {
    
    return (
        <button 
            className={`w-full h-[40px] flex items-center justify-center  cursor-pointer border-[1px] border-(--border-primary) rounded-[10px] border-solid gap-2 ${
                color === "default" ? "bg-[#030711]" : 
                color === "white" ? "bg-white text-black" : 
                "bg-red-500 text-white"
            }
            ${buttonClassName}`}
            onClick={() => window.location.href = link}
            {...props}
            
        >
            <span className={`text-[0.875rem] font-semibold text-[14px] ${color === "white" ? "text-black" : "text-white"} ${textClassName}`}>{texto}</span>
            <img src={iconSrc} alt={iconAlt} className={`w-[16px] h-[16px] ${iconSrc ? "inline-block" : "hidden"} ${iconPos === "left" ? "mr-2" : "ml-2"}`} />
        </button>
    );
}