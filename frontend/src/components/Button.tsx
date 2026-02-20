import { useNavigate } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    texto: string;
    link?: string;
    color?: "default" | "white" | "red";
    buttonClassName?: string;
    textClassName?: string;
    iconSrc?: string;
    iconAlt?: string;
    iconPos?: "left" | "right"
}

export function Button({ texto, link, color = "default", buttonClassName, textClassName, iconSrc, iconAlt, iconPos="right", ...props }: ButtonProps) {
    const navigate = useNavigate()
    return (
        <button 
            className={`${iconPos === "left" ? "flex-row-reverse" : "flex-row"} w-full h-[40px] flex items-center justify-center  cursor-pointer border-[1px] border-(--border-primary) rounded-[10px] border-solid gap-2 ${
                color === "default" ? "bg-[#030711] hover:bg-primary/90" : 
                color === "white" ? "bg-white text-black hover:bg-[#F3F4F6]" : 
                "bg-red-500 text-white"
            }
            ${iconPos === "left" ? "flex-row-reverse" : ""} ${buttonClassName}`}
            onClick={link ? () =>  navigate(link) : undefined}
            {...props}
            
        >
            <span className={`text-[0.875rem] font-semibold text-[14px] ${color === "white" ? "text-black" : "text-white"} ${textClassName}`}>{texto}</span>
            <img src={iconSrc} alt={iconAlt} className={`w-[16px] h-[16px] ${iconSrc ? "inline-block" : "hidden"} ${iconPos === "left" ? "mr-2" : "ml-2"}`} />
        </button>
    );
}